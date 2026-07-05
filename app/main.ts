import * as net from "net";

console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    const path = request.split(" ")[1];

    const response =
      path === "/"
        ? "HTTP/1.1 200 OK\r\n\r\n"
        : "HTTP/1.1 404 Not Found\r\n\r\n";

    socket.write(response);
  });
  socket.on("close", () => {
    console.log("Connection Closed");

    socket.end();
  });
});

server.listen(4221, "localhost");
