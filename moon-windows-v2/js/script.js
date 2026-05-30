
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        // Cambia 40 por la altura exacta en píxeles de tu topbar
        if (window.scrollY > 40) {
            header.classList.add('scroll-active');
        } else {
            header.classList.remove('scroll-active');
        }
    });

    
    
// Lista con los títulos que se van a ir alternando
    const heroTitles = {
        en: [
            "Professional Window Cleaning",
            "Commercial & Residential Services",
            "Licensed & Insured Professionals",
            "Best Quality"
        ],
        es: [
            "Limpieza Profesional de Ventanas",
            "Servicios Residenciales y Comerciales",
            "Profesionales Licenciados y Asegurados",
            "La Mejor Calidad"
        ]
    };

    let indiceActual = 0;
    const elementoTitulo = document.getElementById('hero-title');
    const tiempoCambio = 4000;

    // Aseguramos que el título inicial tenga la clase base al arrancar
    elementoTitulo.classList.add('animate__animated', 'animate__fadeInUp');


    const currentLang =
            localStorage.getItem('language') ||
            (navigator.language.startsWith('es') ? 'es' : 'en');

        const titles = heroTitles[currentLang];


    setInterval(() => {
        // 1. Quitamos la animación de entrada y agregamos la de salida
        elementoTitulo.classList.remove('animate__fadeInUp');
        elementoTitulo.classList.add('animate__fadeOutDown');

        // 2. Escuchamos el final de la animación de salida
        elementoTitulo.addEventListener('animationend', function cambiarTexto(e) {
            // Filtramos para actuar únicamente sobre el fadeOut
            if (e.animationName.includes('fadeOut')) {

                // Avanzamos en el array de textos
                indiceActual = (indiceActual + 1) % titles.length;
                elementoTitulo.textContent = titles[indiceActual];

                // 3. Quitamos la salida y activamos la entrada
                elementoTitulo.classList.remove('animate__fadeOutDown');
                elementoTitulo.classList.add('animate__fadeInUp');

                // Limpiamos el listener para evitar duplicados en memoria
                elementoTitulo.removeEventListener('animationend', cambiarTexto);
            }
        });

    }, tiempoCambio);


//Modal ///  

