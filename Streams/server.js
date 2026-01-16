const http = require('http');
const fs = require('fs');

// const readStream = fs.createReadStream('./largefile.txt',{
//     highWaterMark: 64*1024
// });

// readStream.on('data', (chunk) => {
//     console.log('Received chunk of size:', chunk);
// });

const writeStream = fs.createWriteStream('./outputfile.txt',{
    flags:"a"  // append mode
})
writeStream.write('Hello, \n');
writeStream.write('this is a test of write streams.\n');
writeStream.write('Goodbye!\n');
writeStream.end();

writeStream.on('finish', () => {
    console.log('All data written to file');
});
