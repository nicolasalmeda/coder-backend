const productos = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
];

const databaseProductos = {
  save(product) {
    const newProduct = {
      id: productos.length + 1,
      ...product,
    };
    productos.push(newProduct);

    console.log("Producto agregado");
    return newProduct;
  },

  getById: (num) => {
    let obj = productos.find((obj) => obj.id === num);
    if (!obj) {
      const error = new Error("producto no encontrado");
      error.tipo = "db not found";
      throw error;
    } else {
      return obj;
    }
  },

  getRandom: () => {
    let random = Math.floor(Math.random() * productos.length);
    return productos[random];
  },

  getAll: () => {
    return [...productos];
  },

  deleteById: (num) => {
    const indiceBorrado = productos.findIndex((p) => p.id === num);

    if (indiceBorrado === -1) {
      const error = new Error("producto no encontrado");
      error.tipo = "db not found";
      throw error;
    }
    productos.splice(indiceBorrado, 1);
  },

  editProductById(id, datos) {
    const indiceBuscado = productos.findIndex((p) => p.id === id);

    if (indiceBuscado === -1) {
      const error = new Error("producto no encontrado");
      error.tipo = "db not found";
      throw error;
    }

    const producto = datos;
    producto.id = id;
    productos[indiceBuscado] = producto;
    return producto;
  },

  deleteAll: () => {
    productos = [];
  },
};

module.exports = { databaseProductos };
