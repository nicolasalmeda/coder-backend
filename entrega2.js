const fs = require("fs");
const ruta = "./productos.txt";
const ruta2 = "./prodcutsoPrueba.txt";

class Contenedor {
  constructor(objeto) {
    this.objeto = objeto;
  }

  async save(obj) {
    try {
      const contenedor = await fs.promises.readFile(ruta, "utf-8");
      const ar = JSON.parse(contenedor);
      ar.push(obj);

      await fs.promises.writeFile(ruta2, JSON.stringify(ar));
      console.log("objeto guardado");
    } catch (error) {
      throw error;
    }
  }

  async getById(num) {
    try {
      const contenedor = await fs.promises.readFile(ruta, "utf-8");
      const ar = JSON.parse(contenedor);
      // let f = [];

      // for (let i = 0; i < ar.length; i++) {
      //   if (num === ar[i].id) {
      //     f = ar[i];
      //   } else {
      //     null;
      //   }

      //   console.log(f);
      // }
      let obj = ar.find((obj) => obj.id === num);
      return obj || null;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(ruta2, "utf-8");
      return contenido;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(num) {
    try {
      const contenedor = await fs.promises.readFile(ruta2, "utf-8");
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
}

const contenedor1 = new Contenedor();

// contenedor1.save({
//   id: 4,
//   title: "caja2",
//   price: 20,
//   thumbnail: "https://www.google.com/imgres?imgurl",
// });

contenedor1.getById(2).then((val) => console.log(val));
console.log("hecho");
contenedor1.getAll().then((val) => console.log(val));
// contenedor1.deleteAll();
// contenedor1.deleteById();
// contenedor1.getAll();
