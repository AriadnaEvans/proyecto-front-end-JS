import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");

  const divAcciones = document.getElementById("acciones-carrito");

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "No hay productos en el carrito";
    contenedor.appendChild(mensaje);
    return; 
  }

  carrito.forEach((producto, indice) => {
    const artProducto = document.createElement("article");
    artProducto.classList.add("artProducto");

    const titulo = document.createElement("h2");
    titulo.classList.add("titulo");
    titulo.textContent = producto.nombre;
    
    const img = document.createElement("img");
    img.classList.add("img");
    img.src = producto.img;
    img.alt = producto.titulo
    
    const descripcion = document.createElement("h3");
    descripcion.classList.add("descripcion");
    descripcion.textContent = producto.descripcion;
  
    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.textContent = `Precio: $${producto.precio}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn");
    btnEliminar.classList.add("btn-eliminar-carrito");

    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(indice);

      renderizarCarrito();
    });

    artProducto.appendChild(titulo);
    artProducto.appendChild(img);
    artProducto.appendChild(descripcion);
    artProducto.appendChild(precio);
    artProducto.appendChild(btnEliminar);

    contenedor.appendChild(artProducto);
  });

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn");
  btnVaciar.classList.add("btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);