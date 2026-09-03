Feature: Publicación de propiedades

  Como arrendador
  Quiero publicar un inmueble
  Para ofrecerlo a los arrendatarios de RoomRent

  Scenario: Crear una propiedad como arrendador
    Given el arrendador inicia sesión en RoomRent
    When accede al panel de arrendador
    And selecciona la opción "Publicar nuevo"
    And diligencia los datos de la propiedad
    And publica el inmueble
    Then debería visualizar la propiedad publicada