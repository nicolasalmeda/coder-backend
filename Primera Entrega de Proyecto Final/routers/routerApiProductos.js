const express = require("express");
const { Router } = require("express");
const { controladoresApi } = require("../controllers/controladoresApi.js");

const routerApiProductos = new Router();
routerApiProductos.use(express.json());
routerApiProductos.use(express.urlencoded({ extended: true }));

let esAdmin = false;

function Admins(req, res, next) {
  if (esAdmin) {
    next();
  } else {
    res.sendStatus(403);
  }
}

routerApiProductos.get("/login", controladoresApi.login);

routerApiProductos.get("/logout", controladoresApi.logout);

routerApiProductos.get("/api/productos", controladoresApi.getAll);
routerApiProductos.get("/api/productoRandom", controladoresApi.getRandom);
routerApiProductos.get("/api/productoById/:id", controladoresApi.getById);
routerApiProductos.post("/api/productos", Admins, controladoresApi.save);
routerApiProductos.delete(
  "/api/productos/:id",
  Admins,
  controladoresApi.deleteById
);
routerApiProductos.put(
  "/api/productos/:id",
  Admins,
  controladoresApi.editProductById
);
routerApiProductos.all("*", (req, res) => {
  res.status(404).json("PAGINA NO ENCONTRADA");
});

module.exports = { routerApiProductos };
