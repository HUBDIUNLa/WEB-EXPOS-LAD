
async function loadComponent(id, file) {
  const container = document.getElementById(id);

  // No todas las páginas incluyen todos los componentes.
  if (!container) return;

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(
        `No se pudo cargar ${file}: ${response.status}`
      );
    }

    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

function initNavbar() {
  const toggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const icon = document.getElementById("menu-icon");

  if (!toggle || !mobileMenu || !icon) return;

  function closeMenu() {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    toggle.setAttribute("aria-expanded", "false");
    icon.innerHTML = "&#9776;";
  }

  toggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");

    toggle.setAttribute("aria-expanded", String(!isOpen));
    icon.innerHTML = isOpen ? "&#9776;" : "&times;";
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function initArticleHeader() {
  const container = document.getElementById("article-header");

  if (!container) return;

  const backButton = container.querySelector(
    ".article-header-back"
  );

  if (!backButton) return;

  backButton.addEventListener("click", () => {
    if (document.referrer && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }
  });
}

/* Carga del menú principal */
loadComponent(
  "navbar",
  "components/navbar.html"
).then(initNavbar);

/* Carga del pie de página */
loadComponent(
  "footer",
  "components/footer.html"
);

/* Carga del encabezado de los artículos */
loadComponent(
  "article-header",
  "components/article-header.html?v=4"
).then(initArticleHeader);

/* Formulario de suscripción */
document.addEventListener("submit", (event) => {
  if (event.target.id !== "formComunidad") return;

  event.preventDefault();

  const message = document.getElementById(
    "mensajeSuscripcion"
  );

  if (message) {
    message.classList.remove("hidden");
  }

  event.target.reset();
});