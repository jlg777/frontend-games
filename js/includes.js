function includeHTML(id, file, callback) {
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error(`No se pudo cargar ${file}`);
      return response.text();
    })
    .then((data) => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    })
    .catch((error) => console.error("Error al incluir HTML:", error));
}

// Cargar nav y footer
includeHTML("nav-placeholder", "../components/nav.html", () => {
  const toggleBtn = document.getElementById("themeToggleBtn");
  const html = document.documentElement;

  toggleBtn.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-bs-theme", newTheme);

    toggleBtn.innerHTML =
      newTheme === "dark"
        ? '<i class="bi bi-sun-fill"></i>'
        : '<i class="bi bi-moon-fill"></i>';
    // Cambiar clases del botón
    toggleBtn.classList.toggle("btn-outline-light");
    toggleBtn.classList.toggle("btn-outline-dark");
  });
});
includeHTML("footer-placeholder", "../components/footer.html");
