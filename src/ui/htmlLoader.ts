/**
 * Carga contenido HTML desde una URL y lo inyecta en un selector.
 * @param selector El selector CSS del elemento contenedor (ej: '#navbar-placeholder')
 * @param url La URL del archivo HTML a cargar (ej: '/partials/_navbar.html')
 */
export async function loadHTML(selector: string, url: string): Promise<void> {
  try {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) {
      console.warn(`Elemento "${selector}" no encontrado para cargar HTML.`);
      return;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error al cargar ${url}: ${response.statusText}`);
    }

    element.innerHTML = await response.text();
  } catch (error) {
    console.error('Error cargando HTML parcial:', error);
  }
}