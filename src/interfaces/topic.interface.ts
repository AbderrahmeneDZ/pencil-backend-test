import { Document, Model, ObjectId } from "mongoose";

interface ITopic {
  name: String;
  path: ObjectId[];
  tree: ObjectId[];
}

interface ITopicDocument extends Document {}

interface ITopicModel extends Model<ITopic, ITopicDocument> {}

export { ITopic, ITopicDocument, ITopicModel };
