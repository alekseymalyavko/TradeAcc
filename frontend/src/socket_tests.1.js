const io = require("socket.io-client");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzU1ZDM3MmI0OTc1ZjE5NGMyNWM0Y2YiLCJ1c2VybmFtZSI6IlBhdmVsIiwiaWF0IjoxNTQ5NTQ1NDc3LCJleHAiOjE1NTAxNTAyNzd9.HxMluwMcymYcXMsX9aJ1qTwiItINrPh6lWI1MrFC8jI";
var socket = io.connect("http://localhost:3000/chat", { query: { token } });

socket.emit("subscribe", "5c51eded24cca10aec974f6d");

console.log('Im Alex');

socket.on("ready", () => {
  setInterval(() => {
    socket.emit("message", {
      message: "Hi Pasha, i am Alex"
    });
  }, 5000);
});

socket.on("answer", (data) => {
  console.log(data.message);
});
