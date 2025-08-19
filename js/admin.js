// Ejecutar cuando se carga el DOM
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
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
    const tbody = document.querySelector("tbody");
    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
    
                  <th scope="row">${product.id}</th>
                  <td>${product.name}</td>
                  <td>
                    <img
                      src="${product.image}"
                      alt=""
                      srcset=""
                      style="width: 10rem"
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
                    <button type="button" class="btn btn-outline-danger">
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </td>
                `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al cargar los productos", error);
  }
}
