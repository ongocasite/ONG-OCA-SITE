# ONG OCA - Site Institucional

Este repositório contém o código-fonte do site institucional da **ONG OCA (Organização Cultural Alternativa)**.  
O projeto foi desenvolvido com foco em simplicidade, desempenho e fácil manutenção, utilizando apenas tecnologias nativas da web — **HTML**, **CSS** e **JavaScript** — reunidas em um único arquivo.

## Estrutura do Projeto

A estrutura foi organizada de forma direta, mantendo todos os recursos essenciais do site de maneira clara e objetiva:

-  /
-  ├── img/                     # Diretório de imagens do site
- │   ├── doação/              # Imagens relacionadas à seção de doações
- │   ├── logotipo - banco/    # Logos dos bancos utilizados na área de doação
- │   ├── logotipo - ong oca/  # Logotipos institucionais da ONG
- │   └── logotipo - parceiros/# Logotipos de parceiros
- ├── CNAME                    # Arquivo de domínio personalizado (www.ongoca.org)
- ├── LICENSE.txt              # Licença do projeto
- ├── README.md                # Documentação técnica do projeto
- └── index.html               # Arquivo principal (HTML, CSS e JS integrados)



## Tecnologias Utilizadas

- **HTML5** para estruturação e marcação semântica  
- **CSS3** (embutido no HTML) para estilização e responsividade  
- **JavaScript Vanilla** (embutido no HTML) para interações e funcionalidades dinâmicas  
- **Font Awesome** para ícones  
- **GitHub Pages** como serviço de hospedagem estática  

## Estrutura Interna do Código

O arquivo `index.html` está dividido em seções claramente identificadas por comentários, permitindo fácil navegação e manutenção do código:

- **Cabeçalho (Header):** logo, navegação e menu responsivo  
- **Seções principais:** apresentação, projetos, parceiros e informações institucionais  
- **Modal de Doação:** implementado com JavaScript puro, contendo opções de PIX e transferência bancária  
- **Rodapé (Footer):** informações de contato e direitos autorais  

## Hospedagem

O site é hospedado através do **GitHub Pages**, e pode ser acessado em:
https://www.ongoca.org/

O domínio é configurado via arquivo `CNAME` e redirecionado automaticamente para o repositório principal.
