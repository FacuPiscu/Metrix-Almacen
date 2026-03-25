# Metrix Almacén - Frontend (React + TypeScript)

Este repositorio contiene la versión independiente (standalone) del frontend para el sistema de gestión logística **Metrix Almacén**. La aplicación ha sido migrada desde un monolito basado en Laravel hacia un ecosistema moderno utilizando **React, Vite y TypeScript**, estructurada bajo los principios de **Clean Architecture**.

## 🏗️ Arquitectura del Proyecto (Clean Architecture)
El código fuente (`src/`) se ha diseñado priorizando la separación de responsabilidades y la escalabilidad, preparándolo para conectarse fluidamente a una API real (REST/GraphQL) en el futuro:

- **`core/domain/`**: Define las entidades de negocio centrales del sistema (interfaces de `User`, `Warehouse`, `Category`, `Zone`, etc.), abstrayendo la aplicación de las capas externas.
- **`infrastructure/repositories/`**: Contiene la capa de datos. Actualmente implementa repositorios simulados (*Mock Repositories* como `MockAuthRepository` y `MockWarehouseRepository`) que emulan llamadas asíncronas de red (`Promise` y `setTimeout`).
- **`presentation/`**: El corazón de React, dividido en `components/` (componentes reusables), `pages/` (vistas de ruta completa como Dashboard y WarehouseDetail) y `hooks/` (reglas de estado global y controladores).

## 🎨 Estética y Experiencia de Usuario (UI/UX)
- Se removió la dependencia de frameworks acoplados como TailwindCSS en favor de un enfoque **Puro de CSS**.
- Interfaz corporativa y "Premium", utilizando fuentes nativas sobrias (tipo *Segoe UI*), botones táctiles de superficie amplia e Iconografía Vectorial moderna mediante **Lucide React**.
- Comportamiento 100% responsivo para consolas de escritorio, con limitación de ancho de ultra-visión a 1536px, y fluidez (`flex-wrap`) para pantallas a partir de 1024px.

## 🚀 Funcionalidades Logísticas Principales Implementadas

### 1. Panel Global (Dashboard)
- Indicadores visuales y KPIs del rendimiento del almacén.
- **Sistema de Gamificación**: Implementación visual de "Puntos de Productividad" para incentivar métricas saludables en el equipo de operadores logísticos.

### 2. Barra de Navegación del Sistema (Navbar)
- Buscador controlado e integrado (simulación frontal).
- **Sistema de Notificaciones**: Dropdown dinámico.
- Badge identificativa con el Rol del de sesión actual recuperado a través del contexto de Auth.

### 3. Operaciones de Almacén Dinámicas (`WarehouseDetail`)
Todos los formularios operativos del almacén funcionan con **Estados Estrictamente Controlados** (`useState` vinculado a `value` y `onChange`), protegiendo la fiabilidad de captura de datos antes del envío a la base de datos.

- **Flujo Inbound (Ingresos):**
  - *Pre-Aviso*: Captura de contratos adelantados.
  - *Nueva Recepción*: Captura de bultos con simulación de fotografías en andén.
  - *Almacenar*: Colocación definitiva del lote en zonas mediante generación de SKU dinámico.

- **Flujo Outbound (Salidas):**
  - *Surtido & Empaque (Picking)*: **Protegidos por RBAC (Role-Based Access Control).** El botón principal reacciona con un bloqueo visual ("Acceso Restringido") si el rol pertenece exclusivamente a 'operador', solicitando la autorización de un nivel gerencial (Admin).
  - *Salida del Envío (Despacho)*: Recolección de Flotilla, toma fotográfica y cuadro preconstruido para firmas nativas.
  - *Entrega Final*: Botones de éxito para clausurar y archivar flujos.

### 4. Componentes Premium de Rastreo (Tracking)
- **Rastreo en Tiempo Real (`LiveTracking`)**: Simulación visual de un mapa logístico basado en CSS nativo (cuadrícula geográfica simulada en *grid*) con un camión enviando *pings* al servidor y una tarjeta flotante proporcionando la ETA del vehículo.
- **Historial de Movimientos (`ItemTraceability`)**: Una línea de tiempo horizontal detallando la biografía del paso de cada artículo sobre los flujos (inbound -> picking -> en ruta).

---
*Este proyecto está preparado para su integración backend en la siguiente fase de desarrollo.*
