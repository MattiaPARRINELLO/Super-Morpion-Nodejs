const express = require("express");
const { connect } = require("http2");
const app = express();
const port = 3000;
var http = require("http").Server(app);
const io = require("socket.io")(http);
let nbUser = 0;
app.get("/1", (req, res) => res.sendFile(__dirname + "/view/Joueur 1/"));
app.get("/2", (req, res) => res.sendFile(__dirname + "/view/Joueur 2/"));

io.on("connection", function (socket) {
  nbUser++;
  console.log(nbUser);
  if (nbUser > 2) {
    console.log("Too many users");
    socket.broadcast.emit("state", "Too many users");
    socket.disconnect();
    nbUser--;
  }
  socket.on("casePlayedJ2", (caseID) => {
    console.log("casePlayedJ2", caseID);
    let bigCase = caseID[0];
    //   take the last
    let smallCase = caseID[3];
    let list = [bigCase, smallCase];
    socket.broadcast.emit("casePlayedServerJ2", list);
  });
  socket.on("casePlayedJ1", (caseID) => {
    console.log("casePlayedJ1", caseID);
    //   take the first character of the caseID
    let bigCase = caseID[0];
    //   take the last
    let smallCase = caseID[3];
    let list = [bigCase, smallCase];
    socket.broadcast.emit("casePlayedServerJ1", list);
  });
  socket.on("disconnect", function () {
    console.log("user disconnected");
    nbUser--;
  });
});
// casePlayedServerJ1
app.set("port", process.env.PORT || 3000);

var server = http.listen(app.get("port"), function () {
  console.log("listening on *:" + app.get("port"));
});
