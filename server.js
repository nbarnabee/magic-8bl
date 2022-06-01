const http = require("http");
const fs = require("fs");
const path = require("path")

const responses = {
  0: "It is certain.",
  1: "It is decidedly so.",
  2: "Without a doubt.",
  3: "Yes, definitely.",
  4: "You may rely on it.",
  5: "As I see it, yes.",
  6: "Most likely.",
  7: "Outlook good.",
  8: "Yes.",
  9: "Signs point to yes.",
  10: "Reply hazy, try again.",
  11: "Ask again later.",
  12: "Better not tell you now.",
  13: "Cannot predict now.",
  14: "Concentrate and ask again.",
  15: "Don't count on it.",
  16: "My reply is no.",
  17: "My sources say no.",
  18: "Outlook not so good.",
  19: "Very doubtful."
}

const server = http.createServer((req, res) => {
  const extension = path.extname(req.url);
  const fileName = req.url.slice(1) || "index";
  let filePath = fileName;
  let contentType;
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".png": 
      contentType = "image/png";
      break;
    default:
      filePath = `${fileName}.html`;
      contentType = "text/html";
  };
  if (req.url === "/askTheBall")  
    {
      res.writeHead(200, {"Content-Type": "application/json"});
      let roll = Math.floor(Math.random()*20);
      const reply= {
        answer: responses[roll]
      };
      res.end(JSON.stringify(reply));
    } else {
      fs.readFile(filePath, function(err, data) {
        if (err) {
          console.log("Something went wrong");
          console.dir(err);
          return;
        }
        res.writeHead(200, {"Content-Type": contentType});
        res.end(data);
      })
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));