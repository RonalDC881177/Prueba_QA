Feature: Publicación de propiedades

  Como arrendador
  Quiero publicar un inmueble
  Para ofrecerlo en la plataforma RoomRent

  Scenario: Crear una propiedad exitosamente
    Given el arrendador inicia sesión en RoomRent
    When accede al panel de arrendador
    And selecciona la opción "Publicar nuevo"
    And selecciona el tipo de inmueble "Casa"
    And diligencia los datos básicos del inmueble
    And diligencia las características del inmueble
    And carga las fotografías del inmueble
    And diligencia la información de la publicación
    And configura las reglas del inmueble
    And publica el inmueble
    Then debería visualizar la propiedad publicada