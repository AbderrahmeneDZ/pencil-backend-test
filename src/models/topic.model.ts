import mongoose, { Schema } from "mongoose";
import { ITopicDocument, ITopicModel } from "../interfaces/topic.interface";

const schema = new Schema<ITopicDocument>({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: [Schema.Types.ObjectId],
    ref: "Topics",
  },
  tree: {
    type: [Schema.Types.ObjectId],
    ref: "Topics",
  },
});

export { schema };
export default mongoose.model<ITopicDocument, ITopicModel>("Topics", schema);
