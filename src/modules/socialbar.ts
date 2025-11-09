/**
 * Inicializa la barra social.
 * Muestra la barra solo cuando la sección "inicio" NO está visible.
 */
export function initSocialBar() {
  // 1. Seleccionar los elementos
  const socialBar = document.querySelector<HTMLElement>('#socialBar');
  const inicioSection = document.querySelector<HTMLElement>('#inicio');

  // Salir si los elementos no se han cargado (importante)
  if (!socialBar || !inicioSection) {
    console.warn('SocialBar: No se encontró la barra social o la sección de inicio.');
    return;
  }

  // 2. Configurar el Observador
  const observerOptions = {
    root: null, // Observar en relación al viewport
    threshold: 0.5, // 0.5 = se activa cuando el 50% de la sección está visible
  };

  // 3. El Callback (La lógica principal)
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries; // Solo observamos un elemento
    
    // entry.isIntersecting = ¿Está la sección "inicio" visible?
    if (entry.isIntersecting) {
      // SÍ: El usuario está en "Inicio". Ocultamos la barra.
      socialBar.classList.remove('is-visible');
    } else {
      // NO: El usuario está fuera de "Inicio". Mostramos la barra.
      socialBar.classList.add('is-visible');
    }
  };

  // 4. Crear y activar el observador
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(inicioSection);
}