const express = require("express");

const { webRouter } = require("./routers/webRouter.js");
const { engine } = require("express-handlebars");
const { controladoresApi } = require("./controllers/controladoresApi.js");
const { routerApiProductos } = require("./routers/routerApiProductos.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("handlebars", engine());
app.set("view engine", "pug");

app.use(webRouter);

app.use(routerApiProductos);

const PORT = 3004;
const server = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => {
  console.log(error.message);
});
