import { Document, Model, ObjectId } from "mongoose";

interface IQuestion {
  No: Number;
  topics: ObjectId[];
}

interface IQuestionDocument extends Document {}

interface IQuestionModel extends Model<IQuestion, IQuestionDocument> {}

export { IQuestion, IQuestionDocument, IQuestionModel };
