/* script.js - emailjs init + formulário + menu toggle (compatível com páginas do blog) */

(function () {
  if (typeof emailjs !== 'undefined' && emailjs && typeof emailjs.init === 'function') {
    try {
      emailjs.init("rbNmUP_uVXlHnf3Ko");
    } catch (e) {
      console.warn('emailjs init failed:', e);
    }
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const menu = document.querySelector('.menu');
  const toggle = document.getElementById('menuToggle');
  const menuList = document.getElementById('site-menu');

  /* ========= MENU ========= */
  if (header && menu && toggle && menuList) {
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

    // Fechar ao clicar fora
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && menu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Fechar com ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });

    // Fechar ao clicar em qualquer link do menu (melhor UX no mobile)
    menuList.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (link && menu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Evita "menu preso" ao sair do breakpoint mobile
    let lastIsMobile = window.innerWidth <= 768;
    window.addEventListener('resize', function () {
      const isMobile = window.innerWidth <= 768;
      // Se mudou de estado e agora não é mobile, garanta que o menu esteja fechado
      if (!isMobile && lastIsMobile && menu.classList.contains('open')) {
        closeMenu();
      }
      lastIsMobile = isMobile;
    });
  }

  /* ========= FORMULÁRIO (EmailJS) ========= */
  const contactForm = document.getElementById('contact-form');
  const statusMessage = document.getElementById('status-message');

  // Só configura o listener se houver formulário nesta página
  if (contactForm) {
    if (typeof emailjs !== 'undefined' && emailjs && typeof emailjs.sendForm === 'function') {
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (statusMessage) {
          statusMessage.textContent = "Enviando...";
          statusMessage.style.color = "#232342";
        }

        // Ajuste os IDs de service/template se necessário
        emailjs.sendForm('service_ju5k04n', 'template_9qmusmm', contactForm)
          .then(function () {
            if (statusMessage) {
              statusMessage.textContent = "Mensagem enviada com sucesso!";
              statusMessage.style.color = "#25D366";
            }
            contactForm.reset();
          })
          .catch(function (error) {
            if (statusMessage) {
              statusMessage.textContent = "Erro ao enviar a mensagem. Tente novamente.";
              statusMessage.style.color = "red";
            }
            console.error('EmailJS error:', error);
          });
      });
    } else {
      // Só informa indisponibilidade se o formulário está presente
      if (statusMessage) {
        statusMessage.textContent = "Serviço de envio indisponível no momento.";
        statusMessage.style.color = "red";
      }
    }
  }
});
