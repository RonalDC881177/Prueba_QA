Feature: Registro de usuario

  Como una persona nueva
  Quiero crear una cuenta
  Para poder utilizar la aplicación

  @registration
  Scenario: Registro exitoso de un usuario nuevo
    Given el usuario se encuentra en la pantalla de login
    When selecciona la opción "Registrarse"
    And ingresa un usuario nuevo
    And ingresa un correo electrónico válido
    And ingresa una contraseña válida
    And selecciona "Crear cuenta"
    Then debería mostrarse el mensaje de registro exitoso


  @registration
  Scenario: Registro con correo ya registrado
    Given el usuario se encuentra en la pantalla de login
    When selecciona la opción "Registrarse"
    And ingresa un usuario nuevo
    And ingresa un correo ya registrado
    And ingresa una contraseña válida
    And selecciona "Crear cuenta"
    Then debería mostrarse un mensaje de error