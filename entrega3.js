const express = require("express");
const fs = require("fs/promises");
const Productos = require("./productsContainer.js");

const productos = new Productos("./productos.json");

const app = express();

const productsController = {
  async getAll(req, res) {
    const allProducts = await productos.getAll();
    console.log(allProducts);
    await res.json(allProducts);
  },
};

const randomController = {
  async getRandom(req, res) {
    const random = await productos.getRandom();
    console.log(random);
    await res.json(random);
  },
};

app.get("/", (req, res) => {
  res.send("Hola Mundo!");
});

app.get("/productos", productsController.getAll);

app.get("/productoRandom", randomController.getRandom);

const PORT = 3001;
const server = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => {
  console.log(error.message);
});
