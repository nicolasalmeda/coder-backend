const { databaseProductos } = require("../databases/databaseProductos.js");

const serverInfo = {
  os: "window10",
  framework: "express",
};

const controladoresApi = {
  info: (req, res) => {
    res.json(serverInfo);
  },
  getAll: (req, res) => {
    const allProducts = databaseProductos.getAll();
    console.log(allProducts);
    res.json(allProducts);
  },
  getRandom: (req, res) => {
    const random = databaseProductos.getRandom();
    console.log(random);
    res.json(random);
  },
  getById: (req, res) => {
    const id = req.params.id;

    try {
      const obj = databaseProductos.getById(Number(id));
      console.log(obj);
      res.json(obj);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  save: (req, res) => {
    const productoAgregado = databaseProductos.save(req.body);
    res.status(201).json(productoAgregado);
  },
  deleteById: (req, res) => {
    try {
      const id = req.params.id;
      const deletedProduct = databaseProductos.deleteById(Number(id));
      res.sendStatus(204);
    } catch (error) {
      if (error.tipo === "db not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
  editProductById: (req, res) => {
    try {
      const id = Number(req.params.id);
      const datos = req.body;
      const productoEditado = databaseProductos.editProductById(id, datos);
      res.json(productoEditado);
    } catch (error) {
      if (error.tipo === "db not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
  login: (req, res) => {
    esAdmin = true;
    res.sendStatus(200);
  },

  logout: (req, res) => {
    esAdmin = false;
    res.sendStatus(200);
  },
};

module.exports = { controladoresApi };
