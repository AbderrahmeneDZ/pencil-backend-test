import { Document, Model, Types } from "mongoose";

interface ITopic {
  name: String;
  path: Types.ObjectId[];
  tree: Types.ObjectId[];
}

interface ITopicDocument extends ITopic, Document {}

interface ITopicModel extends Model<ITopicDocument> {}

export { ITopic, ITopicDocument, ITopicModel };
