# 🤝 ONG OCA - Site Institucional

Este repositório contém o código-fonte do site institucional da **ONG OCA (Organização Cultural Alternativa)**.  

O projeto foi desenvolvido com foco em simplicidade, desempenho e fácil manutenção, utilizando apenas tecnologias nativas da web — **HTML**, **CSS** e **JavaScript** — reunidas em um único arquivo.

## 📂 Estrutura do Projeto

A estrutura foi organizada de forma direta, mantendo todos os recursos essenciais do site de maneira clara e objetiva:

```
ONG-OCA-SITE
├── 🗂️ assets
│   ├── 🗂️ fonts
│   │   ├── 📄 fa-brands-400.woff2
│   │   └── 📄 fa-solid-900.woff2
│   │
│   └── 🗂️ img
│       ├── 🗂️ banners
│       │   ├── 🗂️ desktop
│       │   └── 🗂️ mobile
│       │
│       ├── 🗂️ doacao
│       │
│       ├── 🗂️ logotipos
│       │   ├── 🗂️ logotipo-banco
│       │   ├── 🗂️ logotipo-ong-oca
│       │   └── 🗂️ logotipo-parceiros
│       │
│       └── 🗂️ natal
│
├── 🗂️ components
│   ├──	📄 ajudar.html
│   ├──	📄 blog.html
│   ├── 📄 contato.html
│   ├── 📄 depoimentos.html
│   ├──	📄 extras.html
│   ├──	📄 faq.html
│   ├──	📄 footer.html
│   ├──	📄 header.html
│   ├──	📄 hero.html
│   ├──	📄 modals.html
│   ├──	📄 parceiros.html
│   ├──	📄 resultados.html
│   ├──	📄 servicos.html
│   ├──	📄 sobre.html
│   └──	📄 transparencia.html
│
├── 🗂️ css
│   ├──	📄 base.css
│   ├──	📄 components.css
│   ├── 📄 fontawesome.css
│   ├── 📄 layout.css
│   ├──	📄 responsive.css
│   └──	📄 sections.css
│
├── 🗂️ js
│   ├── 📄 script.js
│   └──	📄 components.js
│
├── 📄 CNAME
├── 📄 index.html
└── 📄 README.md
```


## 🛠️ Tecnologias Utilizadas

## Para a **Camada de Aplicação**
- 📄 **HTML5** – Estruturação e semântica  
- 🖌️ **CSS3** – Estilos e layout  
- 🧠 **JavaScript Vanilla** – Funcionalidades dinâmicas
- 🎯 **Font Awesome** – Ícones

## Para a **Camada de Infraestrutura**
- 🌐 **RedeHost** – Domínio  
- 🌐 **CloudFlare** – DNS + Segurança  
- 🌐 **GitHub Pages** – Hospedagem 

## 🧩 Estrutura Interna do Código

O arquivo `index.html` está dividido em seções claramente identificadas por comentários, permitindo fácil navegação e manutenção do código:

- 📌 **Cabeçalho (Header)** logo e navegação  
- 📄 **Conteúdo principal:** apresentação, projetos, parceiros e informações institucionais  
- 💠 **Doações:** modal com PIX e bancos  
- 🧾 **Footer:** contatos e direitos autorais  

## 🚀 Hospedagem

O site é hospedado através do **GitHub Pages**, e pode ser acessado em:
https://www.ongoca.org/

O domínio é configurado via arquivo `CNAME` e redirecionado automaticamente para o repositório principal.

## 🔒 Segurança

Este projeto não armazena informações sensíveis no repositório.
Quaisquer integrações externas utilizam boas práticas de segurança e variáveis protegidas.
