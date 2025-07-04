import app from "./app";
import { initializeDB } from "./config/db.module";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Inicializar la base de datos y luego arrancar el servidor
initializeDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
