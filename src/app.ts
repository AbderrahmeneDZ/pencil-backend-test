import express from "express";
import env from "dotenv";

import databaseStartup from "./startup/database.startup";
import routesStartup from "./startup/routes.startup";
import errorHandlerStartup from "./startup/error-handler.startup";

if (process.env.NODE_ENV !== "production") {
  env.config({ path: ".env" });
}

const app = express();

// initialize database connection
databaseStartup();

// setting routes
routesStartup(app);

app.get("/", (req, res) => {
  res.send("Hey, Welcome");
});

// setting error handling
errorHandlerStartup(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on localhost:${PORT}`);
});
