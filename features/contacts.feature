Feature: Gestión de contactos
  Como usuario autenticado
  Quiero gestionar mis contactos
  Para mantener información organizada

  Background:
    Given el usuario está autenticado

  Scenario: Crear contacto exitosamente
    When crea un nuevo contacto con datos válidos
    Then el contacto debería aparecer en la lista

  Scenario: Editar un contacto
    Given existe un contacto creado
    When el usuario edita el contacto
    Then los cambios deberían guardarse correctamente

  Scenario: Eliminar un contacto
    Given existe un contacto creado
    When el usuario elimina el contacto
    Then el contacto no debería aparecer en la lista