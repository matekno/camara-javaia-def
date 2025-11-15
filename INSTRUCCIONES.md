# Instrucciones de Configuración

## Paso a Paso para Iniciar la Aplicación

### 1. Instalar dependencias

Ejecutar en la terminal:

```bash
npm install
```

### 2. Generar el cliente de Prisma

```bash
npx prisma generate
```

### 3. Crear las tablas en la base de datos

```bash
npx prisma db push
```

### 4. Poblar la base de datos con los datos iniciales

```bash
npm run db:seed
```

Esto creará:
- Estado del juego inicial (Ronda 1)
- Los 5 usuarios: ALEF, BET, GUIMEL, DALET, VAV
- Todas las rotaciones de colores para cada usuario

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

### 6. Abrir el navegador

Acceder a: http://localhost:3000

---

## Flujo de Uso

### Usuarios Regulares

1. **Login**: Seleccionar usuario del dropdown (ALEF, BET, GUIMEL, DALET, VAV)
2. **Cámara**: Permitir acceso a la cámara
3. **Filtro**: El filtro correspondiente a la ronda actual fue aplicado automáticamente
4. **Actualización**: Cada 20 segundos el sistema verifica si cambió la ronda

### Administrador

1. **Acceder**: Hacer clic en "Acceder al Panel de Admin" desde la página principal
2. **Login**: Ingresar contraseña: `MajonGuesher`
3. **Cambiar Ronda**: Hacer clic en el botón de la ronda deseada (1-5)
4. **Efecto**: Todos los usuarios verán el cambio en máximo 20 segundos

---

## Verificar la Base de Datos

Para visualizar los datos en la base de datos:

```bash
npm run db:studio
```

Esto abrirá Prisma Studio en el navegador donde se podrán ver todas las tablas y datos.

---

## Troubleshooting

### No se puede conectar a la base de datos

Verificar que el archivo `.env` contenga las credenciales correctas:

```env
DATABASE_URL="postgresql://postgres.rnjoohiwahpjlxlbxqxf:MajonGuesher@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.rnjoohiwahpjlxlbxqxf:MajonGuesher@aws-1-us-east-1.pooler.supabase.com:5432/postgres"
```

### La cámara no funciona

- Verificar que el navegador tenga permisos para acceder a la cámara
- Probar en modo HTTPS (requerido en algunos navegadores)
- Verificar que no haya otra aplicación usando la cámara

### Los cambios de ronda no se reflejan

- Verificar que el polling esté funcionando (cada 20 segundos)
- Refrescar la página del usuario manualmente
- Verificar en Prisma Studio que la ronda se actualizó en la base de datos

---

## Estructura de Rotaciones

| Usuario | Ronda 1  | Ronda 2  | Ronda 3  | Ronda 4  | Ronda 5  |
|---------|----------|----------|----------|----------|----------|
| ALEF    | Rojo     | Rosa     | Amarillo | Gris     | Celeste  |
| BET     | Rosa     | Amarillo | Gris     | Celeste  | Rojo     |
| GUIMEL  | Amarillo | Gris     | Celeste  | Rojo     | Rosa     |
| DALET   | Gris     | Celeste  | Rojo     | Rosa     | Amarillo |
| VAV     | Celeste  | Rojo     | Rosa     | Amarillo | Gris     |

---

## Comandos Útiles

- `npm run dev` - Modo desarrollo
- `npm run build` - Compilar para producción
- `npm start` - Ejecutar en producción
- `npm run db:push` - Sincronizar schema con DB
- `npm run db:seed` - Poblar base de datos
- `npm run db:studio` - Abrir Prisma Studio
- `npx prisma migrate reset` - Reiniciar base de datos (⚠️ borra todos los datos)

