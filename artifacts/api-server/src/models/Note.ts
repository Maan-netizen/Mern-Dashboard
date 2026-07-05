import mongoose, { Document, Model } from "mongoose";

export interface INote extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema<INote>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, default: "", maxlength: 10000 },
  },
  { timestamps: true }
);

noteSchema.index({ userId: 1, updatedAt: -1 });

export const Note: Model<INote> = mongoose.model<INote>("Note", noteSchema);
