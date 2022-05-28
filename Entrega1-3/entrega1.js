class Contenedor {
  constructor(objeto) {
    this.objeto = objeto;
  }

  save(obj) {
    this.objeto.push(obj);
  }

  getById(num) {
    let f = [];
    for (let i = 0; i < this.objeto.length; i++) {
      if (num === this.objeto[i].id) {
        f = this.objeto[i];
      } else {
        f = ["No se encontro el id"];
      }
    }
    return f;
  }

  getAll() {
    return this.objeto;
  }

  deleteById(num) {
    for (let i = 0; i < this.objeto.length; i++) {
      if (num === this.objeto[i].id) {
        this.objeto.splice(i, 1);
      }
    }
  }

  deleteAll() {
    this.objeto = [];
  }
}

const contenedor1 = new Contenedor([
  {
    id: 0,
    title: "caja",
    price: 0,
    thumbnail: "https://www.google.com/imgres?",
  },
]);

console.log(contenedor1);

contenedor1.save({
  id: 1,
  title: "caja2",
  price: 20,
  thumbnail: "https://www.google.com/imgres?imgurl",
});

contenedor1.save({
  id: 2,
  title: "caja3",
  price: 30,
  thumbnail: "https://www.google.com/imgres?imgurl=",
});

console.log(contenedor1);

console.log(contenedor1.getById(4));

contenedor1.deleteById(0);

console.log("Contenedor con id borrado", contenedor1);

console.log(" todo en el contenedor:", contenedor1.getAll());

contenedor1.deleteAll();

console.log("Contenedor borrado", contenedor1.getAll());
