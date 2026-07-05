import mongoose from "mongoose";
import { logger } from "../lib/logger";

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) return;

  const rawUri = process.env["MONGODB_URI"];

  if (!rawUri) {
    throw new Error("MONGODB_URI must be set. Did you forget to add it as a secret?");
  }

  const MONGODB_URI = rawUri.trim();

  if (!MONGODB_URI.startsWith("mongodb://") && !MONGODB_URI.startsWith("mongodb+srv://")) {
    throw new Error(
      `MONGODB_URI has an invalid scheme (starts with: "${MONGODB_URI.slice(0, 20)}..."). ` +
        `Expected it to start with "mongodb://" or "mongodb+srv://".`
    );
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
