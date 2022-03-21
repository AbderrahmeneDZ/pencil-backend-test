import mongoose, { Schema } from "mongoose";
import {
  IQuestionDocument,
  IQuestionModel,
} from "../interfaces/question.interface";

const schema = new Schema<IQuestionDocument>({
  No: {
    type: Number,
    required: true,
    unique: true,
  },
  annotations: {
    type: [Schema.Types.ObjectId],
    ref: "Topics",
  },
});

export { schema };
export default mongoose.model<IQuestionDocument, IQuestionModel>(
  "Questions",
  schema
);
