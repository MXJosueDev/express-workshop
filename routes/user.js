const express = require("express");
const jwt = require("jsonwebtoken");
const user = express.Router();
const db = require("../config/database");

user.post("/signin", async (req, res, next) => {
  const { user_name, user_mail, user_password } = req.body;

  if (!(user_name && user_mail && user_password))
    return res.status(400).json({ code: 400, message: "Campos incompletos" });

  if (!(user_name && user_mail && user_password))
    return res.status(400).json({ code: 400, message: "Campos incompletos" });

  let query = `INSERT INTO user(user_name, user_mail, user_password)`;
  query += `VALUES ('${user_name}','${user_mail}','${user_password}')`;

  const rows = await db.query(query);

  if (rows.affectedRows == 1) {
    return res.status(201).json({ code: 201, message: "Usuario creado con exito" });
  }

  return res.status(500).json({ code: 500, message: "Ocurrio un error" });
});

user.post("/login", async (req, res, next) => {
  const { user_mail, user_password } = req.body;

  if (!(user_mail && user_password))
    return res.status(400).json({ code: 400, message: "Campos incompletos" });

  const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}'`;
  const rows = await db.query(query);

  if (rows.length == 1) {
    const token = jwt.sign(
      {
        user_id: rows[0].user_id,
        user_mail: rows[0].user_mail,
        
      },
      "debugkey"
    );

    res.status(200).json({ code: 200, message: token });
  }

  return res.status(200).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
});

user.get("/", async (req, res, next) => {
  const query = "SELECT * FROM user";

  const rows = await db.query(query);

  return res.status(200).json({ code: 200, message: rows });
});

module.exports = user;
