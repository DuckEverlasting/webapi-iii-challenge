const express = require('express');

const server = express();

server.use(logger);
server.use(useCORS);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function userCORS(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

function logger(req, res, next) {
  console.log("type:", req.method);
  console.log("url:", req.url);
  console.log(Date.now());
  next();
};

module.exports = server;