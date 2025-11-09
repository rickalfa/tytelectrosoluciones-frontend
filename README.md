# Plantilla Web Informativa con API de Contactos (Laravel + Vite)

Este proyecto es una plantilla moderna y completa para crear una página web informativa (tipo "Landing Page" o "Single Page App") para cualquier tipo de empresa.

El objetivo principal es proporcionar una presencia en línea profesional y modular, con un **formulario de contacto robusto** que no solo envía un correo, sino que también verifica la autenticidad del email del usuario y registra los contactos verificados en una base de datos.

---

## 🎯 Finalidad y Lógica del Proyecto

A diferencia de un formulario de contacto simple, este proyecto implementa una lógica de **"Doble Opt-in"** para asegurar la calidad de los contactos:

1.  **Formulario (Frontend):** Un visitante llena el formulario en el sitio web (construido con Vite y TypeScript).
2.  **Recepción (API):** La API de Laravel recibe los datos.
3.  **Registro (BD):** La API guarda el contacto en la base de datos MySQL, pero lo marca como **"No Verificado"** (el campo `email_verified_at` está nulo).
4.  **Verificación (Email):** El sistema envía automáticamente un correo de auto-respuesta al email del visitante, el cual contiene un **enlace único de verificación**.
5.  **Autenticación (API):** El visitante hace clic en el enlace. Esto llama a un segundo *endpoint* de la API (`/api/verificar-email/{token}`).
6.  **Confirmación (BD):** La API encuentra el token, valida al usuario y actualiza la base de datos, rellenando el campo `email_verified_at`.
7.  **Notificación (Admin):** (Opcional) Simultáneamente al paso 4, se envía un correo al administrador de la empresa para notificarle del *nuevo* contacto (aún no verificado).

---

## ✨ Características Principales

* **Frontend Modular:** El frontend (Vite) está 100% modularizado. El HTML de los componentes (Navbar, Formulario, Galería, Barra Social) se carga dinámicamente usando `fetch` de TypeScript.
* **Backend de API Robusto:** El backend (Laravel) sirve como una API pura.
* **Verificación de Email (Doble Opt-in):** Asegura que los correos en tu base de datos son reales y que los usuarios dieron su consentimiento.
* **UI Moderna:** Utiliza Bootstrap 5, SASS y Bootstrap Icons para un diseño limpio y adaptable.
* **Navegación Fluida:** La navegación de la "Single Page App" (SPA) utiliza `IntersectionObserver` para resaltar el enlace activo en el menú y mostrar elementos de forma condicional (como la barra social).
* **Flujo de Producción:** El frontend se "construye" (`npm run build`) y sus archivos estáticos (`dist/`) se sirven directamente desde la carpeta `public/` de Laravel, eliminando por completo los problemas de CORS.

---

## 💻 Stack Tecnológico (Los "Modelos")

Este proyecto se divide en dos repositorios o carpetas principales:

### Backend (API)
* **Framework:** Laravel (PHP 8.2+)
* **Servidor:** XAMPP (Apache)
* **Base de Datos:** MySQL
* **Gestor de Paquetes:** Composer
* **Manejo de Correos:** Laravel Mailables (con Mailtrap para desarrollo)

### Frontend (Cliente)
* **Build Tool:** Vite
* **Lenguaje:** TypeScript
* **Gestor de Paquetes:** NPM (Node.js 20+)
* **Estilos:** SASS (SCSS)
* **Framework de UI:** Bootstrap 5
* **Iconos:** Bootstrap Icons

---



¡Tu aplicación web modular debería funcionar perfectamente!