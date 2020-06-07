import sqlite3 from "sqlite3";
import SQL from "sql-template-strings";
import bcrypt from "bcryptjs";
import { open } from "sqlite";

export const openDb = async () => {
  return open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });
};

export const findUser = async (email: string): Promise<any> => {
  const db = await openDb();
  await db.exec(`CREATE TABLE IF NOT EXISTS Users(
    id INTEGER PRIMARY KEY,
    email type TEXT,
    password type TEXT)`);
  const user = await db.all(SQL`SELECT * FROM Users WHERE email = ${email}`);
  await db.close();
  if (user.length === 0) {
    return null;
  }
  return user[0];
};

export const createUser = async (
  email: string,
  password: string
): Promise<Boolean> => {
  const userExists = await findUser(email);
  if (userExists) {
    return false;
  }
  const db = await openDb();
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await db.all(
    SQL`INSERT INTO Users (email,password) VALUES (${email},${hashedPassword})`
  );
  await db.close();
  return true;
};

export const findAllUsers = async (): Promise<any[]> => {
  const db = await openDb();
  const users = await db.all(SQL`SELECT * FROM Users`);
  await db.close();
  return users;
};

export const deleteUser = async (email: string): Promise<Boolean> => {
  const db = await openDb();
  const userExist = await findUser(email);
  if (!userExist) {
    return false;
  }
  const users = await db.all(SQL`DELETE FROM Users WHERE email = ${email}`);
  await db.close();
  return true;
};
