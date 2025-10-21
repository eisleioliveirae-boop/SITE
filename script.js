/* script.js
   Combinação: emailjs init + formulário + menu toggle (3 pontinhos)
   Pronto para uso no site EOD Advocacia Empresarial
*/

(function () {
  // Inicializa EmailJS (mantive o ID que você tinha no script original)
  // Se desejar trocar o userID, altere a string abaixo
  try {
    if (typeof emailjs !== 'undefined' && typeof emailjs.init === 'function') {
      emailjs.init("rbNmUP_uVXlHnf3Ko");
    }
  } catch (err) {
    // não quebra a execução do restante do script
    // manter console para debugging
    // eslint-disable-next-line no-console
    console.warn('emailjs init error:', err);
  }
})();

/* DOM ready */
document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Menu toggle (3 pontinhos) ---------- */
  const menu = document.querySelector('.menu');
  const toggle = document.getElementById('menuToggle');
  const siteMenu = document.getElementById('site-menu'); // ul dos links
  const header = document.querySelector('.header');

  // Funções de abertura / fechamento com acessibilidade
  function openMenu() {
    if (!menu) return;
    menu.classList.add('open');
    if (siteMenu) siteMenu.hidden = false;
    if (header) header.classList.add('menu-active');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('open');
    if (siteMenu) siteMenu.hidden = true;
    if (header) header.classList.remove('menu-active');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  if (menu && toggle && siteMenu) {
    // Certifica-se do estado inicial
    siteMenu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (menu.classList.contains('open')) closeMenu();
      else openMenu();
    });

    // Fecha o menu ao clicar em qualquer link (útil para mobile)
    siteMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', function (ev) {
      if (!menu.contains(ev.target) && menu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Fecha com ESC (acessibilidade)
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        if (toggle) toggle.focus();
      }
    });
  }

  /* ---------- Formulário + EmailJS ---------- */
  const contactForm = document.getElementById('contact-form');
  const statusMessage = document.getElementById('status-message');

  // Helper para mostrar status
  function setStatus(text, color) {
    if (!statusMessage) return;
    statusMessage.textContent = text;
    if (color) statusMessage.style.color = color;
  }

  if (contactForm) {
    // proteção contra submit duplo
    let sending = false;

    contactForm.addEventListener('submit', function (ev) {
      ev.preventDefault();

      // já em envio?
      if (sending) return;
      sending = true;

      // feedback inicial
      setStatus('Enviando...', '#232342');

      // desabilitar botão de submit (se houver)
      const submitBtn = contactForm.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
      }

      // IDs do EmailJS - altere se os seus forem diferentes
      const SERVICE_ID = 'service_ju5k04n';
      const TEMPLATE_ID = 'template_9qmusmm';

      // Se emailjs não estiver disponível, aborta com mensagem
      if (typeof emailjs === 'undefined' || typeof emailjs.sendForm !== 'function') {
        setStatus('Serviço de envio indisponível no momento.', 'red');
        // reabilita botão
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.removeAttribute('aria-busy');
        }
        sending = false;
        // eslint-disable-next-line no-console
        console.error('EmailJS não carregado ou API sendForm ausente.');
        return;
      }

      // Enviar via EmailJS
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm)
        .then(function (response) {
          setStatus('Mensagem enviada com sucesso!', '#25D366');
          contactForm.reset();
          // foco no primeiro campo
          const firstField = contactForm.querySelector('input, textarea, select');
          if (firstField) firstField.focus();
        })
        .catch(function (error) {
          setStatus('Erro ao enviar a mensagem. Tente novamente mais tarde.', 'red');
          // eslint-disable-next-line no-console
          console.error('EmailJS sendForm error:', error);
        })
        .finally(function () {
          // reabilitar botão
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-busy');
          }
          sending = false;
        });
    });
  } else {
    // Se não existe form, exibe pequena mensagem no console (não é erro crítico)
    // eslint-disable-next-line no-console
    console.info('Contact form not found on this page.');
  }
});
