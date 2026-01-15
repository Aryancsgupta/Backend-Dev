const fs = require('fs')

fs.readFile('input.txt', 'utf8', (error, data) => {
    if (error) throw error;
    

    const words = data.trim().split(/\s+/)
    const count = words.length

    fs.writeFile('output.txt', `Total words: ${count}`, (err) => {
        if (err) {
            console.log('File could not be written')
        } else {
            console.log('Word count saved successfully')
        }
    })
})
