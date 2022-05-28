const express = require("express");
const { Router } = require("express");
const { controladoresApi } = require("../controllers/controladoresApi.js");

const routerApiProductos = new Router();
routerApiProductos.use(express.json());
routerApiProductos.use(express.urlencoded({ extended: true }));

routerApiProductos.get("/api/productos", controladoresApi.getAll);
routerApiProductos.get("/api/productoRandom", controladoresApi.getRandom);
routerApiProductos.get("/api/productoById/:id", controladoresApi.getById);
routerApiProductos.post("/api/productos", controladoresApi.save);
routerApiProductos.delete("/api/productos/:id", controladoresApi.deleteById);
routerApiProductos.put("/api/productos/:id", controladoresApi.editProductById);

module.exports = { routerApiProductos };
