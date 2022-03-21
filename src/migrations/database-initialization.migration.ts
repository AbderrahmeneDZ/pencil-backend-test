import { Types } from "mongoose";
import fs from "fs";
import Question from "../models/question.model";
import Topic from "../models/topic.model";
import { ITopicDocument } from "../interfaces/topic.interface";

const generateTree = (
  data: any[] = [],
  level: number = 1,
  parent: string = "",
  path: any[] = []
): any => {
  return [
    ...new Set(
      data
        .filter((obj) => {
          return (
            ((parent && obj[`Topic Level ${level - 1}`] === parent) ||
              !parent) &&
            obj[`Topic Level ${level}`]
          );
        })
        .map((obj) => obj[`Topic Level ${level}`])
    ),
  ].map((name) => {
    const _id = new Types.ObjectId();
    const tree = [
      ...generateTree(data, level + 1, name, [...path, _id]),
    ].reduce((prev, curr) => [...prev, ...curr], []);
    return [
      {
        name,
        _id,
        path,
        tree: tree.map((obj: any) => obj["_id"]),
      },
      ...tree,
    ];
  });
};

const getTopics = () => {
  const topicsData = fs.readFileSync(`${process.cwd()}/data/topics.json`, {
    encoding: "utf-8",
  });
  const docs = [...generateTree(JSON.parse(topicsData), 1, "", [])].reduce(
    (prev, curr) => [...prev, ...curr],
    []
  );

  return docs;
};

const getQuestions = (topics: ITopicDocument[]) => {
  const questionsData = fs.readFileSync(
    `${process.cwd()}/data/questions.json`,
    {
      encoding: "utf-8",
    }
  );

  return [...JSON.parse(questionsData)].map((question: any) => {
    const No = question["Question number"];
    const annotations = Object.keys(question)
      .filter((key: string) => key.startsWith("Annotation ") && question[key])
      .map((pair: any) => {
        const [key, value] = pair;
        const id = topics.find((topic) => topic.name === value);
        return id;
      });

    return {
      No,
      annotations,
    };
  });
};

export default async () => {
  // part one : fill topics database
  const topicsCount = await Topic.countDocuments({});
  if (topicsCount === 0) {
    const topics = getTopics();
    const createdTopics = await Topic.insertMany(topics);

    await Question.deleteMany({});
    const questions = getQuestions(createdTopics);

    await Question.insertMany(questions);
  }
};
