import mongoose from "mongoose";
import { logger } from "../lib/logger";

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) return;

  const MONGODB_URI = process.env["MONGODB_URI"];

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI must be set. Did you forget to add it as a secret?");
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error({ err }, "MongoDB connection failed");
    throw err;
  }
}
