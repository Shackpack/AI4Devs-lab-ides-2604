## Context

El sistema ATS actual carece de funcionalidad para añadir candidatos manualmente. Los reclutadores necesitan una interfaz intuitiva para ingresar información de candidatos, incluyendo datos personales, educación, experiencia laboral y documentos (CVs). El sistema debe ser accesible desde diferentes dispositivos y navegadores, con validación robusta de datos y manejo adecuado de errores.

**Stakeholders:**
- Reclutadores: Usuarios primarios que necesitan añadir candidatos
- Candidatos: Cuyos datos personales serán gestionados
- Administradores del sistema: Responsables de mantener la seguridad y privacidad

**Constraints:**
- Debe ser compatible con dispositivos móviles y desktop
- Debe cumplir con regulaciones de privacidad de datos (GDPR, etc.)
- Debe integrarse con la arquitectura existente del sistema
- Debe ser accesible (WCAG 2.1 AA compliance)

## Goals / Non-Goals

**Goals:**
- Proporcionar una interfaz de usuario intuitiva para añadir candidatos
- Implementar validación completa de datos en frontend y backend
- Permitir carga de documentos (CVs) en formatos PDF y DOCX
- Asegurar la seguridad y privacidad de los datos del candidato
- Proporcionar feedback claro al usuario (confirmaciones y errores)
- Mantener compatibilidad cross-browser y responsive design

**Non-Goals:**
- Integración con LinkedIn u otras redes sociales para importar perfiles (futuro)
- Análisis automático de CVs (futuro)
- Sistema de notificaciones automáticas a candidatos (futuro)
- Búsqueda avanzada de candidatos (futuro)

## Decisions

**Frontend Framework:**
- **Decisión:** Usar React con TypeScript para el formulario de añadir candidato
- **Racional:** React proporciona componentes reutilizables, gestión de estado eficiente, y ecosistema maduro para validación de formularios. TypeScript añade type safety para reducir errores en tiempo de ejecución.
- **Alternativas consideradas:** Vue.js (menos adopción en el proyecto), Angular (más complejo para este caso de uso)

**UI Component Library:**
- **Decisión:** Usar shadcn/ui con TailwindCSS para componentes del formulario
- **Racional:** shadcn/ui proporciona componentes accesibles y personalizables que cumplen con WCAG 2.1 AA. TailwindCSS permite diseño responsive eficiente.
- **Alternativas consideradas:** Material-UI (más pesado), Chakra UI (menos flexibilidad)

**Form Validation:**
- **Decisión:** React Hook Form con Zod para validación
- **Racional:** React Hook Form es performante y minimiza re-renders. Zod proporciona validación type-safe con TypeScript. Validación en ambos lados (frontend y backend) para seguridad.
- **Alternativas consideradas:** Formik (más verboso), Yup (menos type-safe con TypeScript)

**Backend API:**
- **Decisión:** RESTful API con Node.js/Express
- **Racional:** REST es estándar, fácil de consumir desde frontend, y bien documentado. Node.js permite JavaScript full-stack.
- **Alternativas consideradas:** GraphQL (más complejo para este caso), gRPC (overkill)

**Database Schema:**
- **Decisión:** PostgreSQL con tablas separadas para candidatos y documentos
- **Racional:** PostgreSQL es robusto, soporta JSONB para datos flexibles (educación, experiencia), y tiene buen soporte para relaciones. Tablas separadas permiten mejor normalización.
- **Alternativas consideradas:** MongoDB (menos estructura), MySQL (menos features JSON)

**Document Storage:**
- **Decisión:** Almacenamiento local con sistema de archivos organizado por ID de candidato
- **Racional:** Simple de implementar inicialmente. Archivos organizados como `/uploads/candidates/{candidate_id}/cv/` para fácil acceso.
- **Alternativas consideradas:** AWS S3 (costo adicional para MVP), Cloudinary (overkill para solo CVs)

**Security:**
- **Decisión:** JWT authentication + RBAC (Role-Based Access Control)
- **Racional:** JWT es estándar para APIs REST. RBAC asegura que solo reclutadores autenticados puedan añadir candidatos. Encriptación de datos sensibles en base de datos.
- **Alternativas consideradas:** Session-based auth (menos escalable), OAuth (overkill para uso interno)

**Error Handling:**
- **Decisión:** Centralized error handling middleware con mensajes user-friendly
- **Racional:** Consistencia en respuestas de error. Mensajes claros para usuarios, logs detallados para debugging.
- **Alternativas consideradas:** Error handling por endpoint (inconsistente)

## Risks / Trade-offs

**Risks:**
- [Riesgo] Carga de archivos grandes puede causar timeouts → Mitigación: Implementar límite de tamaño (10MB), usar streaming para uploads
- [Riesgo] Validación inconsistente entre frontend y backend → Mitigación: Compartir esquemas Zod entre frontend y backend
- [Riesgo] Exposición de datos sensibles en logs → Mitigación: Sanitizar datos en logs, usar logging levels apropiados
- [Riesgo] Ataques de upload malicioso → Mitigación: Validar MIME types, escanear archivos, almacenar fuera de webroot

**Trade-offs:**
- [Trade-off] Almacenamiento local vs cloud storage → Local es más simple pero menos escalable. Se puede migrar a cloud storage cuando sea necesario.
- [Trade-off] Validación frontend vs backend → Validación frontend mejora UX pero no es suficiente para seguridad. Se requiere ambas.
- [Trade-off] Complejidad de autocompletado → Autocompletado mejora UX pero requiere datos preexistentes. Se implementará en fase posterior si es necesario.

## Migration Plan

**Deployment Steps:**
1. Crear migraciones de base de datos (tablas candidates, candidate_documents)
2. Desplegar backend con nuevos endpoints
3. Desplegar frontend con nuevo componente de formulario
4. Configurar directorios de almacenamiento de documentos
5. Actualizar documentación de API
6. Realizar pruebas de integración

**Rollback Strategy:**
- Mantener backup de base de datos antes de migración
- Feature flag para habilitar/deshabilitar funcionalidad
- Revertir migraciones de base de datos si es necesario
- Restaurar versión anterior de frontend/backend

## Open Questions

- ¿Se requiere integración con servicios de terceros para verificación de correo electrónico?
- ¿Cuál es el tamaño máximo permitido para CVs? (Propuesto: 10MB)
- ¿Se requiere historial de cambios para datos de candidatos? (Audit trail)
- ¿Se necesita integración con sistemas de CRM existentes?
- ¿Cuáles son los campos específicos obligatorios vs opcionales?
