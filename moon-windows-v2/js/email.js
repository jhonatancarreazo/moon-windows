 (function () {
        emailjs.init({
            publicKey: "ssi_ZXUvbImnEaPLl",
        });
    })();


    // --- Captura Completa de Leads con EmailJS ---
    const quoteForm = document.querySelector('.quote-form');
    const btnSubmit = quoteForm ? quoteForm.querySelector('.btn-submit') : null;

    if (quoteForm && btnSubmit) {
        quoteForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita que la página se recargue

            // Feedback visual en tu botón actual
            const textoOriginal = btnSubmit.textContent;
            btnSubmit.textContent = 'SENDING...';
            btnSubmit.disabled = true;

            // Tus IDs de EmailJS
            const serviceID = 'service_9096evc';
            const templateID = 'template_kdpnjwo';

            // Enviamos todo el formulario completo
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btnSubmit.textContent = textoOriginal;
                    btnSubmit.disabled = false;

                    alert('Thank you! Your request has been sent successfully. We will contact you soon.');
                    quoteForm.reset(); // Limpia todos los campos nuevos y viejos
                }, (err) => {
                    btnSubmit.textContent = textoOriginal;
                    btnSubmit.disabled = false;

                    alert('Oops! Something went wrong. Please try again.');
                    console.error('EmailJS Error:', err);
                });
        });
    }