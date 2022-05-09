const express = require("express");

const Productos = require("./productsContainer.js");

const productos = new Productos("./productos.json");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Query version

// const idController = {
//   async getById(req, res) {
//     console.log(req.query);
//     if (Object.entries(req.query).length > 0) {
//       const obj = await productos.getById(Number(req.query.id));
//       console.log(obj);
//       obj !== null
//         ? await res.json(obj)
//         : await res.json({ error: "producto no encontrado" });
//     } else {
//       await res.json({ error: "producto no encontrado" });
//     }
//   },
// };

//  Params version

const idController = {
  async getById(req, res) {
    const id = req.params.id;

    try {
      const obj = await productos.getById(Number(id));
      console.log(obj);
      res.json(obj);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

const postProductController = {
  async save(req, res) {
    const productoAgregado = productos.save(req.body);
    res.status(201).json(productoAgregado);
  },
};

const deleteController = {
  async deleteById(req, res) {
    try {
      const id = req.params.id;
      const deletedProduct = productos.deleteById(Number(id));
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

const putProductController = {
  async editProductById(req, res) {
    try {
      const id = Number(req.params.id);
      const datos = req.body;
      const productoEditado = productos.editProductById(id, datos);
      res.json(productoEditado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

app.get("/", (req, res) => {
  res.send("Entrega 4");
});

app.get("/api/productos", productsController.getAll);

app.get("/api/productoRandom", randomController.getRandom);

// forma con query

// app.get("/api/productoById", idController.getById);

app.get("/api/productoById/:id", idController.getById);
app.post("/api/productos", postProductController.save);
app.delete("/api/productos/:id", deleteController.deleteById);
app.put("/api/productos/:id", putProductController.editProductById);

const PORT = 3002;
const server = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => {
  console.log(error.message);
});
