Feature: Contactos

  Scenario: Crear contacto
    Given el usuario está autenticado
    When crea un contacto
    Then el contacto debería existir