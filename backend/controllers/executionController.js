const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { spawn } = require('child_process')

const executeCode = (req, res) => {

    const lang = req.params.language
    const code = req.body.code

    switch (lang) {
        case 'python':
            executePython(code, (error, result) => handleExecutionResponse(error, result, res))
            break
        case 'java':
            executeJava(code, (error, result) => handleExecutionResponse(error, result, res))
            break
        default:
            res.status(400).send('Unsupported language.')
    }
}

const handleExecutionResponse = (error, result, res) => {
    if (error) return res.status(500).json({ error })
    res.json({ result })
}

const executePython = (code, callback) => {

    const dir = path.join(__dirname, '../tmp')

    // Generate unique filename for temp script
    const filename = `script-${uuidv4()}.py`
    const filepath = path.join(dir, filename)

    // Write code to temp file
    fs.writeFileSync(filepath, code)

    // Command to run the Python script inside a Docker container
    const dockerCommand = [
        'docker', 'run', '--rm',
        '--user=myuser',
        '--read-only',
        '--memory=256m',
        '--cpus=1.0',
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
    })
}

const executeJava = (code, callback) => {

    // Extract the class name from the submitted code
    const classNameMatch = code.match(/public\s+class\s+(\w+)/)
    if (!classNameMatch) {
        return callback('No public class found in submitted code.')
    }

    const className = classNameMatch[1]
    const dir = path.join(__dirname, '../tmp')

    const filename = `${className}.java`
    const filepath = path.join(dir, filename)

    fs.writeFileSync(filepath, code)

    const dockerCommand = [
        'docker', 'run', '--rm',
        '--user=myuser',
        '--memory=256m',
        '--cpus=1.0',
        '--network=none',
        '--security-opt=no-new-privileges',
        '-v', `${dir}:/app:rw`,
        'javaexe', 'sh', '-c', `cd /app && javac ${className}.java && java ${className}`
    ]

    const process = spawn(dockerCommand.shift(), dockerCommand)

    let result = ''
    let error = ''

    process.stdout.on('data', (data) => result += data.toString())
    process.stderr.on('data', (data) => error += data.toString())

    process.on('close', (code) => {
        fs.unlinkSync(filepath)
        callback(error, result)
    })

}

const executeJavaOld = (code, callback) => {

    const classNameMatch = code.match(/public\s+class\s+(\w+)/)
    if (!classNameMatch) return callback('No public class found in submitted code.')

    const className = classNameMatch[1]
    const fileName = `${className}.java`
    fs.writeFileSync(fileName, code)

    const compile = spawn('javac', [fileName])

    compile.on('close', (code) => {

        if (code !== 0) return callback('Compilation failed.')

        let result = ''
        let error = ''
        const process = spawn('java', [className])

        process.stdout.on('data', (data) => result += data.toString())
        process.stderr.on('data', (data) => error += data.toString())

        process.on('close', (code) => callback(error, result))
    });
};

module.exports = { executeCode }