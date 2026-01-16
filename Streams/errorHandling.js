const {error} = require('console');
console.log("Starting error handling demonstration...");
const a = 10;

// try {
//     throw new Error("An intentional error occurred!");
// } catch (error) {
//     console.error("Caught an error:", error);
// }

const http = require('http');
const server = http.createServer((req, res) => {

    try {
        throw new Error("there is some error");
    } catch (error) {
        console.error("Caught an error in server:", error.message);
    }

    res.end("Server is running smoothly.");
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});