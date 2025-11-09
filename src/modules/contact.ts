// --- 1. Definir la URL de nuestra API de Laravel ---
// (Asegúrate que esta URL coincida con la de tu XAMPP)
const API_URL = 'api/contacto'; // (Ruta relativa simple)

// --- 2. Seleccionar todos los elementos del DOM ---
// Buscamos los elementos por su 'id' del index.html (Paso 11)
const form = document.querySelector<HTMLFormElement>('#contactForm');
const responseDiv = document.querySelector<HTMLDivElement>('#responseMessage');
const submitButton = document.querySelector<HTMLButtonElement>('#submitButton');
const spinner = document.querySelector<HTMLSpanElement>('#spinner');
const buttonText = document.querySelector<HTMLSpanElement>('#buttonText');

// Campos de input
const nombreInput = document.querySelector<HTMLInputElement>('#nombre');
const emailInput = document.querySelector<HTMLInputElement>('#email');
const telefonoInput = document.querySelector<HTMLInputElement>('#telefono');
const mensajeInput = document.querySelector<HTMLTextAreaElement>('#mensaje');

// Divs de error
const nombreError = document.querySelector<HTMLDivElement>('#nombreError');
const emailError = document.querySelector<HTMLDivElement>('#emailError');
const telefonoError = document.querySelector<HTMLDivElement>('#telefonoError');
const mensajeError = document.querySelector<HTMLDivElement>('#mensajeError');

/**
 * Función principal que se exportará.
 * Esta función inicializa la lógica del formulario.
 */
export function initContactForm() {
  // 3. Si el formulario no existe en la página, no hacer nada.
  if (!form) {
    console.warn('El formulario #contactForm no se encontró en el DOM.');
    return;
  }

  // 4. Añadir el "escuchador" al evento 'submit'
  form.addEventListener('submit', handleFormSubmit);
}

/**
 * Función que maneja el envío del formulario.
 */
async function handleFormSubmit(event: SubmitEvent) {
  // Evitar que el formulario se envíe de la forma tradicional (recargando la página)
  event.preventDefault();

  // --- 5. Validar y recolectar datos ---
  // (Opcional: puedes añadir validación aquí, pero la API ya lo hace)
  const formData = new FormData(form!);
  const data = Object.fromEntries(formData.entries());

  // --- 6. Preparar la UI para el envío ---
  setLoading(true);
  clearAllErrors();
  responseDiv!.innerHTML = ''; // Limpiar mensajes antiguos

  try {
    // --- 7. Enviar datos a la API de Laravel con fetch() ---
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // --- 8. Manejar la respuesta de la API ---

    // A. Error de Validación (Status 422)
    if (response.status === 422) {
      const { errors } = await response.json();
      // Función para mostrar los errores de la API
      displayValidationErrors(errors);
      showResponseMessage('Por favor, corrige los errores del formulario.', 'danger');
    }
    // B. Éxito (Status 201 - Creado)
    else if (response.status === 201) {
      const { message } = await response.json();
      showResponseMessage(message, 'success');
      form!.reset(); // Limpiar el formulario
    }
    // C. Otro error (ej. 500)
    else {
      throw new Error('Hubo un error inesperado en el servidor.');
    }
  } catch (error) {
    // D. Error de red (ej. API caída)
    console.error('Error en fetch:', error);
    showResponseMessage('Error al conectar con el servidor. Inténtalo más tarde.', 'danger');
  } finally {
    // --- 9. Restaurar la UI ---
    // Esto se ejecuta siempre (si hubo éxito o error)
    setLoading(false);
  }
}

// --- Funciones de Ayuda (Helper functions) ---

/** Muestra/Oculta el Spinner y deshabilita el botón */
function setLoading(isLoading: boolean) {
  if (isLoading) {
    submitButton!.disabled = true;
    spinner!.classList.remove('d-none'); // d-none es una clase de Bootstrap
    buttonText!.innerText = 'Enviando...';
  } else {
    submitButton!.disabled = false;
    spinner!.classList.add('d-none');
    buttonText!.innerText = 'Enviar Mensaje';
  }
}

/** Muestra un mensaje de éxito o error sobre el formulario */
function showResponseMessage(message: string, type: 'success' | 'danger') {
  // Usamos clases de Alertas de Bootstrap
  responseDiv!.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${message}
    </div>
  `;
}

/** Muestra los errores de validación de la API (422) */
function displayValidationErrors(errors: Record<string, string[]>) {
  if (errors.nombre && nombreError) {
    nombreInput?.classList.add('is-invalid');
    nombreError!.innerText = errors.nombre[0];
  }
  if (errors.email && emailError) {
    emailInput?.classList.add('is-invalid');
    emailError!.innerText = errors.email[0];
  }
  if (errors.telefono && telefonoError) {
    telefonoInput?.classList.add('is-invalid');
    telefonoError!.innerText = errors.telefono[0];
  }
  if (errors.mensaje && mensajeError) {
    mensajeInput?.classList.add('is-invalid');
    mensajeError!.innerText = errors.mensaje[0];
  }
}

/** Limpia todos los mensajes de error */
function clearAllErrors() {
  const inputs = [nombreInput, emailInput, telefonoInput, mensajeInput];
  const errorDivs = [nombreError, emailError, telefonoError, mensajeError];
  
  inputs.forEach(input => input?.classList.remove('is-invalid'));
  errorDivs.forEach(div => (div!.innerText = ''));
}