const fs = require('fs');

const readStream = fs.createReadStream('./largefile.txt')
const writeStream = fs.createWriteStream('./copyoflargefile.txt');

readStream.on('data', (chunk) => {
    let data = chunk.toString().toUpperCase();
    writeStream.write(data);
});

readStream.on('end', () => {
    writeStream.end();
    console.log('File copy completed.');
});

// readStream.pipe(writeStream);  //6 to 14 in one line by pipe