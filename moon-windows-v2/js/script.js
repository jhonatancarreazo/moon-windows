 window.addEventListener('scroll', function () {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

    
        const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');

            // Abrir/Cerrar menú hamburguesa
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // NUEVA FUNCIÓN: Cerrar al hacer clic en un enlace
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });

        const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Añadimos las clases de animate.css al entrar
                        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    }
                });
            }, { threshold: 0.2 }); // Se activa cuando el 20% de la sección es visible

            // Seleccionamos todos los elementos que queremos animar
            document.querySelectorAll('.animar-al-scroll').forEach(section => {
                observer.observe(section);
            });