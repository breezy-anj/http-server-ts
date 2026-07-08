import * as net from "net";

console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    const path = request.split(" ")[1];

    const str = request.split(" ")[1];
    const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 3\r\n\r\n${str}`;
    socket.write(response);
  });
  socket.on("close", () => {
    console.log("Connection Closed");

    socket.end();
  });
});

server.listen(4221, "localhost");
