const mensajes = [
  { autor: "pepe", texto: "como estas" },
  { autor: "lala", texto: "me llego un privado al instragram" },
  { autor: "Paola", texto: "era el amor que alguna vez " },
];

function obtenerMensajes() {
  return mensajes;
}

function agregarMensajes(mensaje) {
  mensajes.push(mensaje);
}

module.exports = {
  obtenerMensajes,
  agregarMensajes,
};
