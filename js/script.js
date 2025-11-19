document.addEventListener("DOMContentLoaded", function () {
  // Carrossel Hero
  let currentSlide = 0;
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".carousel-controls .carousel-dot");
  let isTransitioning = false;

  function showSlide(n) {
    if (isTransitioning) return;
    isTransitioning = true;

    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

    setTimeout(() => (isTransitioning = false), 1000);
  }

  window.goToSlide = function (n) {
    showSlide(n);
  };

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  setInterval(nextSlide, 20000);

  // Carrossel Depoimentos
  let currentDepoimento = 0;
  const depoimentos = document.querySelectorAll(".depoimento-slide");
  const depoimentoDots = document.querySelectorAll(
    "#depoimentos .carousel-dot"
  );

  function showDepoimento(n) {
    depoimentos.forEach((dep) => dep.classList.remove("active"));
    depoimentoDots.forEach((dot) => dot.classList.remove("active"));

    currentDepoimento = (n + depoimentos.length) % depoimentos.length;
    depoimentos[currentDepoimento].classList.add("active");
    depoimentoDots[currentDepoimento].classList.add("active");
  }

  window.goToDepoimento = function (n) {
    showDepoimento(n);
  };

  function nextDepoimento() {
    showDepoimento(currentDepoimento + 1);
  }

  setInterval(nextDepoimento, 17000);

  // Toggle Serviços
  window.toggleServico = function (element) {
    const wasActive = element.classList.contains("active");
    document.querySelectorAll(".servico-card").forEach((card) => {
      card.classList.remove("active");
    });
    if (!wasActive) {
      element.classList.add("active");
    }
  };

  // Toggle FAQ
  window.toggleFaq = function (element) {
    const p = element.querySelector("p");
    const icon = element.querySelector("i");

    if (p.style.display === "none" || p.style.display === "") {
      p.style.display = "block";
      icon.style.transform = "rotate(180deg)";
    } else {
      p.style.display = "none";
      icon.style.transform = "rotate(0deg)";
    }
  };

  // Modais
  window.openModal = function () {
    document.getElementById("modalDoacao").classList.add("active");
  };

  window.closeModal = function () {
    document.getElementById("modalDoacao").classList.remove("active");
  };

  // Fechar modal ao clicar fora
  window.onclick = function (event) {
    const modalDoacao = document.getElementById("modalDoacao");
    if (event.target === modalDoacao) {
      closeModal();
    }
  };

  // Formulários
  window.handleSubmit = function (event) {
    event.preventDefault();
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    event.target.reset();
  };

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

  // Header scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    }
  });

  // Menu Mobile
  const mobileMenuButton = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuButton && navLinks) {
    // Quando clicar no botão do menu mobile
    mobileMenuButton.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-active");
    });

    // Fechar o menu mobile ao clicar em um link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("mobile-active")) {
          navLinks.classList.remove("mobile-active");
        }
      });
    });
  }

  // ========== DARK MODE ==========
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Verificar preferência salva no localStorage
  const darkModePreference = localStorage.getItem("darkMode");

  if (darkModePreference === "enabled") {
    document.body.classList.add("dark-mode");
  }

  // Toggle ao clicar no botão
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      // Salvar preferência no localStorage
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
      } else {
        localStorage.setItem("darkMode", "disabled");
      }
    });
  }
});
