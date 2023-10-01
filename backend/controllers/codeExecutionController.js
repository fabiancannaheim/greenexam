const fs = require('fs')
const { spawn } = require('child_process')

executePython = (req, res) => {
  
    const code = req.body.code;

    if (!code) return res.status(400).send('No code provided.')
    
    const process = spawn('python3', ['-c', code])
    let result = ''
    let error = ''

    process.stdout.on('data', (data) => {
        result += data.toString()
    })

    process.stderr.on('data', (data) => {
        error += data.toString()
    })

    process.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ error })
        }
        res.json({ result })
    })
    
}

executeJava = (req, res) => {

    const code = req.body.code

    if (!code) return res.status(400).send('No code provided.')

    const classNameMatch = code.match(/public\s+class\s+(\w+)/)
    if (!classNameMatch) {
      res.json({ error: 'No public class found in submitted code.' })
      return
    }
    const className = classNameMatch[1]
    const fileName = `${className}.java`
  
    fs.writeFileSync(fileName, code);

    const compile = spawn('javac', [fileName]);

    compile.on('close', (code) => {

        if (code !== 0) {
            return res.status(500).json({ error: 'Compilation failed.' });
        }

        let result = '';
        let error = '';
        let process = spawn('java', [className]);

        process.stdout.on('data', (data) => {
            result += data.toString();
        });

        process.stderr.on('data', (data) => {
            error += data.toString();
        });

        process.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error });
            }
            res.json({ result });
        })

    })
}

module.exports = { executePython, executeJava }
