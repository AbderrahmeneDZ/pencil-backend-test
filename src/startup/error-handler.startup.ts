import debug from "debug";
import { Request, Response, NextFunction, Express } from "express";
import { AppError } from "../utils/app-error.util";

const debugErr = debug("App:[ERROR]");

export = (app: Express) => {
  // handle errors
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const code = err instanceof AppError ? err.code : 500;
    if (process.env.NODE_ENV !== "production") {
      debugErr(`${code} - ${err.message}`);

      // print stack if it's unexpected error
      if (code === 500) {
        debugErr(`details : ${err.stack}`);
      }

      return res.status(code).json({
        message: err.message,
        stack: err.stack,
        status: code,
      });
    }
    // The error id is attached to `res.sentry` to be returned
    res.status(code).json({
      message: err.message,
      status: code,
    });
  });
};
