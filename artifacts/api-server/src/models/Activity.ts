import mongoose, { Document, Model } from "mongoose";

export interface IActivity extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: string;
  description: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new mongoose.Schema<IActivity>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const Activity: Model<IActivity> = mongoose.model<IActivity>("Activity", activitySchema);
