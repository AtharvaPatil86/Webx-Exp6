const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const existingUsernames = ["atharva123", "nikam36", "pratik40", "laukik37", "aman60", "nishant24", "sai43", "abhinav1", "ganesh12", "moti21"];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    fs.readFile("./public/index.html", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading HTML file");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }

  else if (req.method === "POST" && req.url === "/check-username") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const { username } = JSON.parse(body);
      const exists = existingUsernames.includes(username);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ exists }));
    });
  }

  else if (req.method === "POST" && req.url === "/register") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const data = JSON.parse(body);
      // Simulate registration
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Successfully Registered" }));
    });
  }

  else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
