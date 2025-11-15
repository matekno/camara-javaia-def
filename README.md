# Cámara Javaia - Aplicación de Filtros

Aplicación Next.js con sistema de filtros de cámara y gestión de rondas para actividades en equipo.

## Características

- **5 Usuarios con rotaciones de colores**: ALEF, BET, GUIMEL, DALET, VAV
- **Sistema de rondas**: Cada usuario tiene una secuencia diferente de colores (Rojo, Rosa, Amarillo, Gris, Celeste)
- **Panel de administración**: Control centralizado de rondas
- **Sincronización automática**: Los clientes verifican cambios cada 20 segundos
- **Filtros de cámara en tiempo real**: Aplicación de filtros de color al video de la cámara

## Tecnologías

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- React Hooks

## Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar la base de datos

El archivo `.env` ya está configurado con las credenciales de Supabase. Verificar que contenga:

```env
DATABASE_URL="postgresql://postgres.rnjoohiwahpjlxlbxqxf:MajonGuesher@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.rnjoohiwahpjlxlbxqxf:MajonGuesher@aws-1-us-east-1.pooler.supabase.com:5432/postgres"
ADMIN_PASSWORD="MajonGuesher"
```

### 3. Inicializar Prisma y crear las tablas

```bash
npx prisma generate
npx prisma db push
```

### 4. Poblar la base de datos con los datos iniciales

```bash
npm run db:seed
```

Este comando creará:
- Los 5 usuarios (ALEF, BET, GUIMEL, DALET, VAV)
- Las rotaciones de colores para cada usuario y ronda
- El estado inicial del juego (Ronda 1)

### 5. Ejecutar la aplicación en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Uso

### Para Usuarios

1. Acceder a la página principal
2. Seleccionar el nombre de usuario del dropdown (ALEF, BET, GUIMEL, DALET, VAV)
3. Hacer clic en "Ingresar"
4. Permitir el acceso a la cámara cuando el navegador lo solicite
5. El filtro de color correspondiente a la ronda actual fue aplicado automáticamente
6. El sistema verificará cambios de ronda cada 20 segundos

### Para Administradores

1. Desde la página principal, hacer clic en "Acceder al Panel de Admin"
2. Ingresar la contraseña: `MajonGuesher`
3. Seleccionar la ronda deseada (1-5)
4. Todos los usuarios conectados recibirán el nuevo filtro automáticamente (en máximo 20 segundos)

## Estructura del Proyecto

```
camara-javaia-def/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts      # Autenticación de usuarios
│   │   │   └── admin/route.ts      # Autenticación de admin
│   │   └── game/
│   │       ├── state/route.ts      # Obtener estado del juego
│   │       └── round/route.ts      # Gestionar rondas
│   ├── admin/
│   │   └── page.tsx                # Panel de administración
│   ├── camera/
│   │   └── page.tsx                # Vista de cámara con filtros
│   ├── layout.tsx                  # Layout principal
│   ├── globals.css                 # Estilos globales
│   └── page.tsx                    # Página de login
├── lib/
│   └── prisma.ts                   # Cliente de Prisma
├── prisma/
│   ├── schema.prisma               # Schema de la base de datos
│   └── seed.js                     # Datos iniciales
├── package.json
├── tsconfig.json
└── next.config.js
```

## Schema de la Base de Datos

### GameState
- `id`: ID único
- `currentRound`: Ronda actual (1-5)
- `updatedAt`: Fecha de última actualización

### User
- `id`: ID único
- `username`: Nombre del usuario (ALEF, BET, GUIMEL, DALET, VAV)

### Rotation
- `id`: ID único
- `userId`: Referencia al usuario
- `round`: Número de ronda (1-5)
- `color`: Color para esa ronda (Rojo, Rosa, Amarillo, Gris, Celeste)

## Rotaciones de Colores

| Usuario | Ronda 1  | Ronda 2  | Ronda 3  | Ronda 4  | Ronda 5  |
|---------|----------|----------|----------|----------|----------|
| ALEF    | Rojo     | Rosa     | Amarillo | Gris     | Celeste  |
| BET     | Rosa     | Amarillo | Gris     | Celeste  | Rojo     |
| GUIMEL  | Amarillo | Gris     | Celeste  | Rojo     | Rosa     |
| DALET   | Gris     | Celeste  | Rojo     | Rosa     | Amarillo |
| VAV     | Celeste  | Rojo     | Rosa     | Amarillo | Gris     |

## Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Compilar para producción
- `npm start` - Ejecutar en modo producción
- `npm run db:push` - Sincronizar schema con la base de datos
- `npm run db:seed` - Poblar la base de datos con datos iniciales
- `npm run db:studio` - Abrir Prisma Studio para visualizar datos

## Notas

- El sistema de polling verifica cambios cada 20 segundos automáticamente
- Los permisos de cámara deben ser otorgados por el usuario
- La aplicación funciona mejor en navegadores modernos (Chrome, Firefox, Safari, Edge)
- La contraseña de admin está configurada en el archivo `.env`

