import mongoose from "mongoose";
import debug from "debug";

const log = debug("App:[MONGOOSE]");

export default () => {
  const { DB_PROTOCOL, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  mongoose.connect(
    `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
    (err) => {
      if (err) {
        log("Database connection failed", err);
        process.exit(1);
      }

      log("Database connected");
    }
  );
};
