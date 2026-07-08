import * as net from "net";

console.log("Logs from your program will appear here!");

const server = net.createServer((socket: net.Socket) => {
  socket.on("data", (data: Buffer) => {
    const request = data.toString();
    const path = request.split(" ")[1];

    if (path === "/") {
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
      socket.end();
    } else if (path.startsWith("/echo/")) {
      const str = path.split("/")[2];
      const strLen = str.length;
      const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${strLen}\r\n\r\n${str}`;
      socket.write(response);
      socket.end();
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
      socket.end();
    }
  });
  socket.on("close", () => {
    console.log("Connection Closed");
  });
});

server.listen(4221, "localhost");
