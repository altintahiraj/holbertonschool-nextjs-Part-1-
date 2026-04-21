import mysql from "mysql2/promise";

declare global {
  var mysqlPool: mysql.Pool | undefined;
}

function createPool(): mysql.Pool {
  return mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "qa_app",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: "+00:00",
  });
}

function getPool(): mysql.Pool {
  if (!global.mysqlPool) {
    global.mysqlPool = createPool();
  }
  return global.mysqlPool;
}

export async function query<T = Record<string, unknown>>(
  sql: string,
  params?: mysql.FieldPacket[] | mysql.OkPacket | mysql.ResultSetHeader | unknown[]
): Promise<T[]> {
  const pool = getPool();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rows] = await pool.execute(sql, params as any);
  return rows as T[];
}

export async function execute(
  sql: string,
  params?: mysql.FieldPacket[] | mysql.OkPacket | mysql.ResultSetHeader | unknown[]
): Promise<mysql.ResultSetHeader> {
  const pool = getPool();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result] = await pool.execute(sql, params as any);
  return result as mysql.ResultSetHeader;
}
