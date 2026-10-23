/**
 * CFO INGENIERÍA Y SOLUCIONES - LÓGICA INTERACTIVA VANILLA JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de componentes
  initNavigation();
  initScrollAnimations();
  initFormValidation();
  setCurrentYear();
});

/**
 * 1. Control de Navegación y Menú Mobile
 */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Comportamiento Sticky con Sombra en Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Alternar Menú Hamburguesa
  mobileToggle.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  // Cerrar menú mobile al presionar enlaces y scroll suave offset
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Cerrar menú móvil si está abierto
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }

      // Marcar link activo dinámicamente
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

/**
 * 2. Animaciones Discretas de Entrada On-Scroll
 */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  // Respetar preferencia de movimiento reducido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    fadeElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));
}

/**
 * 3. Validación de Formulario de Contacto en Cliente
 */
function initFormValidation() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Limpiar errores previos
    clearErrors();

    // Capturar campos
    const fullName = document.getElementById('fullName');
    const company = document.getElementById('company');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const message = document.getElementById('message');

    let isValid = true;

    // Validación Nombre
    if (!fullName.value.trim()) {
      showFieldError('fullName', 'Por favor, ingrese su nombre completo.');
      isValid = false;
    }

    // Validación Empresa
    if (!company.value.trim()) {
      showFieldError('company', 'Por favor, especifique el nombre de su empresa.');
      isValid = false;
    }

    // Validación Email
    if (!email.value.trim()) {
      showFieldError('email', 'El correo electrónico es obligatorio.');
      isValid = false;
    } else if (!validateEmail(email.value.trim())) {
      showFieldError('email', 'Ingrese una dirección de correo válida.');
      isValid = false;
    }

    // Validación Teléfono
    if (!phone.value.trim()) {
      showFieldError('phone', 'Por favor, proporcione un número telefónico.');
      isValid = false;
    }

    // Validación Servicio
    if (!service.value) {
      showFieldError('service', 'Seleccione una especialidad o servicio de interés.');
      isValid = false;
    }

    // Validación Mensaje
    if (!message.value.trim()) {
      showFieldError('message', 'Describa brevemente el alcance de su consulta.');
      isValid = false;
    }

    if (isValid) {
      // Notificación de éxito preparada para posterior integración Backend
      feedback.className = 'form-feedback success';
      feedback.textContent = '¡Gracias por su consulta! Hemos registrado sus datos correctamente. Nos pondremos en contacto a la brevedad posible.';
      form.reset();

      // Ocultar mensaje después de 6 segundos
      setTimeout(() => {
        feedback.classList.add('hidden');
      }, 6000);
    } else {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Por favor, verifique los campos marcados antes de enviar.';
    }
  });

  // Limpiar error dinámicamente al escribir
  const inputs = form.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('invalid');
      const errSpan = document.getElementById(`${input.id}Error`);
      if (errSpan) errSpan.textContent = '';
    });
  });
}

function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`${fieldId}Error`);
  if (input) input.classList.add('invalid');
  if (errorSpan) errorSpan.textContent = message;
}

function clearErrors() {
  const inputs = document.querySelectorAll('.form-input');
  const errors = document.querySelectorAll('.error-msg');
  const feedback = document.getElementById('formFeedback');

  inputs.forEach(input => input.classList.remove('invalid'));
  errors.forEach(err => err.textContent = '');
  feedback.className = 'form-feedback hidden';
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * 4. Año en Pie de Página Dinámico
 */
function setCurrentYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}