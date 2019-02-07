const io = require("socket.io-client");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzUxZWRlZDI0Y2NhMTBhZWM5NzRmNmQiLCJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE1NDk1NDI1MzIsImV4cCI6MTU1MDE0NzMzMn0.TXSO7cShfn-93QmNe_jqMUq8PFlSvSfDjQHaX6F6Ub8";
var socket = io.connect("http://localhost:3000/chat", { query: { token } });

socket.emit("subscribe", "5c55d372b4975f194c25c4cf");

console.log('Im Pasha');

socket.on("ready", () => {
  setInterval(() => {
    socket.emit("message", {
      message: "Hi Alex, i am Pasha"
    });
  }, 5000);
});

socket.on("answer", (data) => {
  console.log(data.message);
});