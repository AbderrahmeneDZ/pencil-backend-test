import { Request, Response } from "express";
import { AppError } from "../utils/app-error.util";

import Questions from "../models/question.model";
import Topics from "../models/topic.model";

const getQuestionsOfTopic = async (req: Request, res: Response) => {
  const { q } = req.query;

  if (!q) {
    throw new AppError("Please provide a topic name", 400);
  }

  const data = await Topics.aggregate([
    {
      $match: {
        name: q,
      },
    },
    {
      $addFields: {
        annotations: {
          $concatArrays: ["$tree", ["$_id"]],
        },
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "annotations",
        foreignField: "annotations",
        as: "questions",
      },
    },
    {
      $unwind: {
        path: "$questions",
        includeArrayIndex: "string",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        No: "$questions.No",
      },
    },
  ]);

  res.json({ data });
};

const getQuestions = async (req: Request, res: Response) => {
  const page = req?.query?.page ? +req?.query?.page : 0;
  const pagesize = req?.query?.pagesize ? +req?.query?.pagesize : 10;

  const data = await Questions.find()
    .skip(page * pagesize)
    .limit(pagesize)
    .populate("annotations", { name: 1 });

  res.json({
    data,
    info: {
      page,
      pagesize,
    },
  });
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await Questions.findById(id).populate("annotations", {
    name: 1,
  });

  if (!data) {
    throw new AppError("Could not find a question with the given id", 404);
  }

  res.json({
    data,
  });
};

export default {
  getQuestionsOfTopic,
  getQuestions,
  getOne,
};
