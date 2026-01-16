const fs = require('fs');
const {Transform} = require('stream');

const upper = new Transform({
    transform(chunk, encoding, callback){
        const upperChunk = chunk.toString().toUpperCase();
        callback(null, upperChunk);
    }
});
const removeVowel = new Transform({
    transform(chunk, encoding, callback){
        const noVowelChunk = chunk.toString().replace(/[aeiou]/gi, '');
        callback(null, noVowelChunk);
    }
});

const readStream = fs.createReadStream('./largefile.txt')
const writeStream = fs.createWriteStream('./copyoflargefile.txt');

// readStream.pipe(upper).pipe(writeStream);
readStream.pipe(upper).pipe(removeVowel).pipe(writeStream);