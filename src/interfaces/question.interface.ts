import { Document, Model, ObjectId } from "mongoose";

interface IQuestion {
  No: Number;
  annotations: ObjectId[];
}

interface IQuestionDocument extends IQuestion, Document {}

interface IQuestionModel extends Model<IQuestionDocument> {}

export { IQuestion, IQuestionDocument, IQuestionModel };
