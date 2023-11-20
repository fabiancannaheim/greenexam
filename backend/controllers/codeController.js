const fs = require('fs')
const path = require('path')
const gcc = require('../utils/gccOptions')
const { v4: uuidv4 } = require('uuid')
const { spawn } = require('child_process')
const logger = require('../utils/logger')
const { loadManager, FeatureState } = require('../utils/LoadManager')

const executeCode = (req, res) => {

    const lang = req.params.lang
    const code = req.body.code

    switch (lang) {
        case 'python':
            executePython(code, (error, result) => handleExecutionResponse(error, result, res))
            break
        case 'java':
            executeJava(code, (error, result) => handleExecutionResponse(error, result, res))
            break
        case 'C':
            executeC(code, (error, result) => handleExecutionResponse(error, result, res))
            break
        default:
            res.status(400).send('Unsupported language.')
    }
}

const executePython = (code, callback) => {

    const dir = path.join(__dirname, '../tmp')

    // Generate unique filename for temp script
    const filename = `script-${uuidv4()}.py`
    const filepath = path.join(dir, filename)

    // Write code to temp file
    fs.writeFileSync(filepath, code)

    // Adjust Docker container resource limits based on system load
    let memoryLimit = '256m';
    let cpuLimit = '1.0';
    
    if (loadManager.state === FeatureState.MINIMAL_COMPILATION) {
        if (global.CPU_LOAD > 0.7 || global.RAM_LOAD > 0.7) {
            memoryLimit = '128m';
            cpuLimit = '0.5';
        } else if (global.CPU_LOAD > 0.5 || global.RAM_LOAD > 0.5) {
            memoryLimit = '192m';
            cpuLimit = '0.75';
        }
    }
    
    // Command to run the Python script inside a Docker container
    const dockerCommand = [
        'docker', 'run', '--rm',
        '--user=myuser',
        '--read-only',
        `--memory=${memoryLimit}`,
        `--cpus=${cpuLimit}`,
        '--network=none',
        '--security-opt=no-new-privileges',
        `-v`, `${filepath}:/app/temp_user_code.py:ro`,
        'pyexe', 'python', '/app/temp_user_code.py'
    ]

    // Spawn Docker process
    const process = spawn(dockerCommand.shift(), dockerCommand)

    let result = ''
    let error = ''

    process.stdout.on('data', (data) => result += data.toString())
    process.stderr.on('data', (data) => error += data.toString())

    process.on('close', (code) => {
        // Delete the temporary file
        fs.unlinkSync(filepath)

        // Callback with the results
        callback(error, result)

        logger.trace({ message: 'Python execution', result: result, error: error})
    
    })

}

const executeJava = (code, callback) => {

    // Extract the class name from the submitted code
    const classNameMatch = code.match(/public\s+class\s+(\w+)/)
    if (!classNameMatch) {
        return callback('No public class found in submitted code.')
    }

    const className = classNameMatch[1] + uuidv4().replaceAll('-', '')
    const dir = path.join(__dirname, '../tmp')

    code = code.replace(classNameMatch[1], className)

    const filename = `${className}.java`
    const filepath = path.join(dir, filename)

    fs.writeFileSync(filepath, code)

    // Low load, allocate more resources
    // G1 garbage collector for high throughput and low pause times
    // Higher thread stack size
    let jvmOptions = '-Xmx256m -XX:CICompilerCount=4 -Xss1024k -XX:+UseG1GC';

     // JVM options based on CPU and RAM load
    if (loadManager.state === FeatureState.MINIMAL_COMPILATION) {
        if (global.CPU_LOAD > 0.7 || global.RAM_LOAD > 0.7) {
            // High load, reduce resource usage
            // Serial garbage collector -> less memory
            // Smaller thread stack size to reduce memory
            // JIT Compilation turned off to reduce CPU usage
            // Disabled explicit garbage collection to avoid overhead
            jvmOptions = '-Xmx128m -XX:CICompilerCount=1 -Xss256k -XX:+UseSerialGC -Djava.compiler=NONE -XX:+DisableExplicitGC';
        } else if (global.CPU_LOAD > 0.5 || global.RAM_LOAD > 0.5) {
            // Moderate load
            // Parallel garbeage collector 
            // larger thread stack size
            jvmOptions = '-Xmx192m -XX:CICompilerCount=2 -Xss512k -XX:+UseParallelGC';
        } 
    }
   
    const dockerCommand = [
        'docker', 'run', '--rm',
        '--user=myuser',
        '--memory=256m',
        '--cpus=1.0',
        '--network=none',
        '--security-opt=no-new-privileges',
        '-v', `${dir}:/app:rw`,
        'javaexe', 'sh', '-c', `cd /app && javac ${className}.java && java ${jvmOptions} ${className}`
    ]

    const process = spawn(dockerCommand.shift(), dockerCommand)

    let result = ''
    let error = ''

    process.stdout.on('data', (data) => result += data.toString())
    process.stderr.on('data', (data) => error += data.toString())

    process.on('close', (code) => {

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath)
        }

        const classFilePath = path.join(dir, `${className}.class`);
        if (fs.existsSync(classFilePath)) {
            fs.unlinkSync(classFilePath)
        }

        callback(error, result)
    
        logger.trace({ message: 'Java Execution', Options: jvmOptions, result: result, error: error })
    })

}

