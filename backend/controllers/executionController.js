const fs = require('fs')
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

    const process = spawn('python3', ['-c', code])

    let result = ''
    let error = ''

    process.stdout.on('data', (data) => result += data.toString())
    process.stderr.on('data', (data) => error += data.toString())

    process.on('close', (code) => callback(error, result))
};

const executeJava = (code, callback) => {

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