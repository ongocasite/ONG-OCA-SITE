/* ==========================================================
   ÚLTIMAS NOTÍCIAS – modal com os 6 últimos posts do Instagram
   Fonte dos posts: arquivo local data/noticias.json (modo manual,
   sem conta em serviço externo). Também aceita uma URL de feed
   JSON (ex.: Behold) se um dia quiserem automatizar.
   O card "Últimas Notícias" da seção #blog (inclusive o link
   "Acessar Blog") abre o modal automaticamente; para ligar outro
   botão use:  data-abrir-noticias  ou  onclick="openNoticias()"
   ========================================================== */
(function () {
  "use strict";

  /* ---------- CONFIGURAÇÃO ---------- */
  var CONFIG = {
    FEED_URL: "data/noticias.json", // arquivo local (manual) ou URL https de um feed JSON
    PERFIL_URL: "https://www.instagram.com/ong.oca/",
    PERFIL_NOME: "@ong.oca",
    QUANTIDADE: 6,
    CACHE_MINUTOS: 30, // só vale para feeds remotos (http/https)
    LOGO_RESERVA: "assets/img/logotipos/logotipo - ong oca/logotipo.webp", // se a foto não carregar
    CHAVE_CACHE: "ocaNoticiasCache",
    TIMEOUT_MS: 10000,
  };

  var modal = null;
  var grid = null;
  var carregado = false;
  var carregando = false;
  var ultimoFoco = null;

  /* ---------- utilitários ---------- */
  function el(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto != null) e.textContent = texto;
    return e;
  }

  // link do post: só https
  function urlSegura(u) {
    return typeof u === "string" && /^https:\/\//i.test(u);
  }

  // imagem: https ou caminho relativo do próprio site (sem "javascript:", "data:" etc.)
  function imagemSegura(u) {
    if (typeof u !== "string" || !u.trim()) return false;
    if (/^https:\/\//i.test(u)) return true;
    return !/^[a-z][a-z0-9+.-]*:/i.test(u) && u.indexOf("//") !== 0;
  }

  function remoto() {
    return /^https?:\/\//i.test(CONFIG.FEED_URL);
  }

  // aceita os nomes em português do arquivo manual e os do Behold
  function normalizar(p) {
    if (!p) return null;
    var tipo = String(p.mediaType || p.tipo || "").toLowerCase();
    var mt = "IMAGE";
    if (tipo === "video" || tipo === "reel") mt = "VIDEO";
    else if (tipo === "album" || tipo === "carrossel" || tipo === "carousel_album") mt = "CAROUSEL_ALBUM";
    return {
      permalink: p.permalink || p.link,
      timestamp: p.timestamp || p.data,
      caption: p.caption || p.legenda || "",
      prunedCaption: p.prunedCaption,
      mediaType: mt,
      imagem: p.imagem,
      sizes: p.sizes,
      mediaUrl: p.mediaUrl,
      thumbnailUrl: p.thumbnailUrl,
    };
  }

  function resumir(texto, max) {
    texto = (texto || "").replace(/\s+/g, " ").trim();
    if (texto.length <= max) return texto;
    return texto.slice(0, max).replace(/\s+\S*$/, "") + "…";
  }

  function formatarData(iso) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) iso += "T12:00:00"; // evita voltar 1 dia pelo fuso
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  /* ---------- modal (criado pelo JS, não precisa mexer no modals.html) ---------- */
  function criarModal() {
    if (document.getElementById("modalNoticias")) {
      modal = document.getElementById("modalNoticias");
    } else {
      modal = el("div", "modal modal-noticias");
      modal.id = "modalNoticias";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "noticiasTitulo");
      modal.innerHTML =
        '<div class="modal-content modal-content-largo">' +
        '<button type="button" class="modal-close" aria-label="Fechar">&times;</button>' +
        '<h2 id="noticiasTitulo">Últimas Notícias</h2>' +
        '<p class="noticias-sub">Os ' + CONFIG.QUANTIDADE + " posts mais recentes do nosso Instagram</p>" +
        '<div class="noticias-grid" aria-live="polite"></div>' +
        '<div class="noticias-rodape">' +
        '<a class="btn-primary" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i>Seguir ' +
        CONFIG.PERFIL_NOME +
        "</a></div></div>";
      modal.querySelector(".noticias-rodape a").href = CONFIG.PERFIL_URL;
      document.body.appendChild(modal);
    }

    grid = modal.querySelector(".noticias-grid");

    modal.querySelector(".modal-close").addEventListener("click", closeNoticias);

    // clicar fora do conteúdo fecha
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeNoticias();
    });

    // Esc fecha; Tab fica preso dentro do modal
    document.addEventListener("keydown", function (e) {
      if (!modal.classList.contains("active")) return;
      if (e.key === "Escape") {
        closeNoticias();
        return;
      }
      if (e.key === "Tab") {
        var focaveis = modal.querySelectorAll("a[href], button:not([disabled])");
        if (!focaveis.length) return;
        var primeiro = focaveis[0];
        var ultimo = focaveis[focaveis.length - 1];
        if (e.shiftKey && document.activeElement === primeiro) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primeiro.focus();
        }
      }
    });
  }

  /* ---------- estados da grade ---------- */
  function mostrarEsqueleto() {
    grid.textContent = "";
    for (var i = 0; i < CONFIG.QUANTIDADE; i++) {
      var s = el("div", "noticia-esqueleto");
      s.setAttribute("aria-hidden", "true");
      grid.appendChild(s);
    }
  }

  function mostrarMensagem(texto, comRetentativa) {
    grid.textContent = "";
    var box = el("div", "noticias-status");
    box.appendChild(el("p", null, texto));
    if (comRetentativa) {
      var b = el("button", "btn-primary", "Tentar novamente");
      b.type = "button";
      b.addEventListener("click", carregar);
      box.appendChild(b);
    }
    grid.appendChild(box);
  }

  function criarCard(post) {
    var a = el("a", "noticia-card");
    a.href = post.permalink;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    // imagem
    var figura = el("div", "noticia-img");
    var img = el("img");
    var tipo = post.mediaType;
    var origem =
      post.imagem ||
      (post.sizes && post.sizes.medium && post.sizes.medium.mediaUrl) ||
      (tipo === "VIDEO" ? post.thumbnailUrl : post.mediaUrl) ||
      post.thumbnailUrl;
    // se não houver foto ou ela não carregar, mostra o logotipo da OCA no lugar
    function usarReserva() {
      figura.classList.add("sem-foto");
      img.onerror = null;
      img.src = CONFIG.LOGO_RESERVA;
    }
    img.onerror = usarReserva;
    if (imagemSegura(origem)) img.src = origem;
    else usarReserva();
    img.loading = "lazy";
    img.alt = post.caption
      ? ""
      : "Publicação do Instagram da ONG OCA";
    figura.appendChild(img);

    if (tipo === "VIDEO") figura.appendChild(el("span", "noticia-tipo", "Vídeo"));
    else if (tipo === "CAROUSEL_ALBUM") figura.appendChild(el("span", "noticia-tipo", "Álbum"));
    a.appendChild(figura);

    // texto
    var corpo = el("div", "noticia-corpo");
    var data = el("span", "noticia-data");
    var icone = el("i", "fas fa-calendar-alt");
    icone.setAttribute("aria-hidden", "true");
    data.appendChild(icone);
    data.appendChild(document.createTextNode(formatarData(post.timestamp)));
    corpo.appendChild(data);

    var legenda = resumir(post.prunedCaption || post.caption, 140);
    if (legenda) corpo.appendChild(el("p", "noticia-texto", legenda));

    var link = el("span", "noticia-link");
    var ig = el("i", "fab fa-instagram");
    ig.setAttribute("aria-hidden", "true");
    link.appendChild(ig);
    link.appendChild(document.createTextNode("Ver no Instagram"));
    corpo.appendChild(link);

    a.appendChild(corpo);
    return a;
  }

  function mostrarPosts(posts) {
    grid.textContent = "";
    var validos = posts.map(normalizar).filter(function (p) {
      return p && urlSegura(p.permalink);
    });
    if (!validos.length) {
      mostrarMensagem("Ainda não há publicações para mostrar aqui.", false);
      return;
    }
    validos.slice(0, CONFIG.QUANTIDADE).forEach(function (p) {
      grid.appendChild(criarCard(p));
    });
  }

  /* ---------- cache (sessionStorage) ---------- */
  function lerCache() {
    try {
      var bruto = sessionStorage.getItem(CONFIG.CHAVE_CACHE);
      if (!bruto) return null;
      var c = JSON.parse(bruto);
      if (Date.now() - c.quando > CONFIG.CACHE_MINUTOS * 60000) return null;
      return c.posts;
    } catch (e) {
      return null;
    }
  }

  function gravarCache(posts) {
    try {
      sessionStorage.setItem(
        CONFIG.CHAVE_CACHE,
        JSON.stringify({ quando: Date.now(), posts: posts })
      );
    } catch (e) {}
  }

  /* ---------- busca do feed ---------- */
  function carregar() {
    if (carregando) return;

    if (CONFIG.FEED_URL.indexOf("COLE_O_ID") !== -1) {
      mostrarMensagem(
        "O feed do Instagram ainda não foi configurado. Enquanto isso, veja nossos posts direto no Instagram.",
        false
      );
      return;
    }

    var cache = remoto() ? lerCache() : null;
    if (cache) {
      mostrarPosts(cache);
      carregado = true;
      return;
    }

    carregando = true;
    mostrarEsqueleto();

    var controle = window.AbortController ? new AbortController() : null;
    var limite = setTimeout(function () {
      if (controle) controle.abort();
    }, CONFIG.TIMEOUT_MS);

    fetch(CONFIG.FEED_URL, controle ? { signal: controle.signal } : undefined)
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (dados) {
        var posts = Array.isArray(dados) ? dados : dados.posts;
        if (!Array.isArray(posts)) throw new Error("Formato inesperado");
        posts = posts.slice(0, CONFIG.QUANTIDADE);
        if (remoto()) gravarCache(posts);
        mostrarPosts(posts);
        carregado = true;
      })
      .catch(function () {
        mostrarMensagem(
          "Não conseguimos carregar as publicações agora. Você pode tentar de novo ou ver tudo direto no Instagram.",
          true
        );
      })
      .then(function () {
        clearTimeout(limite);
        carregando = false;
      });
  }

  /* ---------- liga sozinho o card "Últimas Notícias" da seção #blog ---------- */
  // texto sem acento e em minúsculas, para comparar
  function semAcento(t) {
    return (t || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // sobe a partir do que foi clicado até achar o card que tem "Últimas Notícias"
  // e ainda não inclui os outros cards (Próximos Eventos / Galeria de Fotos)
  function cardDeNoticias(inicio) {
    var no = inicio;
    var card = null;
    while (no && no !== document.body && no.nodeType === 1) {
      var t = semAcento(no.textContent);
      // chegou num bloco que já inclui os outros cards: o card de notícias ficou para trás
      if (t.indexOf("proximos eventos") !== -1 || t.indexOf("galeria de fotos") !== -1) break;
      if (t.indexOf("ultimas noticias") !== -1) card = no;
      no = no.parentElement;
    }
    return card;
  }

  // fase de captura: roda antes de qualquer outro clique do site (links, scroll suave etc.)
  document.addEventListener(
    "click",
    function (e) {
      var alvo = e.target;
      if (!alvo || !alvo.closest) return;
      var marcado = alvo.closest("[data-abrir-noticias]");
      var noBlog = alvo.closest("#blog") && cardDeNoticias(alvo);
      if (marcado || noBlog) {
        e.preventDefault();
        e.stopPropagation();
        window.openNoticias();
      }
    },
    true
  );

  /* ---------- abrir / fechar ---------- */
  window.openNoticias = function () {
    if (!modal) criarModal();
    ultimoFoco = document.activeElement;
    modal.classList.add("active");
    document.documentElement.classList.add("noticias-aberto");
    modal.querySelector(".modal-close").focus();
    if (!carregado) carregar();
  };

  window.closeNoticias = function () {
    if (!modal) return;
    modal.classList.remove("active");
    document.documentElement.classList.remove("noticias-aberto");
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  };
})();
