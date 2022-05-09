const fs = require("fs/promises");
// const ruta = "./productos.txt";
// const ruta2 = "./prodcutsoPrueba.txt";

module.exports = class Contenedor {
  constructor(objeto) {
    this.objeto = objeto;
  }

  async save(obj) {
    try {
      const contenedor = await fs.promises.readFile(this.objeto, "utf-8");
      const ar = JSON.parse(contenedor);
      ar.push(obj);

      await fs.promises.writeFile(this.objeto, JSON.stringify(ar));
      console.log("objeto guardado");
    } catch (error) {
      throw error;
    }
  }

  async getById(num) {
    try {
      const contenedor = await fs.promises.readFile(ruta, "utf-8");
      const ar = JSON.parse(contenedor);
      let obj = ar.find((obj) => obj.id === num);
      return obj || null;
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

  async deleteById(num) {
    try {
      const contenedor = await fs.readFile(this.objeto, "utf-8");
      const ar = await JSON.parse(contenedor);
      for (let i = 0; i < ar.length; i++) {
        if (num === ar[i].id) {
          ar.splice(i, 1);
        }
      }

      await fs.promises.writeFile(ruta2, JSON.stringify(ar));
      console.log(`id : ${num} borrado`);
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(ruta2, []);
  }
};
