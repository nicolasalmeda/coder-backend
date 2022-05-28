class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  get GetFullName() {
    return this.fullName();
  }

  addMascota(masc) {
    return this.mascotas.push(masc);
  }

  get countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, author) {
    this.libros.push({ nombre, author });
  }

  fullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  getBookNames() {
    for (let i = 0; i < this.libros.length; i++) {
      console.log(this.libros[i].nombre);
    }
  }
}

const user1 = new Usuario("Gabriel", "Gutierrez", [], []);

console.log(user1.GetFullName);

console.log(user1.mascotas);

console.log(user1.libros);

user1.addMascota("perro");

console.log(user1.mascotas);

user1.addBook("juan de la mancha", "diego");

console.log(user1.libros);
user1.getBookNames();

user1.addBook("Gordo", "trolo");
user1.getBookNames();
