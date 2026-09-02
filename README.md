# Prueba QA

## Objetivo
Automatizar pruebas funcionales para la aplicación de gestión de contactos utilizando Playwright y Cucumber.

## Cobertura
Las pruebas incluyen:

- Login exitoso y fallido
- Creación de contactos
- Edición de contactos
- Eliminación de contactos
- Validaciones básicas
- Integración UI + API

## Estrategia
Se priorizaron pruebas API y flujos críticos de UI para asegurar estabilidad en los procesos principales de la aplicación.

Para forzar evidencia nuevamente de un escenario ya registrado:
$env:RECAPTURAR_EVIDENCIAS='true'
npm.cmd test