// Base de datos de información detallada por servicio
    const infoServicios = {
        "residential-commercial": {
            title: "Residential & Commercial Window Cleaning",
            desc: "Top-tier window cleaning tailored for both cozy homes and commercial buildings. We ensure a spotless, streak-free shine using specialized tools and eco-friendly formulas.",
            icon: "assets/icons/ventana.png"
        },
        "interior-exterior": {
            title: "Interior & Exterior Window Cleaning",
            desc: "A thorough, dual-action cleaning process. We carefully clean the inside of your windows without messing up your home, and wash the outside to remove tough environmental buildup.",
            icon: "assets/icons/ventana2.png"
        },
        "screens-cleaning": {
            title: "Screens Cleaning",
            desc: "Don't let dirty screens ruin a fresh view. We remove, deep-clean, and rinse your window screens/mosquiteros to eliminate accumulated dust, pollen, and spiderwebs.",
            icon: "assets/icons/red.png"
        },
        "tracks-sills": {
            title: "Tracks, Sills & Frames Cleaning",
            desc: "Windows aren't truly clean if the frames are dirty. We vacuum and scrub window tracks, sills, and frames to remove deep grime, mold, and bugs, ensuring smooth sliding operations.",
            icon: "assets/icons/marco.png"
        },
        "storm-windows": {
            title: "Storm Windows Cleaning",
            desc: "Specialized maintenance for heavy-duty storm windows. We carefully disassemble, clean every layer of glass individually, and reinstall them perfectly to keep your property protected.",
            icon: "assets/icons/storm.png"
        },
        "gutter-cleaning": {
            title: "Gutter Cleaning",
            desc: "Prevent severe water damage to your roof and foundation. We clear out all leaves, debris, and muck from your gutters and downspouts, ensuring optimal rain drainage.",
            icon: "assets/icons/gutter.png"
        },
        "roof-washing": {
            title: "Roof Washing",
            desc: "Safely eliminate dark stains, moss, and algae from your roof. Our specialized soft-wash treatment sanitizes your shingles, extending your roof's lifespan and restoring curb appeal.",
            icon: "assets/icons/roof.png"
        },
        "pressure-washing": {
            title: "Pressure Washing",
            desc: "Our high-pressure washing system effectively blasting away deep grease, mold, heavy dirt, and surface stains from hard surfaces like driveways, brick walls, and concrete patios.",
            icon: "assets/icons/lavadora-a-presion.png"
        },
        "soft-washing": {
            title: "Soft Washing",
            desc: "A safe, low-pressure alternative to heavy pressure washing. Perfect for delicate exterior siding, stucco, and wood, using biodegradable solutions to destroy organic growth without damage.",
            icon: "assets/icons/soft-washing.png"
        },
        "sliding-doors": {
            title: "Sliding Doors & Glass Cleaning",
            desc: "Get crystal-clear views on your heavy-traffic areas. We deeply clean large sliding doors, glass entries, and tracks, eliminating smudges, handprints, and pet smears completely.",
            icon: "assets/icons/sliding-door.png"
        },
        "dirt-stains": {
            title: "Dirt, Stains & Mineral Removal",
            desc: "Hard water spots and stubborn mineral scaling can permanently etch glass. We use advanced, non-abrasive restoring compounds to erase tough acid rain spots and calcium stains.",
            icon: "assets/icons/suciedad.png"
        },
        "gutter-cover": {
            title: "Gutter Cover Installation",
            desc: "Tired of cleaning gutters every season? We install high-quality gutter guards that block leaves, twigs, and debris while allowing rainwater to flow freely, reducing maintenance forever.",
            icon: "assets/icons/gutter-cover.png"
        }
    };

    const cards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('service-modal');
    const modalContent = modal.querySelector('.modal-content');
    const closeModal = document.querySelector('.modal-close');

    const mTitle = document.getElementById('modal-title');
    const mDesc = document.getElementById('modal-desc');
    const mIcon = document.getElementById('modal-icon');

    // Al dar clic en una tarjeta
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.getAttribute('data-service');
            const info = infoServicios[serviceKey];

            if (info) {
                mTitle.textContent = info.title;
                mDesc.textContent = info.desc;
                mIcon.src = info.icon;

                modal.classList.add('active');
                // Re-ejecutamos la animación de entrada de animate.css
                modalContent.classList.add('animate__zoomIn');
            }
        });
    });

    // Cerrar al dar clic en la X
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Cerrar al dar clic en el fondo oscuro externo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Al hacer click en el botón del modal "Book This Service", se cierra automáticamente
    document.querySelector('.modal-cta').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Cerrar el modal al presionar la tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });

    // ========================================================
    // LÓGICA PARA "BOOK THIS SERVICE" DESDE EL MODAL
    // ========================================================
    const modalCta = document.querySelector('.modal-cta');

    if (modalCta) {
        modalCta.addEventListener('click', function (e) {
            
            const modalTitleElement = document.querySelector('.modal h3') || document.querySelector('.modal-content h3');

            if (modalTitleElement) {
                const selectedService = modalTitleElement.textContent.trim();

                // 2. Buscamos el select de tu formulario y le asignamos el servicio mapeado
                const serviceSelect = document.getElementById('service');
                if (serviceSelect) {
                    serviceSelect.value = selectedService;
                }
            }

            // 3. Cerramos el modal quitando tu clase 'active' para que se vea el desplazamiento suave
            const modal = document.getElementById('service-modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    }


    
// --- Lógica del Menú Móvil ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('nav-links');

    // Abrir/Cerrar menú al tocar la hamburguesa
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');

        // Cambiar el ícono de hamburguesa a una 'X'
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar el menú automáticamente al tocar un enlace
    const navItems = navLinksContainer.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });




    // ==========================================
    // LAZY LOADING PARA VIDEOS (Optimización de carga)
    // ==========================================
    document.addEventListener("DOMContentLoaded", function () {
        // Seleccionamos todos los videos con la clase lazy-video
        const lazyVideos = document.querySelectorAll("video.lazy-video");

        // Verificamos que el navegador soporte IntersectionObserver (el 99% lo hace)
        if ("IntersectionObserver" in window) {
            const videoObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (videoEntry) {
                    // Si el video entra en la pantalla del usuario
                    if (videoEntry.isIntersecting) {
                        const video = videoEntry.target;
                        const source = video.querySelector("source");

                        // Pasamos la ruta del data-src al src real para iniciar la descarga
                        if (source && source.dataset.src) {
                            source.src = source.dataset.src;
                            video.load(); // Carga el video
                            video.play(); // Lo reproduce automáticamente
                        }

                        // Dejamos de observar este video para ahorrar memoria
                        videoObserver.unobserve(video);
                    }
                });
            });

            // Le decimos al radar que vigile cada uno de nuestros videos
            lazyVideos.forEach(function (video) {
                videoObserver.observe(video);
            });
        }
    });


    // Diccionario de idiomas
        const translations = {
                en: {
                    hero_title: "Professional Window Cleaning",
                    hero_subtitle: "In Maryland, Virginia & DC",

                    nav_home: "Home",
                    nav_about: "Why Choose Us",
                    nav_services: "Services",
                    nav_area: "Service Area",
                    nav_work: "Our Work",
                    nav_testimonials: "Testimonials",
                    nav_contact: "Contact",

                    btn_quote: "GET A QUOTE",

                    why_title: "Why Choose Moon Window Cleaning Services?",

                    benefit1_title: "Licensed, Insured & Family-Owned",
                    benefit1_desc: "Your property is in safe hands. We are fully insured and licensed for your peace of mind.",

                    benefit2_title: "Results & Value Guaranteed",
                    benefit2_desc: "We don't leave until you're 100% happy. Quality and attention to detail are at the heart of our service.",

                    benefit3_title: "Premium Eco-Friendly Tech",
                    benefit3_desc: "We use top-tier equipment and eco-friendly products for a streak-free, professional shine every time.",

                    services_title: "Our Services",

                    service_area_title: "Our Service Area",
                    service_area_desc: "Serving the Heart of Maryland & Surrounding Areas.",

                    gallery_title: "Our Work",
                    gallery_desc: "Real results for homes and businesses in Maryland, Virginia & DC.",

                    testimonials_title: "Client Love",
                    quote_title: "Get My Free Quote",

                    placeholder_name: "Name",
                    placeholder_email: "Email",
                    placeholder_phone: "Phone Number",
                    placeholder_message: "Message / Details",

                    select_service: "Select a Service",

                    btn_submit: "GET MY FREE QUOTE",

                    modal_book: "Book This Service",
                    modal_default_desc: "Detailed information about the service goes here.",

                    footer_text: "© 2026 Moon Window Cleaning Services LLC. All rights reserved."
                },

                es: {
                    hero_title: "Limpieza Profesional de Ventanas",
                    hero_subtitle: "En Maryland, Virginia y DC",

                    nav_home: "Inicio",
                    nav_about: "¿Por Qué Elegirnos?",
                    nav_services: "Servicios",
                    nav_area: "Área de Servicio",
                    nav_work: "Nuestro Trabajo",
                    nav_testimonials: "Testimonios",
                    nav_contact: "Contacto",

                    btn_quote: "SOLICITAR COTIZACIÓN",

                    why_title: "¿Por Qué Elegir Moon Window Cleaning Services?",

                    benefit1_title: "Licenciados, Asegurados y Empresa Familiar",
                    benefit1_desc: "Su propiedad está en buenas manos. Estamos totalmente asegurados y licenciados para su tranquilidad.",

                    benefit2_title: "Resultados y Calidad Garantizados",
                    benefit2_desc: "No nos retiramos hasta que usted esté 100% satisfecho. La calidad y la atención al detalle son el corazón de nuestro servicio.",

                    benefit3_title: "Tecnología Premium y Ecológica",
                    benefit3_desc: "Utilizamos equipos de primera calidad y productos ecológicos para lograr un brillo profesional sin marcas.",

                    services_title: "Nuestros Servicios",

                    service_area_title: "Nuestra Área de Servicio",
                    service_area_desc: "Sirviendo el corazón de Maryland y áreas cercanas.",

                    gallery_title: "Nuestro Trabajo",
                    gallery_desc: "Resultados reales para hogares y negocios en Maryland, Virginia y DC.",

                    testimonials_title: "Lo Que Dicen Nuestros Clientes",
                    quote_title: "Solicite su Cotización Gratis",

                    placeholder_name: "Nombre",
                    placeholder_email: "Correo Electrónico",
                    placeholder_phone: "Número de Teléfono",
                    placeholder_message: "Mensaje / Detalles",

                    select_service: "Seleccione un Servicio",

                    btn_submit: "SOLICITAR COTIZACIÓN GRATIS",

                    modal_book: "Reservar Este Servicio",
                    modal_default_desc: "Información detallada sobre este servicio.",

                    footer_text: "© 2026 Moon Window Cleaning Services LLC. Todos los derechos reservados."
                }
            };


        /* function manageLanguage() {
    // 1. Detectar el idioma del navegador o sistema (ej. "es-ES", "en-US")
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 2. Si el idioma empieza por "es", usamos español. Si no, por defecto inglés.
    const lang = browserLang.startsWith('es') ? 'es' : 'en';
    
    // 3. Cambiar el atributo 'lang' del HTML por buenas prácticas de SEO
    document.documentElement.lang = lang;

    // 4. Buscar todos los elementos que tengan el atributo data-i18n
    const elementsToTranslate = document.querySelectorAll('[data-i18n]'); */

    function changeLanguage(lang) {
            localStorage.setItem('language', lang);
            location.reload();
        }

        function manageLanguage() {

            let lang = localStorage.getItem('language');

            if (!lang) {
                const browserLang = navigator.language || navigator.userLanguage;
                lang = browserLang.startsWith('es') ? 'es' : 'en';
            }

            document.documentElement.lang = lang;

            const elementsToTranslate = document.querySelectorAll('[data-i18n]');

            elementsToTranslate.forEach(element => {
                const key = element.getAttribute('data-i18n');

                if (translations[lang] && translations[lang][key]) {

                    const translationText = translations[lang][key];

                    if (
                        element.tagName === 'INPUT' ||
                        element.tagName === 'TEXTAREA'
                    ) {
                        element.placeholder = translationText;
                    } else {
                        element.textContent = translationText;
                    }
                }
            });
        }
// Ejecutar la función automáticamente cuando la página cargue
document.addEventListener('DOMContentLoaded', manageLanguage);

