Feature: Integración entre API y UI

  Scenario: Crear contacto por API y visualizarlo en UI
    Given el usuario tiene un token válido
    When crea un contacto a través de la API
    And navega a la lista de contactos en la UI
    Then debería ver el contacto creado

  Scenario: Crear contacto en UI y validarlo en API
    Given el usuario está autenticado en la UI
    When crea un contacto desde la interfaz
    Then el contacto debería existir en la API