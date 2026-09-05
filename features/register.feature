Feature: Registro de usuario

  Scenario: Registro con correo ya registrado
    Given el usuario se encuentra en la pantalla de login
    When selecciona la opción "Registrarse"
    And ingresa un usuario nuevo
    And ingresa un correo ya registrado
    And ingresa una contraseña válida
    And selecciona "Crear cuenta"
    Then debería mostrarse un mensaje de error

