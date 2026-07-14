# Análisis de Requisitos - Módulo de Viajes

**Autor:** [Nombre del Equipo/Analista]
**Fecha:** 13 de julio de 2026
**Versión:** 1.0
**Estado:** Validado

---

## 1. Requisitos No Funcionales (RNF)

Los siguientes requisitos definen las propiedades de calidad y restricciones técnicas del sistema, basados en las necesidades de seguridad y rendimiento expresadas por el cliente.

| ID | Categoría | Descripción | Métrica de Aceptación |
|----|-----------|-------------|----------------------|
| RNF-01 | **Seguridad** | Toda la comunicación entre la aplicación móvil del chofer y el servidor debe estar cifrada mediante protocolo TLS 1.3. | Certificado SSL válido; sin tráfico HTTP plano. |
| RNF-02 | **Seguridad** | Los datos sensibles (ubicación GPS, información personal de clientes, historial de viajes) deben almacenarse encriptados en la base de datos usando AES-256. | Auditoría de base de datos; verificar campos encriptados. |
| RNF-03 | **Rendimiento** | El sistema debe soportar al menos 1,000 solicitudes simultáneas por segundo (1,000 req/s) sin degradación del servicio. | Pruebas de carga con JMeter; latencia < 2 segundos en el 95% de las peticiones. |
| RNF-04 | **Disponibilidad** | El servicio de localización y asignación de viajes debe tener una disponibilidad mínima del 99.9% mensual (excluyendo mantenimientos programados). | Monitoreo continuo con herramientas como Datadog o New Relic. |
| RNF-05 | **Escalabilidad** | La arquitectura debe permitir escalado horizontal automático para manejar picos de demanda (ej. horas punta, eventos especiales). | Pruebas de estrés con 5,000 usuarios concurrentes. |

---

## 2. Historias de Usuario (US)

Las historias siguen el formato estándar ágil: **COMO... QUIERO... PARA...**, asegurando que cada funcionalidad tenga un valor claro de negocio.

### US-01: Visualización de Viajes en Tiempo Real

- **COMO:** Chofer de la plataforma de transporte
- **QUIERO:** Ver en mi mapa los viajes solicitados que están cerca de mi ubicación actual en tiempo real
- **PARA:** poder elegir los viajes que me sean más convenientes y ahorrar tiempo en desplazamientos innecesarios.

**Prioridad:** Alta (Must Have)
**Estimación:** 5 puntos de historia
**Criterios de Aceptación:** Ver sección 3.1

---

### US-02: Cálculo de Ruta Más Corta al Aceptar Viaje

- **COMO:** Chofer de la plataforma de transporte
- **QUIERO:** Que al aceptar un viaje, el sistema calcule automáticamente y me muestre la ruta más corta en distancia desde mi ubicación actual hasta el punto de recogida del cliente
- **PARA:** minimizar el consumo de gasolina, reducir costos operativos y maximizar mis ganancias por viaje.

**Prioridad:** Media (Should Have)
**Estimación:** 3 puntos de historia
**Criterios de Aceptación:** Ver sección 3.2

---

### US-03: Notificación de Viajes Cercanos (Bonus - Para completar la cobertura)

- **COMO:** Chofer de la plataforma de transporte
- **QUIERO:** Recibir una notificación push cuando haya un viaje disponible en mi zona de influencia
- **PARA:** no perder oportunidades de negocio mientras tengo la aplicación en segundo plano.

**Prioridad:** Baja (Could Have)
**Estimación:** 2 puntos de historia

---

## 3. Criterios de Aceptación (Formato Gherkin)

Los criterios de aceptación definen escenarios concretos que validan el comportamiento esperado del sistema, siguiendo la estructura **DADO / CUANDO / ENTONCES**.

### 3.1. Criterios para US-01: Visualización de Viajes en Tiempo Real

#### Escenario 1: Visualización exitosa de viajes cercanos
- **DADO** que el chofer ha iniciado sesión correctamente en la aplicación
- **Y** su ubicación GPS está activa y permitida en la configuración del dispositivo
- **CUANDO** un cliente solicita un viaje a menos de 3 kilómetros de la ubicación actual del chofer
- **ENTONCES** el sistema debe mostrar un marcador visual (icono) en el mapa del chofer con la ubicación exacta del cliente
- **Y** actualizar automáticamente la lista de viajes disponibles sin necesidad de recargar la página.

