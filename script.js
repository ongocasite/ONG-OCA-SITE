// Carrossel Hero
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-controls .carousel-dot');

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function goToSlide(n) {
            showSlide(n);
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        setInterval(nextSlide, 5000);

        // Carrossel Depoimentos
        let currentDepoimento = 0;
        const depoimentos = document.querySelectorAll('.depoimento-slide');
        const depoimentoDots = document.querySelectorAll('#depoimentos .carousel-dot');

        function showDepoimento(n) {
            depoimentos.forEach(dep => dep.classList.remove('active'));
            depoimentoDots.forEach(dot => dot.classList.remove('active'));

            currentDepoimento = (n + depoimentos.length) % depoimentos.length;
            depoimentos[currentDepoimento].classList.add('active');
            depoimentoDots[currentDepoimento].classList.add('active');
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
            const wasActive = element.classList.contains('active');
            document.querySelectorAll('.servico-card').forEach(card => {
                card.classList.remove('active');
            });
            if (!wasActive) {
                element.classList.add('active');
            }
        }

        // Toggle FAQ
        function toggleFaq(element) {
            const p = element.querySelector('p');
            const icon = element.querySelector('i');

            if (p.style.display === 'none' || p.style.display === '') {
                p.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            } else {
                p.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
            }
        }

        // Modais
        function openModal() {
            document.getElementById('modalDoacao').classList.add('active');
        }

        function closeModal() {
            document.getElementById('modalDoacao').classList.remove('active');
        }

        function openVoluntarioModal() {
            document.getElementById('modalVoluntario').classList.add('active');
        }

        function closeVoluntarioModal() {
            document.getElementById('modalVoluntario').classList.remove('active');
        }

        // Fechar modal ao clicar fora
        window.onclick = function (event) {
            const modalDoacao = document.getElementById('modalDoacao');
            const modalVoluntario = document.getElementById('modalVoluntario');
            if (event.target === modalDoacao) {
                closeModal();
            }
            if (event.target === modalVoluntario) {
                closeVoluntarioModal();
            }
        }

        // Formulários
        function handleSubmit(event) {
            event.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            event.target.reset();
        }

        function handleVoluntarioSubmit(event) {
            event.preventDefault();
            alert('Inscrição enviada com sucesso! Em breve entraremos em contato.');
            closeVoluntarioModal();
            event.target.reset();
        }

        // Scroll suave ao clicar nos links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', function () {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });