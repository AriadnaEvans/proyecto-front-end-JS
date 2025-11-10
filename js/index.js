import { arrayProductos } from "./productos.js";
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const seccionProductos = document.getElementById("seccionProductos");

  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  arrayProductos.forEach ((producto) => {

    const artProducto = document.createElement("article");
    artProducto.classList.add("artProducto");

    const nombre = document.createElement("h2");
    nombre.classList.add("nombre");
    nombre.textContent = producto.nombre;
    
    const img = document.createElement("img");
    img.classList.add("img");
    img.src = `./${producto.img}`;
    img.alt = producto.nombre
    
    const descripcion = document.createElement("h3");
    descripcion.classList.add("descripcion");
    descripcion.textContent = producto.descripcion;
  
    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.textContent = `Precio: $${producto.precio}`;

    const boton = document.createElement("button");
    boton.classList.add("btn");
    boton.textContent = "Agregar al carrito";

    boton.addEventListener("click", () => {
      agregarAlCarrito(producto);
    });

    artProducto.appendChild(nombre);
    artProducto.appendChild(img);
    artProducto.appendChild(descripcion);
    artProducto.appendChild(precio);
    artProducto.appendChild(boton);

    seccionProductos.appendChild(artProducto)

  })

})
  
  