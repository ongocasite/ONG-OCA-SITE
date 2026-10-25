/* ==========================================================
   ABERTURA – ONG OCA  (GSAP 3)
   Sequência: folhas entram → O cai → C aparece → a oca "sobe"
   → nome da ONG → frase → saída em círculo revelando o site
   ========================================================== */
(function () {
  "use strict";

  /* ---------- CONFIGURAÇÃO ---------- */
  var SO_UMA_VEZ_POR_SESSAO = true; // false = aparece em todo carregamento
  var CHAVE = "ocaAberturaVista";
  var MOMENTO_DA_SAIDA = 4.6; // segundos até começar a sair

  var html = document.documentElement;
  var ab = document.getElementById("abertura");
  if (!ab) return;

  var concluida = false;

  function fim() {
    if (concluida) return;
    concluida = true;
    try {
      if (SO_UMA_VEZ_POR_SESSAO) sessionStorage.setItem(CHAVE, "1");
    } catch (e) {}
    html.classList.remove("ab-ativa");
    if (ab.parentNode) ab.parentNode.removeChild(ab);
    window.scrollTo(0, 0);
    document.dispatchEvent(new CustomEvent("aberturaConcluida"));
  }

  /* sem GSAP (ex.: CDN fora do ar): não trava o site */
  if (!window.gsap) {
    fim();
    return;
  }

  /* visita repetida na mesma sessão */
  try {
    if (SO_UMA_VEZ_POR_SESSAO && sessionStorage.getItem(CHAVE)) {
      fim();
      return;
    }
  } catch (e) {}

  html.classList.add("ab-ativa");

  var reduzMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- frase: separa em palavras ---------- */
  var frase = ab.querySelector(".ab-frase");
  var palavras = frase.textContent.trim().split(/\s+/);
  frase.textContent = "";
  palavras.forEach(function (p, i) {
    var s = document.createElement("span");
    s.textContent = p + (i < palavras.length - 1 ? " " : "");
    frase.appendChild(s);
  });

  /* ---------- movimento reduzido: logo parado e saída suave ---------- */
  if (reduzMovimento) {
    ab.classList.add("ab-reduz");
    gsap.to(ab, { opacity: 0, duration: 0.4, delay: 1.2, onComplete: fim });
    return;
  }

  /* ---------- saída: círculo verde e depois creme fecham no centro ---------- */
  var saindo = false;
  function saida() {
    if (saindo) return;
    saindo = true;
    var creme = ab.querySelector(".ab-creme");
    var verde = ab.querySelector(".ab-verde");
    var abre = "circle(75% at 50% 50%)";
    var fecha = "circle(0% at 50% 50%)";
    gsap.set([creme, verde], { clipPath: abre });
    gsap
      .timeline({ onComplete: fim })
      .to(creme, { clipPath: fecha, duration: 1, ease: "power3.inOut" })
      .to(
        verde,
        { clipPath: fecha, duration: 0.9, ease: "power3.inOut" },
        "-=0.8"
      );
  }

  /* ---------- sequência principal ---------- */
  var tl;

  function montar() {
    if (concluida || saindo) return; // já foi pulada
    var folhas = ab.querySelectorAll(".ab-folha");
    var estrelas = ab.querySelectorAll(".ab-estrela");
    var palavrasEl = frase.querySelectorAll("span");
    var w = window.innerWidth;
    var h = window.innerHeight;

    gsap.set(frase, { opacity: 1 });
    gsap.set(palavrasEl, { opacity: 0, y: 22 });

    tl = gsap.timeline();

    /* folhas: entram vindas dos cantos e depois balançam */
    folhas.forEach(function (f, i) {
      var rot = parseFloat(f.getAttribute("data-rot")) || 0;
      var r = f.getBoundingClientRect();
      var dx = r.left + r.width / 2 < w / 2 ? -1 : 1;
      var dy = r.top + r.height / 2 < h / 2 ? -1 : 1;
      tl.fromTo(
        f,
        { opacity: 0, x: dx * 140, y: dy * 140, rotation: rot - 50, scale: 0.5 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: rot,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          onComplete: function () {
            gsap.to(f, {
              rotation: rot + (i % 2 ? 6 : -6),
              y: i % 2 ? 8 : -8,
              duration: 2 + (i % 3) * 0.4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          },
        },
        i * 0.09
      );
    });

    /* barra de progresso acompanha a sequência */
    tl.to(
      ".ab-barra span",
      { scaleX: 1, duration: MOMENTO_DA_SAIDA, ease: "none" },
      0
    );

    /* botão pular */
    tl.to(".ab-pular", { opacity: 1, duration: 0.5 }, 0.8);

    /* O: cai e quica como uma semente */
    tl.fromTo(
      ".ab-o",
      { opacity: 1, scale: 0, y: -90 },
      { scale: 1, y: 0, duration: 1.1, ease: "elastic.out(1, 0.5)" },
      0.5
    );

    /* C: varre da esquerda para a direita */
    tl.fromTo(
      ".ab-c",
      { opacity: 1, clipPath: "inset(0% 65% 0% 0%)", x: -24 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        x: 0,
        duration: 0.9,
        ease: "power3.out",
      },
      1.0
    );

    /* A (a oca): sobe de baixo para cima, como se fosse montada */
    tl.fromTo(
      ".ab-a",
      { opacity: 1, clipPath: "inset(82% 0% 0% 0%)", y: 14 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        duration: 1.3,
        ease: "power2.inOut",
      },
      1.5
    );

    /* nome da ONG */
    tl.fromTo(
      ".ab-texto",
      { opacity: 1, clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: "power2.inOut",
      },
      2.6
    );

    /* estrelas surgem quando a oca fecha */
    tl.fromTo(
      estrelas,
      { opacity: 0, scale: 0, rotation: -90 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.7,
        ease: "back.out(2.4)",
        stagger: 0.12,
        onComplete: function () {
          gsap.to(estrelas, {
            scale: 0.7,
            opacity: 0.6,
            duration: 0.9,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.25,
          });
        },
      },
      2.8
    );

    /* frase palavra por palavra */
    tl.to(
      palavrasEl,
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.07 },
      3.3
    );

    /* saída */
    tl.call(saida, null, MOMENTO_DA_SAIDA);
  }

  /* espera logotipo e fonte (com limite) antes de começar */
  function carregou(img) {
    return img.decode
      ? img.decode().catch(function () {})
      : Promise.resolve();
  }

  var imagens = Array.prototype.slice.call(ab.querySelectorAll(".ab-logo img"));
  var limite = new Promise(function (ok) {
    setTimeout(ok, 2500);
  });
  var fontes = document.fonts ? document.fonts.ready : Promise.resolve();

  Promise.race([Promise.all(imagens.map(carregou).concat([fontes])), limite])
    .then(montar)
    .catch(fim);

  /* ---------- pular ---------- */
  function pular() {
    if (tl) tl.kill();
    gsap.killTweensOf(ab.querySelectorAll("*"));
    saida();
  }

  ab.querySelector(".ab-pular").addEventListener("click", pular);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !concluida) pular();
  });
})();
