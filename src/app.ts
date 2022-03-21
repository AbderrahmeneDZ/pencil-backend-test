import express from "express";
import env from "dotenv";

import databaseStartup from "./startup/database.startup";

if (process.env.NODE_ENV !== "production") {
  env.config({ path: ".env" });
}

const app = express();

// initialize database connection
databaseStartup();

app.get("/", (req, res) => {
  res.json(process.env);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on localhost:${PORT}`);
});
