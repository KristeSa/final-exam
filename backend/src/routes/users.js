import { Router } from "express";
import mysql from "mysql2/promise";
import { MSQL_CONFIG } from "../config.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "./verifyToken.js";

export const usersRouter = Router();

usersRouter.get("/", verifyToken, async (req, res) => {
  try {
    const con = await mysql.createConnection(MSQL_CONFIG);
    const [result] = await con.execute(`SELECT * FROM users`);
    await con.end();

    res.send(result).end();
  } catch (error) {
    res.status(500).send({ error }).end();
    console.error({ error });
  }
});

usersRouter.post("/", verifyToken, async (req, res) => {
  const name = mysql.escape(req.body.name.trim());
  const surname = mysql.escape(req.body.surname.trim());
  const birthdate = mysql.escape(req.body.birthdate);
  const age = +mysql.escape(req.body.age).replaceAll("'", "");
  const email = mysql.escape(req.body.email.trim());
  const eventsName = req.body.eventsName;

  try {
    const con = await mysql.createConnection(MSQL_CONFIG);

    const result = await con.execute(
      `INSERT INTO users (name, surname, birthdate, age, email, eventsName ) VALUES (${name}, ${surname}, ${birthdate}, ${age}, ${email}, '${eventsName}')`
    );

    await con.end();

    res.send({ msg: "User successfully created", result }).end();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }

    res.status(500).send({ error }).end();
    console.error({ error });
  }
});

usersRouter.delete("/:id", verifyToken, async (req, res) => {
  const id = +mysql.escape(req.params.id).replaceAll("'", "");

  const query = `DELETE FROM users WHERE id = ${id}`;

  try {
    const con = await mysql.createConnection(MSQL_CONFIG);

    await con.execute(query);
    await con.end();

    res.send({ msg: "User successfully deleted" }).end();
  } catch (error) {
    res.status(500).send({ error }).end();
    console.error({ error });
  }
});
