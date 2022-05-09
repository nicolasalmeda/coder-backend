const fs = require("fs/promises");
// const ruta = "./productos.txt";
// const ruta2 = "./prodcutsoPrueba.txt";

module.exports = class Contenedor {
  constructor(objeto) {
    this.objeto = objeto;
  }

  // async save(obj) {
  //   try {
  //     const contenedor = await fs.promises.readFile(this.objeto, "utf-8");
  //     const ar = JSON.parse(contenedor);
  //     ar.push(obj);

  //     await fs.promises.writeFile(this.objeto, JSON.stringify(ar));
  //     console.log("objeto guardado");
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async save(product) {
    try {
      const contenedor = await fs.readFile(this.objeto, "utf-8");
      const ar = JSON.parse(contenedor);
      const newProduct = {
        id: ar.length + 1,
        ...product,
      };
      ar.push(newProduct);

      await fs.writeFile(this.objeto, JSON.stringify(ar));
      console.log("Producto agregado");
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getById(num) {
    try {
      const contenedor = await fs.readFile(this.objeto, "utf-8");
      const ar = JSON.parse(contenedor);
      let obj = ar.find((obj) => obj.id === num);
      if (!obj) {
        throw new Error("producto no encontrado");
      } else {
        return obj;
      }
    } catch (error) {
      throw error;
    }
  }

  async getRandom() {
    try {
      let contenido = await this.getAll();
      let random = Math.floor(Math.random() * contenido.length);
      return contenido[random];
    } catch (e) {
      return e;
    }
  }

  async getAll() {
    try {
      const contenido = await fs.readFile(this.objeto, "utf-8");
      let cont = await JSON.parse(contenido);
      return cont;
    } catch (error) {
      throw error;
    }
  }

  // async deleteById(num) {
  //   try {
  //     const contenedor = await fs.readFile(this.objeto, "utf-8");
  //     const ar = await JSON.parse(contenedor);
  //     for (let i = 0; i < ar.length; i++) {
  //       if (num === ar[i].id) {
  //         ar.splice(i, 1);
  //       }
  //     }

  //     await fs.promises.writeFile(ruta2, JSON.stringify(ar));
  //     console.log(`id : ${num} borrado`);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async deleteById(num) {
    try {
      const contenedor = await fs.readFile(this.objeto, "utf-8");
      const ar = await JSON.parse(contenedor);
      const indiceBorrado = ar.findIndex((p) => p.id === num);

      if (indiceBorrado === -1) {
        throw new Error("producto no encontrado");
      }
      ar.splice(indiceBorrado, 1);

      await fs.writeFile(this.objeto, JSON.stringify(ar));
      console.log(`id : ${num} borrado`);
    } catch (error) {
      throw error;
    }
  }

  async editProductById(id, datos) {
    try {
      const contenedor = await fs.readFile(this.objeto, "utf-8");
      const ar = await JSON.parse(contenedor);
      const indiceBuscado = ar.findIndex((p) => p.id === id);

      if (indiceBuscado === -1) {
        throw new Error("producto no encontrado");
      }

      const producto = datos;
      producto.id = id;
      ar[indiceBuscado] = producto;
      await fs.writeFile(this.objeto, JSON.stringify(ar));
      console.log(`id : ${num} borrado`);
      return producto;
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    await fs.writeFile(this.objeto, []);
  }
};
