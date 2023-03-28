import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.serverPort || 5100;

export const jwtSecret = "kcv734";

export const MSQL_CONFIG = {
  user: "root",
  host: "localhost",
  password: "shop1853245",
  database: "sys",
};
