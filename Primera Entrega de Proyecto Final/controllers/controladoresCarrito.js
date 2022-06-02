const { dataBaseCarrito } = require("../databases/dataBaseCarrito.js");

const controladoresCarrito = {
  create: (req, res) => {
    const carrito = dataBaseCarrito.create();
    res.json(carrito);
  },
  agregarProductoACarrito: (req, res) => {
    const id = req.params.id_carrito;
    try {
      const obj = dataBaseCarrito.agregarProductoaCarrito(Number(id));
      console.log(obj);
      res.json(obj);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  getAllCarrito: (req, res) => {
    const allCarrito = dataBaseCarrito.getAllCarrito();
    console.log(allCarrito);
    res.json(allCarrito);
  },
  deleteByIdCarrito: (req, res) => {
    try {
      const numC = req.params.idC;
      const numP = req.params.idP;
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
      const deleted = dataBaseCarrito.deleteAllCarrito();
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

module.exports = { controladoresCarrito };
