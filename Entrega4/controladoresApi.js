const Productos = require("./productsContainer.js");
const productos = new Productos("./productos.json");

const serverInfo = {
  os: "window10",
  framework: "express",
};

const controllerApi = {
  info: (req, res) => {
    res.json(serverInfo);
  },
  getAll: (req, res) => {
    const allProducts = productos.getAll();
    console.log(allProducts);
    res.json(allProducts);
  },
  getRandom: (req, res) => {
    const random = productos.getRandom();
    console.log(random);
    res.json(random);
  },
};
