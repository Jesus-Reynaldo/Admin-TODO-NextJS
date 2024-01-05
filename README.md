# Development
Pasos para levantar la app en desarrollo

1.  Levantar la base de datos
```
docker compose up -d
```
2.  Renombar el .env.template a .env
3.  Reemplazar las variables de entorno
4.  Ejercutar el comando  ```npm install```
5.  Ejecutar el comando ```npm run dev```
6.  Ejecutra los comando de prisma
```
npx  prisma migrate dev
npx  prisma generate
```
6.  Ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)

# Prisma commnads
```
npx prisma init
npx prisma migrate cualquier_nombre
npx prisma generate

```

# Prod

# Stage