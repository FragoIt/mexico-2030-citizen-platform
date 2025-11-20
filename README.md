# CivicaLab - Gobernabilidad como Servicio

![CivicaLab Platform](https://img.shields.io/badge/Platform-CivicaLab-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-green)
![License](https://img.shields.io/badge/License-Proprietary-red)

## 🏛️ Overview

CivicaLab es una plataforma SaaS B2G (Business-to-Government) de "Gobernabilidad como Servicio" diseñada para municipios colombianos. La plataforma reduce costos operativos municipales mediante inteligencia ciudadana.

### Propuesta de Valor

- **Reducción de Costos**: 35% de ahorro operativo mediante reportes ciudadanos geo-referenciados
- **Mejora en Tiempos de Respuesta**: 40% más rápido en la gestión de problemas urbanos
- **Satisfacción Ciudadana**: NPS de 72 puntos
- **Transparencia**: Trazabilidad completa de reportes y acciones

## 🎯 Características Principales

### 1. Módulo Ciudadano (Experiencia Móvil)
- 📱 Interfaz móvil optimizada
- 📍 Reportes geo-referenciados automáticos
- 🏆 Sistema de gamificación con niveles de confianza
- 📸 Adjuntar evidencia fotográfica
- ✅ Feedback inmediato al enviar reportes

### 2. Dashboard Ejecutivo (War Room del Alcalde)
- 💰 Métricas de ROI en tiempo real
- 🗺️ Mapa de calor operacional
- 📊 Indicadores clave: Ahorro, Tiempo de Respuesta, NPS
- 🔴 Alertas prioritarias visuales
- 📈 Análisis de tendencias

### 3. Centro de Triaje (Gestión de Crisis)
- 📋 Tabla de reportes pendientes
- ✅ Aprobación de órdenes de trabajo
- ❌ Rechazo de reportes no procedentes
- 🔄 Actualización automática de estados
- 📍 Priorización por ubicación e impacto

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/FragoIt/mexico-2030-citizen-platform.git

# Navegar al directorio
cd mexico-2030-citizen-platform

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

### Build para Producción

```bash
# Crear build de producción
npm run build

# Previsualizar build
npm run preview
```

## 🎨 Stack Tecnológico

- **Frontend**: React 18
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS (CDN)
- **Iconos**: Lucide React
- **Estado**: React Hooks (useState)
- **Arquitectura**: Offline-First (Simulación)

## 📱 Demo en Vivo

### Modo de Presentación

La aplicación incluye un botón flotante **"Cambiar Rol (Demo)"** que permite al presentador alternar instantáneamente entre:

1. **Vista Ciudadano** 📱: Simulación de app móvil
2. **Vista Alcalde** 🏛️: Dashboard ejecutivo completo

Esta funcionalidad es ideal para presentaciones ante:
- Juntas Directivas
- Alcaldes y Secretarios
- Inversionistas
- Stakeholders gubernamentales

## 🏙️ Contexto: Municipio de Rionegro, Antioquia

Los datos de demostración están basados en un municipio real colombiano:

- **Ubicación**: Rionegro, Antioquia
- **Categorías**: Malla Vial, Alumbrado Público, Arborización, Seguridad, Aseo
- **Secretarías**: Infraestructura, Obras Públicas, Medio Ambiente

### Categorías de Reportes

| Categoría | Descripción | Secretaría Responsable |
|-----------|-------------|------------------------|
| 🚧 Malla Vial | Baches, pavimento, señalización | Secretaría de Infraestructura |
| 💡 Alumbrado Público | Postes, luminarias | Secretaría de Servicios Públicos |
| 🌳 Arborización | Árboles, zonas verdes, parques | Secretaría de Medio Ambiente |
| 🛡️ Seguridad | Vigilancia, emergencias | Secretaría de Gobierno |
| 🗑️ Aseo | Recolección de basuras, limpieza | Secretaría de Servicios Públicos |

## 💼 Casos de Uso

### Para el Ciudadano
1. Detecta un problema urbano (bache, luz apagada, etc.)
2. Abre la app CivicaLab
3. Selecciona categoría
4. Describe el problema
5. La app detecta su ubicación automáticamente
6. Recibe confirmación inmediata con número de reporte
7. Puede hacer seguimiento del estado

### Para el Funcionario
1. Accede al Dashboard Ejecutivo
2. Visualiza métricas de ROI y eficiencia
3. Observa el mapa de calor con todos los reportes
4. Revisa la tabla de triaje
5. Aprueba órdenes de trabajo prioritarias
6. El sistema actualiza métricas en tiempo real

## 📊 Métricas de Impacto (Simuladas)

- **Ahorro Operativo Mensual**: $45.2M COP
- **Tiempo de Respuesta Promedio**: 2.5 días (↓ 40%)
- **Satisfacción Ciudadana (NPS)**: 72 puntos
- **Reportes Procesados**: 1,026+
- **Tasa de Resolución**: 75%

## 🔒 Seguridad y Privacidad

- Los datos son simulados para la demo
- Arquitectura Offline-First (sin backend en MVP)
- En producción se implementaría:
  - Autenticación de usuarios
  - Encriptación de datos sensibles
  - Auditoría completa de acciones
  - GDPR/Ley de Protección de Datos compliance

## 🛠️ Desarrollo y Contribución

### Estructura del Proyecto

```
civicalab-platform/
├── src/
│   ├── App.jsx          # Componente principal con toda la lógica
│   └── main.jsx         # Punto de entrada de React
├── index.html           # HTML principal con CDN de Tailwind
├── package.json         # Dependencias y scripts
├── vite.config.js       # Configuración de Vite
└── README.md           # Este archivo
```

### Principios de Diseño

- **Corporativa, Limpia y Autoritaria**: Paleta Slate + Royal Blue + Emerald
- **Mobile-First**: Experiencia ciudadana optimizada para móvil
- **Data-Driven**: Métricas ROI visibles en todo momento
- **Real-Time**: Actualización instantánea entre vistas

## 📞 Contacto

Para más información sobre CivicaLab:

- **Email**: info@civicalab.co
- **Web**: www.civicalab.co
- **Teléfono**: +57 (4) 444-4444

---

**Desarrollado con ❤️ para mejorar la gobernanza municipal en Colombia**
