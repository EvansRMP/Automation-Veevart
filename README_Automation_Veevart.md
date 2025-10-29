# Automation‑Veevart

Automatización de pruebas funcionales end‑to‑end para la plataforma Veevart usando Playwright y Cucumber.js.  
Este proyecto está pensado para facilitar el desarrollo de pruebas automatizadas (login, flujos clave, regresión) en un entorno de Salesforce u otra plataforma web.

---

## 🧰 Tecnologías

- Playwright (navegadores: Chromium / WebKit)  
- Cucumber.js (BDD: Given‑When‑Then)  
- TypeScript  
- Node.js / npm  
- GitHub (repositorio)  

---

## 🔧 Instalación

1. Clona este repositorio:  
   ```bash
   git clone https://github.com/EvansRMP/Automation-Veevart.git
   cd Automation-Veevart
   ```

2. Instala dependencias:  
   ```bash
   npm install
   ```

3. Instala o actualiza navegadores de Playwright:  
   ```bash
   npx playwright install --with-deps
   ```

4. Crea un archivo `.env` en la raíz (si no existe) y define las variables necesarias, por ejemplo:  
   ```dotenv
   BASE_URL=https://login.salesforce.com/
   SF_USER=usuario@empresa.com
   SF_PASS=MiPasswordSecreto
   ```

5. (Opcional) Ajusta los permisos en macOS / Windows / Linux para permitir el control del navegador desde Playwright.

---

## 🚀 Cómo ejecutar las pruebas

- Ejecutar todos los escenarios:  
  ```bash
  npx cucumber-js
  ```

- Ejecutar en modo desarrollo (modo encabezado, lento para depurar):  
  ```bash
  npx cucumber-js --require-module ts-node/register --format pretty
  ```

- Ejecutar solo un tag específico (por ejemplo `@login`):  
  ```bash
  npx cucumber-js --tags "@login"
  ```

---

## 📂 Estructura del proyecto

```
/src
  /test
    /steps         ← Archivos de definición de pasos Cucumber
    /features      ← Archivos `.feature` (Gherkin)
    /utils         ← Clases de utilería (por ejemplo, pageFixture)
    /pages         ← PageObjects para Playwright (LoginPage, etc.)
/reports             ← Salida de reportes (JSON, HTML)
.env                 ← Variables de entorno (no subir al repositorio)
/tsconfig.json       ← Configuración TypeScript
package.json         ← Dependencias & scripts
```

---

## 📝 Documentación breve

- **PageFixture**: Inicializa el contexto del navegador, la página y se puede reutilizar entre escenarios.  
- **LoginPage**: Clase que encapsula la navegación al login, relleno de credenciales y validación del inicio de sesión.  
- **Steps (Cucumber)**: Ubicados en `src/test/steps`, contienen los mapeos `Given`, `When`, `Then` que llaman a los métodos de los PageObjects.  
- **Features**: Archivos Gherkin (`.feature`) que describen los escenarios de prueba en lenguaje legible por negocio.  
- **Reportes**: Después de ejecutar las pruebas se genera un JSON en `reports/`, que se puede transformar en HTML para visualizar resultados detallados.

---

## ✅ Buenas prácticas

- Usar variables de entorno para credenciales sensibles.  
- No usar `headless: true` durante el desarrollo inicial; facilita ver qué pasa.  
- Limpiar el contexto del navegador entre escenarios si los tests pueden interferirse.  
- Mantener nombres consistentes en los Selectores del PageObject y en los escenarios Gherkin.  
- Versionar el archivo `package.json` y `tsconfig.json` para reproducibilidad del entorno.

---

## 📖 Ayuda / Contacto

Para dudas, problemas o sugerencias, abre un *issue* en este repositorio o contacta al responsable del proyecto.  
¡Feliz automatización! 🎉
