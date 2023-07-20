const express = require("express");
const app = express();
const path = require("path");
const databasePath = path.join(__dirname, "todoApplication.db");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
let db = null;
const initializeDatabase = async (request, response) => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Running");
    });
  } catch (e) {
    console.log(`Error ${e}`);
    process.exit(1);
  }
};
initializeDatabase();

app.get("/todos/", async (request, response) => {
  const { search_q } = request.query;
  const getQuery = `
      SELECT
        *
      FROM
      todo
      WHERE
      status LIKE '%${search_q}%';`;
  const responseObject = await db.all(getQuery);
  response.send(responseObject);
});

app.get("/todoss/", async (request, response) => {
  const { priority } = request.query;
  const priorityQuery = `
  SELECT
   *
  FROM
  todo
  WHERE 
  priority LIKE '%${priority}%';`;
  const h = await db.all(priorityQuery);
  response.send(h);
});

app.get("/todooos/", async (request, response) => {
  const { priority, status } = request.query;
  const priorityQuery = `
  SELECT
    *
  FROM
  todo
  WHERE
  priority LIKE '%${priority}%' AND status LIKE '%${status}%';`;
  console.log(await db.all(priorityQuery));
});

app.get("/tod/", async (request, response) => {
  const { searrch_q } = request.query;
  const q = `
    SELECT
    *
    FROM 
    todo
    WHERE
    todo LIKE '%${searrch_q}%';`;
  response.send(await db.all(q));
});

app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const getIdQuery = `
  SELECT
    *
  FROM 
  todo
  WHERE
  id=${todoId};`;
  const j = await db.get(getIdQuery);
  response.send(j);
});
