const os = require('os')
const fs = require('fs')

function getSystemInfo() {
    const info = `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU: ${os.cpus()[0].model}
Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
`
    return info
}

setInterval(() => {
    const data = getSystemInfo()

    fs.appendFile('system-info.txt', data, (err) => {
        if (err) {
            console.log('Unable to write system info')
        }
    })
}, 5000)
