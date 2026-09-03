# 1. Prerrequisitos
La persona que clone el repositorio debería tener:

Node.js instalado.
npm incluido con Node.js.
Git instalado.
Acceso al proyecto/aplicación que se va a probar.
Credenciales de prueba para el login.
URL del ambiente donde se ejecutarán las pruebas.
Puedes verificar las instalaciones con:
- node --version
- npm --version
- git --version

# 2. Crear el proyecto de Playwright

Si todavía no tienes configurado el proyecto:

- npm init playwright@latest

Durante el asistente puedes seleccionar:
JavaScript o TypeScript
tests
GitHub Actions: Yes/No
Install Playwright browsers: Yes

# 3. Instalar los navegadores

Si Playwright no los instaló automáticamente:

- npx playwright install

En Linux, si necesitas instalar también las dependencias del sistema:

- npx playwright install --with-deps

# 4 Ejecutar las pruebas
Para ejecutar todos los tests:

- npx cucumber-js

Para ejecutar específicamente uno por ejemplo properties:

- npx cucumber-js features/properties.feature 

Para forzar evidencia nuevamente de un escenario ya registrado:
$env:RECAPTURAR_EVIDENCIAS='true'
npm.cmd test

