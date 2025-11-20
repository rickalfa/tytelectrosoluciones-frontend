/**
 * Inicializa un IntersectionObserver para animar elementos
 * cuando entran en la vista (ej. con la clase .animate-on-scroll).
 */
export function initScrollAnimations() {
  // 1. Seleccionar todos los elementos que queremos animar
  const elementsToAnimate = document.querySelectorAll<HTMLElement>('.animate-on-scroll');

  // Si no hay nada que animar, no hacer nada.
  if (elementsToAnimate.length === 0) {
    return;
  }

  // 2. El Callback (Qué hacer cuando el elemento entra en pantalla)
  const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      // 3. ¿Está el elemento visible?
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        
        // 4. Leer el delay (si existe) del 'data-animation-delay'
        const delay = element.dataset.animationDelay;
        if (delay) {
          element.style.transitionDelay = `${delay}ms`;
        }
        
        // 5. Añadir la clase que activa la animación SASS
        element.classList.add('is-visible');
        
        // 6. Dejar de observar este elemento (la animación es solo una vez)
        observer.unobserve(element);
      }
    });
  };

  // 7. Crear el Observador
  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1, // Activar cuando el 10% del elemento esté visible
  });

  // 8. Observar cada elemento
  elementsToAnimate.forEach((element) => observer.observe(element));
}