const { databaseProductos, productos } = require("./databaseProductos.js");

const carrito = [
  {
    id: 1,
    products: [
      {
        nombre: "Coca-cola",
        precio: 15,
        descripcion: "refresco de cola",
        codigo: "15432",
        stock: 150,
        url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fes%2Fsearch%3Fq%3Dcola&psig=AOvVaw2ml94GTnUU7aLZnChlto48&ust=1654210643089000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCV1v-sjfgCFQAAAAAdAAAAABAD",
        id: 0,
      },
    ],
  },
];

const dataBaseCarrito = {
  create: () => {
    const newCarrito = { id: carrito.length + 1, products: [] };
    carrito.push(newCarrito);
    console.log("carrito creado");
    return newCarrito.id;
  },
  agregarProductoaCarrito(numC, numP) {
    let producto = productos.find((e) => e.id === numP);
    let carry = carry.findIndex((e) => e.id === numC);
    if (carry === -1) {
      const error = new Error("Producto no encontrado");
      error.tipo = "db not found";
      throw error;
    } else {
      if (producto) {
        const newProduct = producto;
        carrito.products.push(newProduct);
        console.log("Producto Agregado a Carrito");
        return newProduct;
      } else {
        return console.log("Producto no encontrado");
      }
    }
  },

  getCarritoProducts(num) {
    const indiceCarrito = carrito.findIndex((p) => p.id === num);
    if (indiceCarrito === -1) {
      const error = new Error("Producto no encontrado");
      error.tipo = "db not found";
      throw error;
    } else {
      return carrito[indiceCarrito].products;
    }
  },
  deleteByIdCarrito: (numC, numP) => {
    const indiceBorradoCarrito = carrito.findIndex((p) => p.id === numC);

    if (indiceBorradoCarrito === -1) {
      const error = new Error("producto no encontrado");
      error.tipo = "db not found";
      throw error;
    } else {
      const indiceBorradoProducto = carrito.products.findIndex(
        (p) => p.id === numP
      );

      if (indiceBorradoProducto === -1) {
        const error = new Error("producto no encontrado");
        error.tipo = "db not found";
        throw error;
      } else {
        carrito.products.splice(indiceBorrado, 1);
      }
    }
  },
  deleteAllCarrito: (num) => {
    const indiceBorrado = carrito.findIndex((p) => p.id === num);

    if (indiceBorrado === -1) {
      const error = new Error("carrito no encontrado");
      error.tipo = "db not found";
      throw error;
    }
    carrito.products = [];
  },
};

module.exports = { dataBaseCarrito };
