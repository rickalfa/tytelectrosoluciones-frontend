
import { initContactForm } from './modules/contact.ts'



import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'


import { loadHTML } from './ui/htmlLoader.ts'; // <-- 1. IMPORTAMOS EL CARGADOR

import { initNavigation } from './modules/navigation.ts';

///import { initSocialBar } from './modules/socialbar.ts'; // <-- LÍNEA NUEVA

import { initScrollAnimations } from './ui/scrollAnimator';
// Importar nuestro archivo SASS principal (que ahora incluye Bootstrap)
import './scss/main.scss';

// Importar todo el JavaScript de Bootstrap (para componentes como menús, modales, etc.)
import 'bootstrap';






// --- El resto de tu código de main.ts (como 'import './style.css'') ---
// ...// 3. Importar nuestro nuevo módulo de contacto

async function initializeApp() {
  // 2. CARGAMOS EL NAVBAR PRIMERO y esperamos
  // (La URL '/partials/_navbar.html' funciona porque está en la carpeta 'public')
  const loadNav = loadHTML('#navbar-placeholder', '/partials/_navbar.html');
  const loadContact = loadHTML('#contact-placeholder', '/partials/_contact.html');
  const loadSocialBar = loadHTML('#socialbar-placeholder', '/partials/_socialbar.html'); 
  const loadGallery = loadHTML('#gallery-placeholder', '/partials/_gallery.html'); 

  const loadWhatsApp = loadHTML('#whatsapp-placeholder', '/partials/_whatsapp.html');

  const loadNosotros = loadHTML('#nosotros-placeholder', '/partials/_nosotros.html');

  const loadService = loadHTML("#service-placeholder", '/partials/_service.html');

  // 2. Ejecutar todas las cargas de HTML en paralelo y esperar a que terminen
  await Promise.all([loadNav, 
    loadContact, 
    loadSocialBar,
    loadGallery,
    loadContact, 
    loadWhatsApp,
    loadNosotros,
    loadService]);

  // 3. AHORA que el navbar existe, inicializamos la navegación
  initNavigation();
  
 


  // El formulario de contacto no depende del navbar, así que puede ir aquí
 initContactForm();
initScrollAnimations();

try {
    const carousel = document.getElementById("serviceCarousel");


  if (carousel != null ) {
    
      carousel.addEventListener("slide.bs.carousel", function (event) {

          const e = event as unknown as { relatedTarget: HTMLElement };
         const next = e.relatedTarget;
        

          const title = next.getAttribute("data-title");
          const desc = next.getAttribute("data-description");
          const bg = next.getAttribute("data-bg");
          const Icon = next.getAttribute("data-icon");

        const textCont =  document.getElementById("serviceTitle");


        if (textCont != null) {
          textCont.textContent = title;
          
        } 

          
        const textServDesc =  document.getElementById("serviceDesc");

        if (textServDesc != null) {
          textServDesc.textContent = desc;
          
        }

        const serviceBg = document.getElementById("service");

        if (serviceBg != null) {



         if (bg != null) {
           serviceBg.style.backgroundImage = bg;
         }
          
        }

       
        const IconData = document.querySelector<HTMLImageElement>(".service-icon");

        if(IconData != null){

         //  console.log("path icon : "+ Icon);


        IconData.src =  Icon ?? "";

        }else{
         // console.log(" IconData es null");
        }

      });

  } else {
    
  }
  
} catch (error) {
  
}

 





}

// 5. Usamos 'DOMContentLoaded' para llamar a nuestra función async
document.addEventListener('DOMContentLoaded', initializeApp);




document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
