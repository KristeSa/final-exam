import { Router } from "express";
import mysql from "mysql2/promise";
import { MSQL_CONFIG } from "../config.js";
import { verifyToken } from "./verifyToken.js";

export const eventsRouter = Router();

eventsRouter.get("/", verifyToken, async (_, res) => {
  try {
    const con = await mysql.createConnection(MSQL_CONFIG);
    const [result] = await con.execute(`SELECT * FROM events`);
    await con.end();

    res.send(result).end();
  } catch (error) {
    res.status(500).send({ error }).end();
    console.error({ error });
  }
});

eventsRouter.get("/:eventsName", verifyToken, async (req, res) => {
  const eventsName = mysql
    .escape(req.params.eventsName)
    .replaceAll("=", "")
    .replaceAll("'", "")
    .trim()
    .toLowerCase();

  try {
    const con = await mysql.createConnection(MSQL_CONFIG);
    const [result] = await con.execute(
      `SELECT name, surname, birthdate, age, email, eventsName FROM users WHERE eventsName = '${eventsName}'`
    );
    await con.end();

    res.send(result).end();
  } catch (error) {
    res.status(500).send({ error }).end();
    console.error({ error });
  }
});
