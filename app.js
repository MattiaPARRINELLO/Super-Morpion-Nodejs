const express = require("express");
const app = express();
const port = 3000;
var http = require("http").Server(app);
const io = require("socket.io")(http);
const connectedUsers = { "Player 1": false, "Player 2": false };

app.get("/1", (req, res) => res.sendFile(__dirname + "/view/Joueur 1/"));
app.get("/2", (req, res) => res.sendFile(__dirname + "/view/Joueur 2/"));

io.on("connection", function (socket) {
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
});
// casePlayedServerJ1
app.set("port", process.env.PORT || 3000);

var server = http.listen(app.get("port"), function () {
  console.log("listening on *:" + app.get("port"));
});
