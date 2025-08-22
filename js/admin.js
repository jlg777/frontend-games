let products = [];

// Ejecutar cuando se carga el DOM
document.addEventListener("DOMContentLoaded", async () => {
  products = (await loadProducts()) || [];
  if (products.length > 0) {
    generateTable(products);
  }
});

// Función para formatear la fecha
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES");
}

//Función para cargar los productos
async function loadProducts() {
  try {
    const response = await fetch("../mocks/products.json");
    const products = await response.json();
    //console.log(products);
    return products;
  } catch (error) {
    console.error("Error al cargar los productos", error);
  }
}

//Función para generar tabla
function generateTable(products) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    
                  <th scope="row">${product.id}</th>
                  <td>${product.name}</td>
                  <td>
                    <img
                      src="${product.image}"
                      style="width: 10rem; height: 8rem; object-fit: cover;"
                      class="rounded"
                    />
                  </td>
                  <td>${product.price}</td>
                  <td>${product.category}</td>
                  <td>
                    ${product.description}
                  </td>
                  <td>${formatDate(product.createdAt)}</td>
                  <td>
                    <button type="button" class="btn btn-outline-primary">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" >
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </td>
                `;
    tbody.appendChild(row);
  });
}

//Función para agregar nuevos productos
document.getElementById("xiaomiForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = e.target.elements;
  //console.log(elements["productName"].value);

  const newProduct = {
    id: Date.now(),
    name: elements["productName"].value,
    image:
      elements["productImage"].value ||
      "https://provialmex.com.mx/wp-content/uploads/2023/03/simbolo-de-prohibido-1024x819.webp",
    price: elements["productPrice"].value,
    category: elements["productCategory"].value,
    description: elements["productDescription"].value,
    createdAt: new Date().toISOString(),
  };

  //console.log(newProduct);
  Swal.fire({
    icon: "success",
    title: "Carga correcta!",
    text: "El producto se ha cargado correctamente.",
    theme: "dark",
  });
  products.push(newProduct);
  generateTable(products);
  e.target.reset();
});

//Función para eliminar productos
function deleteProducts(id) {
  Swal.fire({
    title: "¿Quiere eliminar el producto?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    denyButtonText: `No eliminar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        // Aquí también deberías eliminar la fila de la tabla en el DOM
        generateTable(products);
      }
      Swal.fire("Producto Eliminado", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Cambios no grabados", "", "info");
    }
  });
}

//Función para buscar el ID del producto a eliminar
document.querySelector("tbody").addEventListener("click", (e) => {
  if (e.target.closest(".btn-outline-danger")) {
    const row = e.target.closest("tr");
    const id = parseInt(row.querySelector("th").textContent);
    deleteProducts(id);
  }
});

//Filtros
//Búsqueda por nombre
document.querySelector("#searchByName").addEventListener("keyup", (e) => {
  const inputValue = e.target.value.toLowerCase();
  const productsFiltered = products.filter((product) => {
    return product.name.toLowerCase().includes(inputValue);
  });
  generateTable(productsFiltered);
  //console.log(inputValue);
});

//Búsqueda por categoría
document.querySelector("#searchByCategory").addEventListener("change", (e) => {
  const productsCategory = e.target.value;
  productsCategory === "all"
    ? generateTable(products)
    : generateTable(products.filter((p) => p.category === productsCategory));
  //console.log(productsCategory);
});
