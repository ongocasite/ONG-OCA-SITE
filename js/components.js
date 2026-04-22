async function loadComponent(id, file) {
  const res = await fetch(`components/${file}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function loadAll() {
  await loadComponent("header", "header.html");
  await loadComponent("hero", "hero.html");
  await loadComponent("sobre", "sobre.html");
  await loadComponent("resultados", "resultados.html");
  await loadComponent("servicos", "servicos.html");
  await loadComponent("ajudar", "ajudar.html");
  await loadComponent("depoimentos", "depoimentos.html");
  await loadComponent("parceiros", "parceiros.html");
  await loadComponent("transparencia", "transparencia.html");
  await loadComponent("blog", "blog.html");
  await loadComponent("faq", "faq.html");
  await loadComponent("contato", "contato.html");
  await loadComponent("footer", "footer.html");
  await loadComponent("modals", "modals.html");
  await loadComponent("extras", "extras.html");

  // 👇 AGORA sim roda o JS
  if (typeof initSite === "function") {
    initSite();
  }
}

loadAll();