const executeC = (code, callback) => {

    const programName = `program-${uuidv4()}`
    const filename = `${programName}.c`;
    const dir = path.join(__dirname, '../tmp');

    const filepath = path.join(dir, filename);

    fs.writeFileSync(filepath, code);

    // Default optimization option
    let compileOption = gcc.MAX_OPTIMIZATION

    // Adjust GCC compile options based on system load
    if (loadManager.state === FeatureState.MINIMAL_COMPILATION) {
        if (global.CPU_LOAD > 0.7 || global.RAM_LOAD > 0.7) {
            compileOption = gcc.NO_OPTIMIZATION
        } else if (global.CPU_LOAD > 0.5 || global.RAM_LOAD > 0.5) {
            compileOption = gcc.MORE_OPTIMIZATION
        } else if (global.CPU_LOAD > 0.3 || global.RAM_LOAD > 0.3) {
            compileOption = gcc.MODERATE_OPTIMIZATION
        }
    }

    const dockerCommand = [
        'docker', 'run', '--rm',
        '--user=myuser',
        '--memory=256m',
        '--cpus=1.0',
        '--network=none',
        '--security-opt=no-new-privileges',
        '-v', `${dir}:/app:rw`,
        'cexe', 'sh', '-c', `gcc ${compileOption} ${filename} -o ${programName} && ./${programName}`
    ];

    const process = spawn(dockerCommand.shift(), dockerCommand);

    let result = '';
    let error = '';

    process.stdout.on('data', (data) => result += data.toString());
    process.stderr.on('data', (data) => error += data.toString());

    process.on('close', (code) => {

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath)
        }

        const executablePath = path.join(dir, programName);
        if (fs.existsSync(executablePath)) {
            fs.unlinkSync(executablePath)
        }
        
        callback(error, result);

        logger.trace({ message: 'C Execution', gccOption: compileOption, result: result, error: error })
    })

};


const autocomplete = (req, res) => {

    const lang = req.params.lang
    const code = req.body.code
    const line = req.body.line
    const col = req.body.col

    switch (lang) {
        case 'python':
            autocompletePython(code, line, col, (error, result) => handleExecutionResponse(error, result, res))
            break
        case 'java':
            autocompleteJava(code, line, col, (error, result) => handleExecutionResponse(error, result, res))
            break
        default:
            res.status(400).send('Unsupported language.')
    }
}

const autocompletePython = (code, line, col, callback) => {

    const input = JSON.stringify({ code, line, col })

    // Command to run Jedi inside a Docker container
    const dockerCommand = [
        'docker', 'run', '--rm',
        '--user=myuser',
        '--read-only',
        '--memory=256m',
        '--cpus=1.0',
        '--network=none',
        '--security-opt=no-new-privileges',
        '-i', // Run container in interactive mode to allow input
        'pyautocomp'
    ]

    // Spawn Docker process
    const process = spawn(dockerCommand.shift(), dockerCommand)

    let result = ''
    let error = ''

    process.stdout.on('data', (data) => {
        result += data.toString()
    });
    process.stderr.on('data', (data) => {
        error += data.toString()
    })

    process.on('close', (code) => {
        try {
            const suggestions = JSON.parse(result);  
            callback(null, suggestions);
        } catch (error) {
            console.error("Parsing Error:", error)
            callback(error, null);
        }
    })

    // Send input data to Docker process
    process.stdin.write(input)
    process.stdin.end()

}

const autocompleteJava = (code, line, col, callback) => {
    throw Error("Autocompletion not supported for Java")
}



const handleExecutionResponse = (error, result, res) => {
    if (error) return res.status(500).json({ error })
    res.json({ result })
}

module.exports = { executeCode, autocomplete }