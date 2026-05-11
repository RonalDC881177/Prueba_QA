Feature: Integración API UI

  Scenario: Crear contacto por API y verlo en UI
    Given el usuario tiene token
    When crea contacto por API
    Then lo visualiza en UI