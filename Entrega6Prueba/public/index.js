const socket = io();

socket.on("mensajes", ({ mensajes }) => {
  console.log(mensajes);
  mostrarMensajes(mensajes);
});

socket.on("Molesto!", () => {
  alert("el servidor esta aburrido y molestando");
});

const btn = document.getElementById("btn_enviar");
btn.addEventListener("click", (e) => {
  const autor = document.getElementById("inputAutor").value;
  const texto = document.getElementById("inputTexto").value;
  socket.emit("mensaje", { autor, texto });
});

function armarListaDesordenada(lineas) {
  const listItems = lineas.map((l) => `<li>${l}</li>`);
  const html = `<ul>
  ${listItems.join("")}
  </ul>`;
  return html;
}

function mostrarMensajes(mensajes) {
  const divMensajes = document.getElementById("mensajes");
  const lineasMensajes = mensajes.map((o) => `${o.autor}:${o.texto}`);

  divMensajes.innerHTML = armarListaDesordenada(lineasMensajes);
}
