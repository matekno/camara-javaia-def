# Cámara Javaia

Aplicación Next.js con sistema de filtros de cámara y gestión de rondas para actividades en equipo.

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno (crear archivo `.env`):
```env
DATABASE_URL="tu-url-de-base-de-datos"
ADMIN_PASSWORD="tu-contraseña-admin"
```

3. Configurar base de datos:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

4. Iniciar la aplicación:
```bash
npm run dev
```

## Tecnologías

- Next.js 14
- TypeScript
- Prisma ORM
- PostgreSQL
- React Hooks

## Características

- Sistema de 5 identidades con rotaciones de colores
- Filtros de cámara en tiempo real
- Panel de administración
- Sincronización automática cada 20 segundos
- Diseño responsive (mobile-first)
- Nombres codificados para mantener anonimato

## Estructura

```
/app
  /api        # API routes
  /admin      # Panel de administración
  /camera     # Vista de cámara con filtros
/prisma       # Schema y seed de la base de datos
/lib          # Utilidades y cliente de Prisma
```

## Deploy

La aplicación está lista para ser desplegada en Vercel. Asegurate de configurar las variables de entorno en el dashboard de Vercel.

