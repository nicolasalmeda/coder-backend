const { dataBaseCarrito } = require("../databases/dataBaseCarrito.js");

const controladoresCarrito = {
  create: (req, res) => {
    const carrito = dataBaseCarrito.create();
    res.json(carrito);
  },
  agregarProductoACarrito: (req, res) => {
    const numC = req.params.id_carrito;
    const numP = req.body.id;
    try {
      const obj = dataBaseCarrito.agregarProductoaCarrito(
        Number(numC),
        Number(numP)
      );
      console.log(obj);
      res.json(obj);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  getCarritoProducts: (req, res) => {
    const numC = req.params.id_carrito;
    const allCarrito = dataBaseCarrito.getCarritoProducts(Number(numC));
    console.log(allCarrito);
    res.json(allCarrito);
  },
  deleteByIdCarrito: (req, res) => {
    try {
      const numC = req.params.id_carrito;
      const numP = req.params.id_prod;
      const deletedProductCarrito = dataBaseCarrito.deleteByIdCarrito(
        Number(numC),
        Number(numP)
      );
      res.sendStatus(204);
    } catch (error) {
      if (error.tipo === "db not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
  deleteAllCarrito: (req, res) => {
    try {
      const numC = req.params.id_carrito;
      const deleted = dataBaseCarrito.deleteAllCarrito(Number(numC));
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

module.exports = { controladoresCarrito };
