import { AppDataSource } from "./data-source";

export const initializeDB = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Database connected successfully.");
  } catch (error: any) {
    console.error("❌ Failed to connect to the database.");
    console.error("📌 Error name:", error.name);
    console.error("📌 Error code:", error.code);
    console.error("📌 Error message:", error.message);
    console.error("📌 Full stack trace:", error.stack);
    process.exit(1);
  }
};
