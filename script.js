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
<script>
  (function(){
    const menu = document.querySelector('.menu');
    const toggle = document.querySelector('.menu-toggle');
    const menuList = document.querySelector('.menu-list');
    const header = document.querySelector('.header');

    if (!menu || !toggle || !menuList) return;

    function openMenu() {
      menu.classList.add('open');
      header.classList.add('menu-active');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      menu.classList.remove('open');
      header.classList.remove('menu-active');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function(e){
      if (menu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // fechar ao clicar fora do menu (UX)
    document.addEventListener('click', function(e){
      if (!menu.contains(e.target) && menu.classList.contains('open')) {
        closeMenu();
      }
    });

    // permitir fechar com ESC (acessibilidade)
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });
  })();
</script>
