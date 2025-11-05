import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  //Leemos cantidad de productos en carrito para mostrar
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  //Accedemos al nodo donde vamos a mostrar las tarjetas de producto
  const contenedor = document.getElementById("contenedor-carrito");
  // Botones de acciones
  const divAcciones = document.getElementById("acciones-carrito");

  //Esta lineas limpian los contenedor antes de renderizar tarjetas y botones
  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  //❌Si no hay productos en el carrito mostramos un mensaje
  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "No hay productos en el carrito";
    contenedor.appendChild(mensaje);
    return; //⚠️salimos de la funcion para no intentar renderizar productos
  }

  //✅Si hay productos en el carrito los renderizamos
  //💡El forEach nos puede dar el indice del producto en el array
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

    //💡Aca nos sirve el indice, para poder pasarselo a la funcion de eliminar
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(indice);

      //⚠️Importante! Volver a renderizar el carrito para actualizar la vista,
      // ya que sino quedaria con el producto eliminado porque solo borramos del storage
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

    //⚠️Importante! Volver a renderizar el carrito para actualizar la vista,
    // ya que sino quedaria con los productos viejos porque solo borramos del storage
    renderizarCarrito();
  });

  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);