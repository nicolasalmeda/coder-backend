const express = require("express");

const webRouter = express.Router();

const { databaseProductos } = require("../databases/databaseProductos.js");

webRouter.get("/", (req, res) => {
  res.sendFile("formulario.ejs", { root: "views" });
});

webRouter.post("/", (req, res) => {
  databaseProductos.save(req.body);

  res.redirect("/");
});

webRouter.get("/productos", (req, res) => {
  const items = databaseProductos.getAll();
  console.log(items);
  if (items.length > 0) {
    res.render("tabla", {
      items: databaseProductos.getAll(),
      productsExists: true,
    });
  } else {
    res.render("tabla", {
      items: databaseProductos.getAll(),
      productsExists: false,
    });
  }
});

module.exports = { webRouter };