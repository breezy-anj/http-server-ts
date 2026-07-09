import * as net from "net";

console.log("Logs from your program will appear here!");

const server = net.createServer((socket: net.Socket) => {
  socket.on("data", (data: Buffer) => {
    const request = data.toString();
    const path = request.split(" ")[1];

    if (path === "/") {
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
      socket.end();
    } else if (path.startsWith("/user-agent/")) {
      const [headerArea] = request.split("\r\n\r\n");
      const lines = headerArea.split("\r\n");
      let contentLength, value, header;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().toLowerCase().includes("user-agent")) {
          header = line.split(":")[1];
          contentLength = header.length;
          value = header.split("/")[1];
        }
      }
      const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${contentLength}\r\n\r\nfoobar/${value}`;
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
