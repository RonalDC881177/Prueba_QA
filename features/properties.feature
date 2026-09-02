Feature: Consulta de propiedades

  Como usuario de RoomRent
  Quiero consultar las propiedades disponibles
  Para encontrar una vivienda que se adapte a mis necesidades

  Scenario: Navegar al listado de propiedades
    Given el usuario está en el portal de RoomRent
    When selecciona la opción "Propiedades"
    Then debería visualizar la página de propiedades

  Scenario: Mostrar mensaje cuando no existen propiedades
    Given el usuario está en el portal de RoomRent
    When selecciona la opción "Propiedades"
    Then debería visualizar el mensaje de que no existen propiedades