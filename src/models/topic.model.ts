import mongoose, { Schema } from "mongoose";
import { ITopicDocument, ITopicModel } from "../interfaces/topic.interface";

const schema = new Schema<ITopicDocument>({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: [Schema.Types.ObjectId],
    ref: "topics",
  },
  tree: {
    type: [Schema.Types.ObjectId],
    ref: "topics",
  },
});

export { schema };
export default mongoose.model<ITopicDocument, ITopicModel>("Topics", schema);
