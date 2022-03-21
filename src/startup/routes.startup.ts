import express, { Express } from "express";
import questionsRoutes from "../routes/questions.route";
import topicsRoutes from "../routes/topics.route";

export = function (app: Express) {
  app.use(express.json());
  app.use("/api/v1/questions", questionsRoutes);
  app.use("/api/v1/topics", topicsRoutes);
};
