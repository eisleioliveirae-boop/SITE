(function() {
    emailjs.init("rbNmUP_uVXlHnf3Ko");
})();

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const statusMessage = document.getElementById('status-message');
        
        statusMessage.textContent = "Enviando...";
        statusMessage.style.color = "#232342";

        emailjs.sendForm('service_ju5k04n', 'template_9qmusmm', this)
            .then(function() {
                statusMessage.textContent = "Mensagem enviada com sucesso!";
                statusMessage.style.color = "#25D366";
                document.getElementById('contact-form').reset();
            }, function(error) {
                statusMessage.textContent = "Erro ao enviar a mensagem. Tente novamente.";
                statusMessage.style.color = "red";
                console.log('FAILED...', error);
            });
    });
}