#### Escenario 2: No hay viajes cercanos disponibles
- **DADO** que el chofer está conectado a la plataforma
- **CUANDO** no existe ningún viaje solicitado en un radio de 10 kilómetros alrededor de su ubicación
- **ENTONCES** el sistema debe mostrar un mensaje claro y visible: "No hay viajes cercanos en este momento"
- **Y** no mostrar marcadores en el mapa.

#### Escenario 3: Actualización en tiempo real
- **DADO** que el chofer está visualizando el mapa de viajes disponibles
- **CUANDO** un cliente cancela un viaje previamente mostrado
- **ENTONCES** el sistema debe eliminar automáticamente el marcador correspondiente del mapa en menos de 5 segundos
- **Y** actualizar el contador de viajes disponibles.

---

### 3.2. Criterios para US-02: Cálculo de Ruta Más Corta

#### Escenario 1: Cálculo exitoso de la ruta más corta
- **DADO** que el chofer ha aceptado un viaje para el cliente "Juan Pérez"
- **Y** el sistema tiene acceso a la ubicación actual del chofer y a la dirección de recogida del cliente
- **CUANDO** el sistema procesa la aceptación del viaje
- **ENTONCES** debe calcular instantáneamente la ruta más corta en kilómetros entre ambos puntos utilizando datos de tráfico en tiempo real
- **Y** mostrar la ruta destacada en el mapa con color azul
- **Y** mostrar el tiempo estimado de llegada (ETA) al punto de recogida del cliente.

#### Escenario 2: No se puede calcular la ruta
- **DADO** que el chofer ha aceptado un viaje
- **CUANDO** no hay conexión a internet o el servicio de mapas no está disponible
- **ENTONCES** el sistema debe mostrar un mensaje de error amigable: "No se pudo calcular la ruta. Verifica tu conexión."
- **Y** permitir al chofer intentar el cálculo nuevamente con un botón de reintento.

---

## 4. Validación con Modelo INVEST

Cada historia cumple con los criterios del modelo INVEST:

| Historia | Independiente | Negociable | Valiosa | Estimable | Pequeña | Testeable |
|----------|---------------|------------|---------|-----------|---------|-----------|
| **US-01** | ✅ Sí (puede desarrollarse sin US-02) | ✅ Sí (detalles de radio se pueden ajustar) | ✅ Sí (ahorra tiempo y gasolina) | ✅ Sí (5 pts) | ✅ Sí (implementable en 1 sprint) | ✅ Sí (criterios Gherkin definidos) |
| **US-02** | ✅ Sí (no depende de US-01) | ✅ Sí (algoritmo de ruta puede cambiarse) | ✅ Sí (reduce costos) | ✅ Sí (3 pts) | ✅ Sí (implementable en 1 sprint) | ✅ Sí (criterios Gherkin definidos) |

---

## 5. Notas Técnicas y Dependencias

| Aspecto | Detalle |
|---------|---------|
| **API Externa** | Se requiere integración con Google Maps API o Mapbox para cálculo de rutas y distancias. |
| **WebSockets** | Para actualización en tiempo real de viajes, se recomienda usar WebSockets (ej. Socket.IO) o Server-Sent Events (SSE). |
| **Base de Datos** | PostgreSQL con extensión PostGIS para consultas geoespaciales eficientes (ubicaciones cercanas). |
| **Seguridad** | Autenticación JWT (JSON Web Tokens) para sesiones de usuario; OAuth 2.0 opcional para futura integración. |
| **Pruebas** | QA debe ejecutar pruebas de carga (1,000 req/s) y pruebas de penetración para validar RNF-01 y RNF-03. |

---

## 6. Glosario de Términos

| Término | Definición |
|---------|------------|
| **RNF** | Requisito No Funcional: propiedades de calidad del sistema. |
| **US** | Historia de Usuario (User Story): requisito funcional desde la perspectiva del usuario. |
| **Gherkin** | Lenguaje estructurado (DADO/CUANDO/ENTONCES) para escribir criterios de aceptación. |
| **BDD** | Behavior-Driven Development: metodología de desarrollo basada en comportamiento. |
| **ETA** | Estimated Time of Arrival: tiempo estimado de llegada. |

---

**Entregado por:** [Gabriela Azucena]
**Repositorio:** [https://github.com/azu97779u/taller-codigo-mudo]
**Comando de entrega:** `git commit -m "feat: requirements verified"`
