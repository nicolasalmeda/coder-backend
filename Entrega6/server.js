const express = require("express");

const { webRouter } = require("./routers/webRouter.js");
const { engine } = require("express-handlebars");
const { controladoresApi } = require("./controllers/controladoresApi.js");
const { routerApiProductos } = require("./routers/routerApiProductos.js");

const { Server: HttpServer } = require("http");
const { Server: IOserver } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOserver(httpServer);

const { obtenerMensajes, agregarMensajes } = require("./mensajes.js");
const { databaseProductos } = require("./databases/databaseProductos.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(webRouter);

app.use(routerApiProductos);

io.on("connection", (socket) => {
  console.log("¡Nuevo cliente conectado!");
  socket.emit("productos", databaseProductos.getAll());
  socket.on("update", (data) => {
    if ((data = "ok")) {
      io.sockets.emit("productos", databaseProductos.getAll());
    }
  });
});

io.on("connection", (socket) => {
  const mensajes = obtenerMensajes();
  socket.emit("mensajes", { mensajes });
  socket.on("mensaje", (mensaje) => {
    agregarMensajes(mensaje);
    const mensajes = obtenerMensajes();
    io.sockets.emit("mensajes", { mensajes });
  });
});

httpServer.listen(3005, () => console.log("SERVER ON"));
