const express = require("express");
const { Router } = require("express");
const {
  controladoresCarrito,
} = require("../controllers/controladoresCarrito.js");

const routerCarrito = new Router();

routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({ extended: true }));

routerCarrito.post("/api/carritos/", controladoresCarrito.create);
routerCarrito.post(
  "/api/carritos/:id_carrito",
  controladoresCarrito.agregarProductoACarrito
);
routerCarrito.get(
  "/api/carritos/productos",
  controladoresCarrito.getAllCarrito
);
routerCarrito.delete(
  "/api/carritos/:id_carrito/productos/:id_prod",
  controladoresCarrito.deleteByIdCarrito
);
routerCarrito.delete(
  "/api/carritos/:id_carrito",
  controladoresCarrito.deleteAllCarrito
);
routerCarrito.all("*", (req, res) => {
  res.status(404).json("PAGINA NO ENCONTRADA");
});

module.exports = { routerCarrito };
