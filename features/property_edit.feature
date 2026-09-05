Feature: Edicion de propiedades

  Como arrendador
  Quiero editar un inmueble
  Para actualizar la informacion en la plataforma RoomRent

  Scenario: Editar una vivienda publicada correctamente
    Given el arrendador inicia sesión en RoomRent
    When accede al panel de arrendador
    And selecciona la opción "Mis inmuebles"
    And selecciona la vivienda "Casa en Arriendo" para editar
    And modifica las habitaciones a "3"
    And modifica el precio a "2000000"
    And elimina las fotografías existentes
    And carga nuevas fotografías
    And guarda los cambios
    Then la vivienda debe mostrar las habitaciones "3"
    And la vivienda debe mostrar el precio "2000000"