Feature: Autenticación de usuarios
  Como usuario de la aplicación
  Quiero iniciar sesión
  Para acceder a mis contactos

  Scenario: Login exitoso
  Given el usuario está en la página de login
  When ingresa email y contraseña válidos
  Then debería ver la lista de contactos

  Scenario: Login con contraseña incorrecta
    Given el usuario está en la página de login
    When ingresa email válido y contraseña incorrecta
    Then debería ver un mensaje de error

  Scenario: Login con campos vacíos
    Given el usuario está en la página de login
    When intenta iniciar sesión sin ingresar credenciales
    Then debería ver validaciones de campos obligatorios