# Especificación de Requisitos de Software (SRS)
## Sistema de Control de Inventario - Tienda Local

**Versión:** 1.0  
**Fecha:** 15 de julio de 2026  
**Autor:** Gabriela Azucena  
**Estado:** Aprobado  
**Repositorio:** [https://github.com/azu97779u/taller-codigo-mudo/tree/main]

---

## 1. Alcance y Fronteras del Software

### 1.1. Propósito del Sistema
El Sistema de Control de Inventario tiene como propósito proporcionar una plataforma web que permita a los empleados y administradores de una tienda local gestionar eficientemente el registro de productos, el control de existencias y la generación de alertas de stock bajo, garantizando la trazabilidad y precisión de los datos del inventario.

### 1.2. Inclusiones (Qué SÍ hará el sistema)
- Registrar, editar y eliminar productos en el inventario.
- Controlar las existencias de productos en tiempo real.
- Generar alertas automáticas cuando el stock de un producto sea inferior a 5 unidades.
- Validar códigos de barra bajo el estándar de El Salvador (EAN-13 con prefijo 741).
- Generar reportes de inventario en formato PDF.
- Autenticar usuarios con roles de Administrador y Empleado.
- Registrar historial de movimientos de inventario (entradas y salidas).
- Buscar productos por nombre, código de barra o categoría.

### 1.3. Exclusiones (Qué NO hará el sistema)
- No gestionará transacciones financieras ni pagos (facturación, cobros, etc.).
- No se integrará con sistemas contables externos.
- No manejará ventas en línea o comercio electrónico.
- No incluirá módulo de gestión de clientes o proveedores en esta fase.
- No soportará múltiples sucursales o sedes.

---

## 2. Actores del Sistema (User Personas)

### 2.1. Administrador de Tienda
- **Descripción:** Persona encargada de la gestión integral del inventario.
- **Permisos:**
  - CRUD completo de productos.
  - Configuración de umbrales de alerta de stock.
  - Generación de reportes.
  - Gestión de usuarios (crear/desactivar empleados).
  - Visualización de historial completo de movimientos.

### 2.2. Empleado de Tienda
- **Descripción:** Personal operativo que maneja el inventario diario.
- **Permisos:**
  - Registrar productos.
  - Actualizar existencias (entradas/salidas).
  - Consultar productos y disponibilidad.
  - Visualizar alertas de stock bajo.
  - Buscar productos por código de barra.

### 2.3. Cliente (Invitado) - Opcional
- **Descripción:** Persona que consulta disponibilidad de productos.
- **Permisos:**
  - Solo consulta de productos (sin modificar inventario).
  - Visualización de catálogo público.

---

## 3. Restricciones Tecnológicas Obligatorias

### 3.1. Base de Datos
- **Sistema:** PostgreSQL
- **Versión:** 15.x o superior
- **Justificación:** Requerimiento obligatorio del cliente (ya cuentan con el servidor configurado).
- **Esquema sugerido:** 
  - Tabla `usuarios` (id, nombre, email, contraseña, rol)
  - Tabla `productos` (id, nombre, descripción, precio, cantidad, codigo_barra, categoria, umbral_minimo)
  - Tabla `movimientos` (id, producto_id, tipo_movimiento, cantidad, fecha, usuario_id)

### 3.2. Lenguajes y Frameworks
- **Backend:** 
  - Node.js con Express.js (recomendado) o Python con Django/Flask.
- **Frontend:**
  - React.js, Angular o Vue.js (SPA - Single Page Application).
  - HTML5, CSS3, JavaScript (ES6+).
- **ORM:** Sequelize (Node.js) o SQLAlchemy (Python).
- **Autenticación:** JSON Web Tokens (JWT) para sesiones de usuario.

### 3.3. Compatibilidad
- **Navegadores:** Google Chrome (últimas 2 versiones), Mozilla Firefox (últimas 2 versiones), Microsoft Edge (últimas 2 versiones).
- **Dispositivos:** Diseño responsive compatible con desktop, tablet y móvil.
- **Conexión:** Funcionamiento óptimo con conexiones a internet de 3 Mbps o superior.

---

## 4. Requisitos de Calidad (Basados en IEEE 830)

| ID | Categoría | Descripción | Métrica de Aceptación |
|----|-----------|-------------|----------------------|
| RNF-01 | **Rendimiento** | El sistema debe procesar consultas de inventario en menos de 2 segundos | Pruebas de carga con 100 usuarios concurrentes; latencia < 2s en el 95% de las peticiones |
| RNF-02 | **Seguridad** | Autenticación mediante JWT con expiración de 8 horas; contraseñas hasheadas con bcrypt (salt factor 10) | Auditoría de seguridad; cumplimiento de OWASP Top 10 |
| RNF-03 | **Disponibilidad** | 99.5% de uptime mensual (excluyendo mantenimientos programados) | Monitoreo con herramientas como UptimeRobot o Pingdom |
| RNF-04 | **Usabilidad** | Interfaz intuitiva con colores de alto contraste; diseño responsive; tiempo de aprendizaje < 10 minutos | Pruebas de usabilidad con 5 usuarios reales; tasa de éxito > 90% |
| RNF-05 | **Mantenibilidad** | Código documentado con JSDoc/JavaDoc; sigue estándares de estilo (ESLint/PEP 8); cobertura de pruebas > 80% | Revisión de código; pruebas automatizadas con Jest/PyTest |
| RNF-06 | **Portabilidad** | Debe ser desplegable en servidores Linux (Ubuntu 22.04) y Windows Server | Pruebas de instalación en ambos entornos |
| RNF-07 | **Integridad de Datos** | Integridad referencial en PostgreSQL; validación de código de barra en backend y frontend | Pruebas de inserción con datos inválidos |

---

## 5. Requisitos Funcionales (Historias de Usuario)

### US-01: Gestión de Productos
- **COMO:** Empleado de tienda
- **QUIERO:** Registrar, editar y eliminar productos en el inventario
- **PARA:** mantener actualizado el catálogo de la tienda con información precisa y disponible

#### Criterios de Aceptación (Gherkin)

**Escenario 1: Registrar producto exitosamente**
- **DADO** que el empleado ha iniciado sesión en el sistema
- **Y** tiene permisos de empleado
- **CUANDO** ingresa el nombre, descripción, precio, cantidad y código de barra del producto
- **Y** el código de barra cumple con el estándar de El Salvador (EAN-13 con prefijo 741)
- **ENTONCES** el sistema guarda el producto en la base de datos PostgreSQL
- **Y** muestra un mensaje de confirmación: "Producto registrado exitosamente"

**Escenario 2: Validación de código de barra inválido**
- **DADO** que el empleado está en el formulario de registro de productos
- **CUANDO** ingresa un código de barra que no cumple con el estándar de El Salvador
- **ENTONCES** el sistema muestra un mensaje de error: "Código de barra inválido. Debe ser EAN-13 con prefijo 741"
- **Y** no permite guardar el producto

**Escenario 3: Editar producto existente**
- **DADO** que el empleado selecciona un producto existente con ID #001
- **CUANDO** modifica el precio de $10.00 a $12.50
- **Y** hace clic en "Actualizar"
- **ENTONCES** el sistema actualiza la información del producto
- **Y** muestra un mensaje: "Producto actualizado correctamente"

**Escenario 4: Eliminar producto**
- **DADO** que el empleado selecciona un producto existente
- **CUANDO** confirma la acción de eliminar
- **ENTONCES** el sistema elimina el producto de la base de datos
- **Y** muestra un mensaje de confirmación: "Producto eliminado"

---

### US-02: Control de Existencias
- **COMO:** Empleado de tienda
- **QUIERO:** Actualizar las cantidades de productos cuando se realicen ventas o compras
- **PARA:** mantener un control estricto del inventario en tiempo real y evitar sobreventas

#### Criterios de Aceptación (Gherkin)

**Escenario 1: Descontar existencias por venta**
- **DADO** que el producto "Camisa Roja" tiene 10 unidades disponibles en inventario
- **CUANDO** el empleado registra una venta de 3 unidades del producto
- **ENTONCES** el sistema descuenta automáticamente 3 unidades del inventario
- **Y** actualiza el stock a 7 unidades en la base de datos
- **Y** registra el movimiento en el historial (tipo: "salida", cantidad: 3, fecha, usuario)

**Escenario 2: Aumentar existencias por compra (reabastecimiento)**
- **DADO** que el producto "Zapatos Negros" tiene 5 unidades disponibles
- **CUANDO** el empleado registra una compra de 20 unidades del producto
- **ENTONCES** el sistema suma 20 unidades al inventario
- **Y** actualiza el stock a 25 unidades
- **Y** registra el movimiento en el historial (tipo: "entrada", cantidad: 20, fecha, usuario)

**Escenario 3: Evitar venta sin stock suficiente**
- **DADO** que el producto "Zapatos Negros" tiene 2 unidades disponibles en inventario
- **CUANDO** el empleado intenta vender 5 unidades del producto
- **ENTONCES** el sistema bloquea la operación
- **Y** muestra un mensaje de error: "Stock insuficiente. Solo hay 2 unidades disponibles"
- **Y** no actualiza el inventario

**Escenario 4: Registrar movimiento con código de barra**
- **DADO** que el empleado escanea el código de barra de un producto
- **CUANDO** el sistema reconoce el código EAN-13 válido (prefijo 741)
- **ENTONCES** el sistema busca el producto automáticamente
- **Y** muestra la información del producto para actualizar existencias

---

### US-03: Alertas de Stock Bajo
- **COMO:** Administrador de tienda
- **QUIERO:** Recibir notificaciones cuando un producto tenga menos de 5 unidades en inventario (umbral configurable)
- **PARA:** tomar acciones preventivas de reabastecimiento a tiempo y evitar desabastecimiento

#### Criterios de Aceptación (Gherkin)

**Escenario 1: Alerta automática por stock bajo**
- **DADO** que el producto "Leche" tiene 4 unidades en inventario
- **Y** el umbral mínimo configurado es 5 unidades
- **CUANDO** se actualiza el inventario (venta o ajuste)
- **ENTONCES** el sistema genera una alerta visible en el panel de control del administrador
- **Y** envía una notificación por correo electrónico al administrador
- **Y** la alerta muestra: "El producto 'Leche' tiene solo 4 unidades. ¡Reabastecer!"

**Escenario 2: No generar alerta cuando stock está sobre el umbral**
- **DADO** que el producto "Azúcar" tiene 10 unidades en inventario
- **Y** el umbral mínimo configurado es 5 unidades
- **CUANDO** se realiza una venta de 2 unidades (quedan 8 unidades)
- **ENTONCES** el sistema NO genera ninguna alerta
- **Y** el inventario se actualiza sin notificaciones

**Escenario 3: Configurar umbral personalizado**
- **DADO** que el administrador está en el panel de configuración
- **CUANDO** cambia el umbral mínimo global de 5 a 10 unidades
- **Y** guarda los cambios
- **ENTONCES** todas las alertas futuras se dispararán cuando el stock sea menor a 10 unidades

---

### US-04: Reportes de Inventario
- **COMO:** Administrador de tienda
- **QUIERO:** Generar reportes de inventario en formato PDF con opciones de filtro
- **PARA:** tomar decisiones de compra, analizar el rendimiento de productos y mantener registros históricos

#### Criterios de Aceptación (Gherkin)

**Escenario 1: Generar reporte general de inventario**
- **DADO** que el administrador está en el panel de reportes
- **CUANDO** selecciona "Generar Reporte de Inventario"
- **Y** elige el formato PDF
- **ENTONCES** el sistema genera un archivo PDF que incluye:
  - Lista de todos los productos
  - Cantidades disponibles en stock
  - Precios unitarios
  - Códigos de barra
  - Productos con stock bajo resaltados en color rojo
  - Fecha y hora de generación
- **Y** permite descargar el archivo automáticamente

**Escenario 2: Generar reporte por categoría**
- **DADO** que el administrador está en el panel de reportes
- **CUANDO** selecciona la categoría "Electrónicos"
- **Y** hace clic en "Generar Reporte"
- **ENTONCES** el sistema genera un PDF con todos los productos de la categoría "Electrónicos"
- **Y** muestra solo la información de esa categoría

**Escenario 3: Generar reporte de productos con stock bajo**
- **DADO** que el administrador está en el panel de reportes
- **CUANDO** selecciona la opción "Productos con Stock Bajo"
- **ENTONCES** el sistema genera un PDF con todos los productos que están por debajo del umbral configurado
- **Y** muestra la cantidad faltante para alcanzar el umbral

---

### US-05: Autenticación y Gestión de Usuarios
- **COMO:** Administrador de tienda
- **QUIERO:** Gestionar los usuarios del sistema y controlar sus permisos
- **PARA:** garantizar la seguridad de la información y asignar responsabilidades adecuadas

#### Criterios de Aceptación (Gherkin)

**Escenario 1: Inicio de sesión exitoso**
- **DADO** que el usuario tiene una cuenta registrada
- **CUANDO** ingresa su correo electrónico y contraseña correctos
- **ENTONCES** el sistema genera un token JWT
- **Y** redirige al dashboard correspondiente según su rol (Administrador o Empleado)

**Escenario 2: Inicio de sesión fallido**
- **DADO** que el usuario tiene una cuenta registrada
- **CUANDO** ingresa una contraseña incorrecta
- **ENTONCES** el sistema muestra un mensaje de error: "Credenciales inválidas"
- **Y** no permite el acceso al sistema

**Escenario 3: Registro de nuevo empleado (solo administrador)**
- **DADO** que el administrador está logueado
- **CUANDO** registra un nuevo empleado con nombre, correo, contraseña y rol "empleado"
- **ENTONCES** el sistema crea el nuevo usuario en la base de datos
- **Y** envía un correo de bienvenida al nuevo empleado

**Escenario 4: Desactivar usuario (solo administrador)**
- **DADO** que el administrador selecciona un empleado existente
- **CUANDO** hace clic en "Desactivar Usuario"
- **ENTONCES** el sistema desactiva la cuenta del empleado
- **Y** el empleado ya no puede iniciar sesión

---

## 6. Matriz de Trazabilidad

La matriz de trazabilidad permite rastrear cada requisito desde su origen (Historia de Usuario) hasta su implementación en código y pruebas de QA.

| ID Requisito | Historia de Usuario | Componente Código | ID Prueba QA | Estado |
|--------------|---------------------|-------------------|--------------|--------|
| REQ-001 | US-01 (Gestión de Productos) | `productController.js` - Método `createProduct()` | TC-101 (Registro exitoso) | Pendiente |
| REQ-002 | US-01 (Gestión de Productos) | `productController.js` - Método `validateBarCode()` | TC-102 (Validación código inválido) | Pendiente |
| REQ-003 | US-01 (Gestión de Productos) | `productController.js` - Método `updateProduct()` | TC-103 (Edición de producto) | Pendiente |
| REQ-004 | US-01 (Gestión de Productos) | `productController.js` - Método `deleteProduct()` | TC-104 (Eliminación de producto) | Pendiente |
| REQ-005 | US-02 (Control de Existencias) | `inventoryService.js` - Método `updateStock()` | TC-201 (Descuento por venta) | Pendiente |
| REQ-006 | US-02 (Control de Existencias) | `inventoryService.js` - Método `validateStock()` | TC-202 (Validación stock insuficiente) | Pendiente |
| REQ-007 | US-02 (Control de Existencias) | `inventoryService.js` - Método `increaseStock()` | TC-203 (Reabastecimiento por compra) | Pendiente |
| REQ-008 | US-02 (Control de Existencias) | `barcodeService.js` - Método `scanBarcode()` | TC-204 (Escaneo de código de barra) | Pendiente |
| REQ-009 | US-03 (Alertas de Stock Bajo) | `alertService.js` - Método `checkLowStock()` | TC-301 (Alerta automática) | Pendiente |
| REQ-010 | US-03 (Alertas de Stock Bajo) | `configService.js` - Método `setThreshold()` | TC-302 (Configuración de umbral) | Pendiente |
| REQ-011 | US-04 (Reportes de Inventario) | `reportGenerator.js` - Método `generatePDF()` | TC-401 (Generación de PDF) | Pendiente |
| REQ-012 | US-04 (Reportes de Inventario) | `reportGenerator.js` - Método `filterByCategory()` | TC-402 (Reporte por categoría) | Pendiente |
| REQ-013 | US-05 (Autenticación) | `authController.js` - Método `login()` | TC-501 (Login exitoso) | Pendiente |
| REQ-014 | US-05 (Autenticación) | `authController.js` - Método `validateCredentials()` | TC-502 (Login fallido) | Pendiente |
| REQ-015 | US-05 (Autenticación) | `userController.js` - Método `registerUser()` | TC-503 (Registro de empleado) | Pendiente |

---

## 7. Criterios de Rechazo de Requisitos (IEEE 830)

Un requisito será **rechazado** y no incluido en el SRS si presenta alguna de las siguientes características:

### 7.1. No verificable
No existe un método finito y económico para probar que el requisito se cumple.

| ❌ Incorrecto | ✅ Correcto |
|---------------|-------------|
| "El sistema debe ser rápido" | "El sistema debe responder en menos de 2 segundos para el 95% de las peticiones" |
| "La interfaz debe ser amigable" | "El tiempo de aprendizaje del usuario debe ser menor a 10 minutos; tasa de éxito > 90% en pruebas de usabilidad" |

### 7.2. No alcanzable
Técnicamente imposible con los recursos actuales (presupuesto, tiempo, tecnología).

| ❌ Incorrecto | ✅ Correcto |
|---------------|-------------|
| "El sistema debe procesar 1,000,000 de transacciones por segundo" | "El sistema debe procesar 100 transacciones por segundo (pico máximo esperado)" |
| "El sistema debe predecir la demanda con 100% de precisión" | "El sistema debe generar reportes históricos para análisis de tendencias" |

### 7.3. Ambiguo
Puede interpretarse de múltiples maneras diferentes.

| ❌ Incorrecto | ✅ Correcto |
|---------------|-------------|
| "El sistema debe cargar las imágenes de inmediato" | "El sistema debe renderizar recursos multimedia de hasta 5MB en menos de 1.5 segundos bajo conexiones 4G estándar (10 Mbps)" |
| "El sistema debe notificar al usuario" | "El sistema debe enviar una notificación por correo electrónico dentro de los 5 minutos posteriores al evento" |

### 7.4. Incompleto
Faltan detalles esenciales para su implementación.

| ❌ Incorrecto | ✅ Correcto |
|---------------|-------------|
| "El sistema debe gestionar productos" | "El sistema debe permitir registrar, editar, eliminar y consultar productos con los campos: nombre, descripción, precio, cantidad, código de barra y categoría" |

---

## 8. Aprobación Formal (Sign-off)

Una vez redactado el documento, se realizará una sesión de **Sign-off** (Aprobación Formal) donde el cliente y el equipo técnico validarán el contenido.

| Rol | Nombre | Fecha de Aprobación | Firma |
|-----|--------|---------------------|-------|
| **Cliente** | [Nombre del cliente] | 15/07/2026 | [Firma digital] |
| **Líder Técnico** | Gabriela Azucena | 15/07/2026 | [Firma digital] |
| **Equipo QA** | Gabriela Azucena | 15/07/2026 | [Firma digital] |
| **Product Owner** | Gabriela Azucena | 15/07/2026 | [Firma digital] |

**Nota importante:** Cualquier requisito solicitado después de la aprobación se considera un **Cambio de Alcance (Change Request)** y deberá gestionarse mediante un proceso formal de evaluación de impacto (costo, tiempo, recursos).

---

## 9. Glosario de Términos

| Término | Definición |
|---------|------------|
| **SRS** | Software Requirements Specification (Especificación de Requisitos de Software). Documento formal que describe los requisitos del sistema. |
| **IEEE 830** | Estándar internacional para la elaboración de SRS, establecido por el Instituto de Ingenieros Eléctricos y Electrónicos. |
| **RNF** | Requisito No Funcional. Propiedades de calidad del sistema (seguridad, rendimiento, usabilidad, etc.). |
| **US** | Historia de Usuario (User Story). Requisito funcional escrito desde la perspectiva del usuario. |
| **Gherkin** | Lenguaje estructurado (DADO/CUANDO/ENTONCES) para escribir criterios de aceptación en BDD (Behavior-Driven Development). |
| **Código de barra El Salvador** | Estándar EAN-13 con prefijo 741 (asignado por GS1 a El Salvador para identificación de productos). |
| **PostgreSQL** | Sistema de gestión de bases de datos relacional open-source, requerido por el cliente. |
| **JWT** | JSON Web Token. Mecanismo de autenticación basado en tokens firmados digitalmente. |
| **bcrypt** | Biblioteca de hashing de contraseñas que incluye un "salt" para protección contra ataques de fuerza bruta. |
| **Trazabilidad** | Capacidad de rastrear un requisito desde su origen (cliente) hasta su implementación en código y pruebas de QA. |
| **ORM** | Object-Relational Mapping. Técnica que permite interactuar con la base de datos usando objetos en lugar de consultas SQL directas. |
| **BDD** | Behavior-Driven Development. Metodología de desarrollo ágil basada en el comportamiento esperado del sistema. |
| **EAN-13** | European Article Number. Estándar internacional de códigos de barra de 13 dígitos. |

---

## 10. Historial de Cambios

| Versión | Fecha | Autor | Descripción de Cambios |
|---------|-------|-------|------------------------|
| 1.0 | 15/07/2026 | Gabriela Azucena | Versión inicial del SRS Ligero aprobada |
| [x.x] | [Fecha] | [Autor] | [Descripción del cambio] |

---

**Fin del Documento**

---

## 📋 Instrucciones de Uso

1. Reemplaza `[Ramon]` y `[https://github.com/azu97779u/taller-codigo-mudo/tree/main]` con la información real de tu proyecto.
2. Ajusta las tecnologías según la decisión del equipo (Node.js + React, Python + Django, etc.).
3. Agrega o modifica Historias de Usuario según sea necesario.
4. Completa la Matriz de Trazabilidad a medida que avance el desarrollo.
5. Sube el archivo a la raíz de tu repositorio en GitHub.

¡Este documento cumple con el estándar IEEE 830 adaptado a metodologías ágiles y está listo para ser aprobado! 🚀
