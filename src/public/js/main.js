// Create Client side instance
const socket = io();

socket.emit("saludito", "Hola, si conectados desde main.js de Public");

// Get array by socket
socket.on("dataProducts", (data) => {
  const listProducts = document.getElementById("list-products");
  listProducts.innerHTML = "";

  data.forEach((product) => {
    listProducts.innerHTML += `<div class="card">
    ${
      product.thumbnail
        ? `<img class="card-img-top" src=${product.thumbnail} />`
        : ""
    }
    <div class="card-body">
      <p><strong>id: </strong>${product.id}</p>
      <p><strong>Nombre: </strong>${product.title} </p>
      <p><strong>Descripción: </strong>${product.description} </p>
      <p><strong>Precio: </strong>${product.price} </p>
      <p><strong>Código: </strong>${product.code} </p>
      <p><strong>Stock: </strong>${product.stock} </p>
      <a href="#" class="btn btn-card">Eliminar</a>
    </div>
  </div>`;
  });
});

// Add event click to the container to identify the id of the product to be deleted
document.getElementById("list-products").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-card")) {
    const card = event.target.closest(".card");
    const productId = card.querySelector("p").textContent.split(":")[1].trim();
    socket.emit("deleteProduct", productId);
  }
});

// Add event Listeners to send form data to server
const productForm = document.getElementById("product-Form");
productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(productForm);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  console.log("Datos a enviar:", data);
  socket.emit("addProduct", data);
});
