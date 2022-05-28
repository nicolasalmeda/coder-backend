const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOserver } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOserver(httpServer);
const webRouter = require("./routers/webRouters.js");

const { obtenerMensajes, agregarMensajes } = require("./mensajes.js");

app.use(express.static("./public"));

app.use("/", webRouter);

io.on("connection", (socket) => {
  const mensajes = obtenerMensajes();
  console.log("alguien se conectó");
  socket.emit("mensajes", { mensajes });
  socket.on("mensaje", (mensaje) => {
    agregarMensajes(mensaje);
    const mensajes = obtenerMensajes();
    io.sockets.emit("mensajes", { mensajes });
  });
});

httpServer.listen(3001, () => console.log("SERVER ON"));
