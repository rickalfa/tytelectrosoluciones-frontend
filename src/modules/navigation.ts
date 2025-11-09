/**
 * Inicializa toda la lógica de la navegación principal:
 * 1. Smooth scroll al hacer clic.
 * 2. Resaltado del enlace activo (active class) al hacer clic.
 * 3. Resaltado del enlace activo (active class) al hacer scroll.
 */
export function initNavigation() {
  initSmoothScrollAndClick();
  initScrollObserver();
}

/**
 * Maneja el clic en los enlaces de navegación.
 * - Hace smooth scroll.
 * - Añade la clase .active inmediatamente.
 * - Cierra el menú móvil.
 */
function initSmoothScrollAndClick() {
  const scrollTriggers = document.querySelectorAll<HTMLAnchorElement>(
    '.js-scroll-trigger'
  );
  const allNavLinks = document.querySelectorAll<HTMLAnchorElement>(
    '.navbar-nav .nav-link'
  );
  const navbarCollapse =
    document.querySelector<HTMLDivElement>('#navbarContent');
  const navbarToggler =
    document.querySelector<HTMLButtonElement>('.navbar-toggler');

  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      // 1. Prevenir el salto brusco
      event.preventDefault();

      // 2. Obtener el destino y hacer scroll
      const targetId = trigger.getAttribute('href');
      if (!targetId) return;
      const targetElement = document.querySelector<HTMLElement>(targetId);
      if (!targetElement) return;

      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // 3. ¡NUEVO! Actualizar la clase .active al instante
      allNavLinks.forEach((link) => link.classList.remove('active'));
      trigger.classList.add('active');

      // 4. Cerrar el menú "hamburguesa" en móvil
      if (
        navbarCollapse &&
        navbarToggler &&
        navbarCollapse.classList.contains('show')
      ) {
        navbarToggler.click();
      }
    });
  });
}

/**
 * ¡NUEVO! Maneja el resaltado del enlace mientras el usuario hace scroll.
 * Usa un IntersectionObserver para ver qué sección está en pantalla.
 */
function initScrollObserver() {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>(
    '.navbar-nav .nav-link'
  );

  const observerOptions = {
    root: null,
    threshold: 0.5, // 50% de la sección debe estar visible
  };

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      // Si la sección está 50% visible...
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const activeLink = document.querySelector(
          `.navbar-nav .nav-link[href="#${id}"]`
        );

        // Quitar .active de todos
        navLinks.forEach((link) => link.classList.remove('active'));

        // Añadir .active solo al enlace correspondiente
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  };

  // Crear y activar el observador para todas las secciones
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach((section) => observer.observe(section));
}