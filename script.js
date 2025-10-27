// Carrossel Hero
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".carousel-controls .carousel-dot");

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

// Botão de fechar dentro do menu mobile 
(function () {
  const mobileCloseBtn = document.querySelector(".mobile-close");
  if (!mobileCloseBtn) return;

  mobileCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (navLinksEl && navLinksEl.classList.contains("mobile-active"))
      toggleMobileMenu();
  });

  mobileCloseBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (navLinksEl && navLinksEl.classList.contains("mobile-active"))
        toggleMobileMenu();
    }
  });
})();

function goToSlide(n) {
  showSlide(n);
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

setInterval(nextSlide, 5000);

// Carrossel Depoimentos
let currentDepoimento = 0;
const depoimentos = document.querySelectorAll(".depoimento-slide");
const depoimentoDots = document.querySelectorAll("#depoimentos .carousel-dot");

function showDepoimento(n) {
  depoimentos.forEach((dep) => dep.classList.remove("active"));
  depoimentoDots.forEach((dot) => dot.classList.remove("active"));

  currentDepoimento = (n + depoimentos.length) % depoimentos.length;
  depoimentos[currentDepoimento].classList.add("active");
  depoimentoDots[currentDepoimento].classList.add("active");
}

function goToDepoimento(n) {
  showDepoimento(n);
}

function nextDepoimento() {
  showDepoimento(currentDepoimento + 1);
}

setInterval(nextDepoimento, 6000);

// Toggle Serviços
function toggleServico(element) {
  const wasActive = element.classList.contains("active");
  document.querySelectorAll(".servico-card").forEach((card) => {
    card.classList.remove("active");
  });
  if (!wasActive) {
    element.classList.add("active");
  }
}

// Toggle FAQ
function toggleFaq(element) {
  const p = element.querySelector("p");
  const icon = element.querySelector("i");

  if (p.style.display === "none" || p.style.display === "") {
    p.style.display = "block";
    icon.style.transform = "rotate(180deg)";
  } else {
    p.style.display = "none";
    icon.style.transform = "rotate(0deg)";
  }
}

// Modais
function openModal() {
  document.getElementById("modalDoacao").classList.add("active");
}

function closeModal() {
  document.getElementById("modalDoacao").classList.remove("active");
}

function openVoluntarioModal() {
  document.getElementById("modalVoluntario").classList.add("active");
}

function closeVoluntarioModal() {
  document.getElementById("modalVoluntario").classList.remove("active");
}

// Fechar modal ao clicar fora
window.onclick = function (event) {
  const modalDoacao = document.getElementById("modalDoacao");
  const modalVoluntario = document.getElementById("modalVoluntario");
  if (event.target === modalDoacao) {
    closeModal();
  }
  if (event.target === modalVoluntario) {
    closeVoluntarioModal();
  }
};

// Formulários
function handleSubmit(event) {
  event.preventDefault();
  alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
  event.target.reset();
}

function handleVoluntarioSubmit(event) {
  event.preventDefault();
  alert("Inscrição enviada com sucesso! Em breve entraremos em contato.");
  closeVoluntarioModal();
  event.target.reset();
}

// Scroll suave ao clicar nos links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Efeito de rolagem
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }
});

// Alternar menu móvel
const mobileMenuBtn = document.querySelector(".mobile-menu");
const navLinksEl = document.querySelector(".nav-links");

function toggleMobileMenu() {
  if (!navLinksEl || !mobileMenuBtn) return;
  const opened = navLinksEl.classList.toggle("mobile-active");
  mobileMenuBtn.setAttribute("aria-expanded", opened ? "true" : "false");
  const icon = mobileMenuBtn.querySelector("i");
  if (icon) {
    if (opened) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  }
}

if (mobileMenuBtn && navLinksEl) {
  mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  mobileMenuBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") toggleMobileMenu();
  });

  // Fechar o menu móvel quando um link de navegação é clicado
  navLinksEl.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (navLinksEl.classList.contains("mobile-active")) toggleMobileMenu();
    });
  });

  // Garante que o menu feche 
  window.addEventListener("resize", () => {
    if (
      window.innerWidth > 968 &&
      navLinksEl.classList.contains("mobile-active")
    ) {
      toggleMobileMenu();
    }
  });
}
