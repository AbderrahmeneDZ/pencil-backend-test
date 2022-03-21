import express from "express";
import controller from "../controller/topics.controller";
import asyncErrorWrapperUtil from "../utils/async-error-wrapper.util";
import paramsObjectIdValidatorMd from "../middlewares/params-objectId-validator.md";

const router = express.Router();

router.get("/", asyncErrorWrapperUtil(controller.getTopics));

router.get(
  "/:id",
  paramsObjectIdValidatorMd(["id"]),
  asyncErrorWrapperUtil(controller.getOne)
);

export default router;
