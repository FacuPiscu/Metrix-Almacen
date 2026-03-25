# Metrix Almacén - Frontend (React + TypeScript)

Este repositorio contiene la versión independiente del frontend para el sistema de gestión logística **Metrix Almacén**. La aplicación ha sido migrada desde un sistema basado en Laravel hacia un ecosistema moderno utilizando **React, Vite y TypeScript**, estructurada bajo los principios de **Arquitectura Limpia** (Clean Architecture).

## 🏗️ Arquitectura del Proyecto
El código fuente (`src/`) se ha diseñado priorizando la separación de responsabilidades y la escalabilidad, preparándolo para conectarse fluidamente a una API real (REST/GraphQL) en el futuro:

- **`core/domain/`** (Dominio): Define las entidades de negocio centrales del sistema (interfaces de `Usuario`, `Almacén`, `Categoría`, `Zona`, etc.), abstrayendo la aplicación de las capas externas.
- **`infrastructure/repositories/`** (Infraestructura): Contiene la capa de datos. Actualmente implementa repositorios simulados que emulan llamadas asíncronas de red para probar la interfaz visual.
- **`presentation/`** (Presentación): El corazón de React, dividido en `components/` (componentes reutilizables), `pages/` (vistas completas como el Panel de Control y Detalles de Almacén) y `hooks/` (reglas de estado global y controladores).

## 🎨 Estética y Experiencia de Usuario (UI/UX)
- Se desarrolló mediante un enfoque de **CSS Puro**, sin depender de librerías de estilos externas.
- Interfaz corporativa y profesional, utilizando fuentes nativas sobrias e iconografía vectorial moderna.
- Comportamiento 100% responsivo para monitores de escritorio (hasta 1536px) adaptándose dinámicamente según el tamaño de la pantalla.

## 🚀 Funcionalidades Logísticas Implementadas

### 1. Panel Global (Dashboard)
- Indicadores visuales y métricas de rendimiento del almacén.
- **Sistema de Puntos**: Implementación visual de "Puntos de Productividad" para incentivar buenas prácticas en el equipo de operadores.

### 2. Barra de Navegación del Sistema
- Buscador controlado e integrado.
- **Sistema de Notificaciones**: Menú desplegable dinámico.
- Etiqueta identificativa con el Rol de la sesión actual (Ej. Admin u Operador).

### 3. Operaciones de Almacén Dinámicas
Todos los formularios operativos del almacén protegen la fiabilidad de los datos limitando los errores de usuario.

- **Flujo de Ingresos (Entradas):**
  - *Pre-Aviso*: Recepta contratos adelantados.
  - *Nueva Recepción*: Captura de bultos con toma fotográfica.
  - *Almacenar*: Colocación en zonas mediante generación de código (SKU).

- **Flujo de Salidas (Despachos):**
  - *Surtido & Empaque*: **Protegidos por Control de Acceso por Roles.** Si el usuario es un 'operador', la opción aparece bloqueada indicando "Acceso Restringido", solicitando la gestión de un Administrador.
  - *Salida del Envío*: Recolección de detalles del vehículo, toma fotográfica y cuadro de firma digital para choferes.
  - *Entrega Final*: Botones de verificación para cerrar procesos logísticos.

### 4. Componentes de Rastreo y Control
- **Rastreo en Tiempo Real**: Simulación visual de un mapa logístico basado en CSS nativo, indicando la ubicación del vehículo y el tiempo estimado de llegada (ETA).
- **Historial de Movimientos (Trazabilidad)**: Una línea de tiempo horizontal detallando todos los estados por los que ha pasado un artículo.

---
*Este proyecto está documentado completamente en español y preparado para su integración del lado del servidor en la siguiente etapa operativa.*
