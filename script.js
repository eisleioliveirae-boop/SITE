/* script.js - combinação: emailjs init + formulário + menu toggle (3 pontinhos) */

(function() {
  // Inicializa EmailJS (mantive o ID que você tinha no script original)
  // Se desejar trocar o userID, altere a string abaixo
  if (typeof emailjs !== 'undefined') {
    try {
      emailjs.init("rbNmUP_uVXlHnf3Ko");
    } catch (e) {
      console.warn('emailjs init failed:', e);
    }
  }
})();

/* Função para controlar menu toggle (três pontinhos) */
document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.menu');
  const toggle = document.getElementById('menuToggle');
  const menuList = document.getElementById('site-menu');
  const header = document.querySelector('.header');

  // Segurança: se não existirem, abortar
  if (!menu || !toggle || !menuList) {
    // nada a fazer se não encontrar elementos
  } else {
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

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.classList.contains('open')) closeMenu();
      else openMenu();
    });

    // fechar ao clicar fora
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && menu.classList.contains('open')) {
        closeMenu();
      }
    });

    // fechar com ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* --------- Envio de formulário com EmailJS (reaproveitado e protegido) --------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm && typeof emailjs !== 'undefined') {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const statusMessage = document.getElementById('status-message');
      if (statusMessage) {
        statusMessage.textContent = "Enviando...";
        statusMessage.style.color = "#232342";
      }

      // Substitua 'service_ju5k04n' e 'template_9qmusmm' se seus IDs forem outros
      emailjs.sendForm('service_ju5k04n', 'template_9qmusmm', this)
        .then(function () {
          if (statusMessage) {
            statusMessage.textContent = "Mensagem enviada com sucesso!";
            statusMessage.style.color = "#25D366";
          }
          contactForm.reset();
        }, function (error) {
          if (statusMessage) {
            statusMessage.textContent = "Erro ao enviar a mensagem. Tente novamente.";
            statusMessage.style.color = "red";
          }
          console.error('EmailJS error:', error);
        });
    });
  } else {
    // Se form existe mas emailjs não está disponível, mostra mensagem de debug
    if (contactForm && typeof emailjs === 'undefined') {
      const statusMessage = document.getElementById('status-message');
      if (statusMessage) {
        statusMessage.textContent = "Serviço de envio indisponível no momento.";
        statusMessage.style.color = "red";
      }
    }
  }
});
