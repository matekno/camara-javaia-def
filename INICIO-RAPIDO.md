# 🚀 Inicio Rápido - Cámara Javaia

## Opción 1: Configuración Automática (Recomendado)

Ejecutar un solo comando:

```bash
npm run setup
```

Este comando automáticamente:
- ✅ Instalará todas las dependencias
- ✅ Configurará Prisma
- ✅ Creará las tablas en la base de datos
- ✅ Poblará los datos iniciales

## Opción 2: Configuración Manual

Ejecutar estos comandos en orden:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
```

---

## Iniciar la Aplicación

Una vez completada la configuración:

```bash
npm run dev
```

Abrir el navegador en: **http://localhost:3000**

---

## Accesos

### 👥 Usuarios
- ALEF
- BET
- GUIMEL
- DALET
- VAV

### 🔐 Administrador
**Contraseña:** `MajonGuesher`

---

## ¿Qué hace cada usuario?

1. **Login**: Seleccionar nombre de usuario
2. **Permitir cámara**: Aceptar permisos del navegador
3. **Ver filtro**: El color correspondiente a la ronda actual fue aplicado
4. **Esperar cambios**: Cada 20 segundos el sistema verifica si cambió la ronda

## ¿Qué hace el administrador?

1. **Acceder al panel**: Click en "Acceder al Panel de Admin"
2. **Login**: Ingresar contraseña `MajonGuesher`
3. **Cambiar ronda**: Click en botón de ronda (1-5)
4. **Los usuarios se actualizan**: En máximo 20 segundos verán el nuevo filtro

---

## Rotaciones de Colores

| Usuario | R1       | R2       | R3       | R4       | R5       |
|---------|----------|----------|----------|----------|----------|
| ALEF    | Rojo     | Rosa     | Amarillo | Gris     | Celeste  |
| BET     | Rosa     | Amarillo | Gris     | Celeste  | Rojo     |
| GUIMEL  | Amarillo | Gris     | Celeste  | Rojo     | Rosa     |
| DALET   | Gris     | Celeste  | Rojo     | Rosa     | Amarillo |
| VAV     | Celeste  | Rojo     | Rosa     | Amarillo | Gris     |

---

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar en modo desarrollo |
| `npm run build` | Compilar para producción |
| `npm run db:studio` | Ver base de datos (Prisma Studio) |
| `npm run db:seed` | Repoblar datos (si es necesario) |

---

## 🆘 Problemas Comunes

### "Cannot find module"
**Solución:** Ejecutar `npm install`

### "Error connecting to database"
**Solución:** Verificar que el archivo `.env` existe y tiene las credenciales correctas

### La cámara no se activa
**Solución:** 
- Verificar permisos del navegador
- Usar Chrome o Firefox
- Asegurarse que ninguna otra app usa la cámara

### Los cambios no se ven
**Solución:**
- Esperar hasta 20 segundos (tiempo de polling)
- Refrescar la página manualmente
- Verificar en `npm run db:studio` que la ronda cambió

---

## 📁 Archivos Importantes

- **`.env`** - Credenciales de base de datos
- **`prisma/schema.prisma`** - Estructura de la base de datos
- **`prisma/seed.js`** - Datos iniciales
- **`app/camera/page.tsx`** - Vista de cámara con filtros
- **`app/admin/page.tsx`** - Panel de administración

---

## 🎯 Flujo Completo

```
1. Usuario selecciona su nombre → Login
2. Sistema obtiene ronda actual de la base de datos
3. Usuario ve su cámara con el filtro correspondiente
4. Admin cambia la ronda desde el panel
5. Cada 20 segundos, usuarios verifican la ronda actual
6. Si cambió, el filtro fue actualizado automáticamente
```

---

**¡Listo para comenzar! 🎉**

