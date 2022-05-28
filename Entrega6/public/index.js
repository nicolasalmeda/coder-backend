const socket = io();

socket.on("mensajes", ({ mensajes }) => {
  console.log(mensajes);
  mostrarMensajes(mensajes);
});

socket.on("productos", function (productos) {
  console.log(productos);
  const divDatos = document.getElementById("datos");
  divDatos.innerHTML = data2TableJS(productos);
});

const formulario = document.getElementById("form");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // TODO armar el objeto con los datos del formulario
  const data = {
    title: form[0].value,
    price: form[1].value,
    thumbnail: form[2].value,
  };
  //console.log(data)

  fetch("/api/productos/", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((respuesta) => respuesta.json())
    .then((productos) => {
      // cuando guarde el producto, limpio el formulario y emito el evento de OK
      form.reset();
      socket.emit("update", "ok");
    })
    .catch((error) => console.error(error));
});

function data2TableJS(productos) {
  let res = "";
  if (productos.length) {
    res += `
      <style>
          .table td, .table th {
              vertical-align : middle;
          }
      </style>
      <div class="table-responsive">
          <table class="table table-dark">
              <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th> </tr>
      `;
    res += productos
      .map(
        (producto) => `
              <tr>
                  <td>${producto.title}</td>
                  <td>$${producto.price}</td>
                  <td><img width="50" src="${producto.thumbnail}" alt="not found"></td>
              </tr>
      `
      )
      .join(" ");
    res += `
          </table>
      </div>`;
  }
  return res;
}

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
