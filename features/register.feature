Scenario: Registro con correo ya registrado
  Given el usuario se encuentra en la página de registro
  When ingresa un correo que ya está registrado
  And completa los demás campos obligatorios
  And completa el registro
  Then debería mostrarse un mensaje indicando que el correo ya existe
