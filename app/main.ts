import * as net from "net";
import * as fs from "fs";

console.log("Logs from your program will appear here!");

const dirArgIndex = process.argv.indexOf("--directory");
const directory = dirArgIndex !== -1 ? process.argv[dirArgIndex + 1] : "";

const server = net.createServer((socket: net.Socket) => {
  socket.on("data", (data: Buffer) => {
    const request = data.toString();
    const requestType = request.split(" ")[0];
    const path = request.split(" ")[1];

    if (requestType === "GET") {
      if (path === "/") {
        socket.write("HTTP/1.1 200 OK\r\n\r\n");
        socket.end();
      } else if (path.startsWith("/echo/")) {
        const str = path.split("/")[2];
        const strLen = str.length;
        const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${strLen}\r\n\r\n${str}`;
        socket.write(response);
        socket.end();
      } else if (path.startsWith("/user-agent")) {
        const [part] = request.split("\r\n\r\n");
        const lines = part.split("\r\n");
        let userAgentValue = "";

        for (let i = 1; i < lines.length; i++) {
          const [key, ...valueParts] = lines[i].split(":");

          if (key.trim().toLowerCase() === "user-agent") {
            userAgentValue = valueParts.join(":").trim();
            break;
          }
        }

        const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgentValue.length}\r\n\r\n${userAgentValue}`;
        socket.write(response);
        socket.end();
      } else if (path.startsWith("/files/")) {
        const fileName = path.split("/")[2];
        const filePath = `${directory}${fileName}`;

        try {
          const content = fs.readFileSync(filePath, "utf8");
          const response = `HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${content.length}\r\n\r\n${content}`;

          socket.write(response);
          socket.end();
        } catch (error) {
          socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
          socket.end();
        }
      } else {
        socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        socket.end();
      }
    } else if (requestType === "POST") {
      const requestParts = request.split("\r\n\r\n");
      const requestBody = requestParts.at(-1);
      const content = requestParts.at(-2);

      if (path.startsWith("/files/")) {
        const fileName = path.split("/")[2];
        const filePath = `${directory}${fileName}`;

        try {
          fs.writeFileSync(`${filePath}`, requestBody);
        } catch (err) {
          console.log(err);
        }
        socket.write("HTTP/1.1 201 Created\r\n\r\n");
      }
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
