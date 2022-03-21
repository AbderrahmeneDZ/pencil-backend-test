import { Request, Response } from "express";
import { AppError } from "../utils/app-error.util";

import Topics from "../models/topic.model";

const getTopics = async (req: Request, res: Response) => {
  const page = req?.query?.page ? +req?.query?.page : 0;
  const pagesize = req?.query?.pagesize ? +req?.query?.pagesize : 10;

  const data = await Topics.find()
    .skip(page * pagesize)
    .limit(pagesize)
    .populate("path", {
      name: 1,
    })
    .populate("tree", {
      name: 1,
    });

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

  const data = await Topics.findById(id)
    .populate("path", {
      name: 1,
    })
    .populate("tree", {
      name: 1,
    });

  if (!data) {
    throw new AppError("Could not find a topic with the given id", 404);
  }

  res.json({
    data,
  });
};

export default {
  getTopics,
  getOne,
};
