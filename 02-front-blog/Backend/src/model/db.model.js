import MySQL from "mysql2";
import dotenv from "dotenv";

dotenv.config();

function stripQuotes(s) {
  if (s == null) return s;
  const t = String(s).trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  return t;
}

const host = process.env.MYSQL_HOST || process.env.HOST;
const useSsl =
  process.env.MYSQL_SSL === "true" ||
  String(host || "").includes("clever-cloud.com");

let cnx;
try {
  cnx = MySQL.createPool({
    host,
    user: process.env.MYSQL_USER || process.env.USER,
    password: process.env.MYSQL_PASSWORD || process.env.PASSWORD,
    database: stripQuotes(process.env.MYSQL_DATABASE || process.env.DATABASE),
    port: Number(process.env.MYSQL_PORT || process.env.PORT_BD) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
  });
} catch (error) {
  console.log(`Ah ocurrido un error en la conexion: ${error.message}`);
}
export default cnx;
