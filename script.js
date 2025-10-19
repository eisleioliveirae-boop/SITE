// Inicializa o EmailJS
(function() {
    emailjs.init("rbNmUP_uVXlHnf3Ko");
})();

// Aguarda o carregamento da página
window.onload = function() {
    // Envio do formulário de contato
    const form = document.getElementById('contact-form');
    const statusMessage = document.getElementById('status-message');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            statusMessage.textContent = "Enviando...";
            statusMessage.style.color = "#232342";

            emailjs.sendForm('service_ju5k04n', 'template_9qmusmm', this)
                .then(function() {
                    statusMessage.textContent = "Mensagem enviada com sucesso!";
                    statusMessage.style.color = "#25D366";
                    form.reset();
                }, function(error) {
                    statusMessage.textContent = "Erro ao enviar a mensagem. Tente novamente.";
                    statusMessage.style.color = "red";
                    console.error('FAILED...', error);
                });
        });
    }

    // Controle do menu responsivo (hambúrguer)
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function () {
            menu.classList.toggle('active');
        });
    }
};
