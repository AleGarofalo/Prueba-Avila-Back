# Prueba-Avila-Back

API backend para la gestión de usuarios, productos y órdenes, desarrollada como parte de la prueba técnica para la empresa Avila Tek. Usa Node.js, Express, TypeScript, TypeORM, JWT, y PostgreSQL.

⚙️ Tecnologías principales
Node.js + Express
TypeScript
PostgreSQL
TypeORM
JWT (autenticación)
Bcrypt (encriptación de contraseñas)
Winston (logger)
Dotenv (variables de entorno)
Morgan (logs HTTP)
Dbeaver o PgAdmin (para gestionar la base de datos)

🚀 Requisitos previos
Node.js v18+
PostgreSQL instalado
DBeaver o PgAdmin para crear la base de datos
npm o yarn

⚙️ Configuración inicial
1.- Clonar el repositorio:
https://github.com/tu-usuario/Prueba-Avila-Back
2.- Instalar las dependencias
npm install
3.- Configurar el archivo .env con
PORT=3457

SQL_HOST=localhost
SQL_USER=postgres
SQL_PASSWORD=tu_clave
SQL_DB=Avilatek
SQL_SCHEMA=ecommerce_db

JWT_SECRET=claveultrasecreta
JWT_EXPIRES_IN=1h

NODE_TLS_REJECT_UNAUTHORIZED=0

4.- Crear la base de datos y schema
En DBeaver o PgAdmin.
Crear una base de datos llamada Avilatek.
Dentro de ella, crea un schema llamado ecommerce_db.

5.- Ejecutar la aplicacion
Ejecutar en la terminal el comando npm run dev para iniciar la aplicacion y sincronizar la base de datos

6.- Ejecutar los seeders con:
npx ts-node src/seeds.ts

7.- Probar los endpoints con postman
Se recomienda usar Postman para probar los endpoints. Recuerda pasar el token en cada request:

Authorization: Bearer <tu_token>
