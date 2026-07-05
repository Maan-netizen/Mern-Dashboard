import mongoose from "mongoose";
import { logger } from "../lib/logger";

let isConnected = false;

export function isDBReady(): boolean {
  return isConnected;
}

const MAX_RETRIES = 5;
const INITIAL_DELAY_MS = 2000;

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

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(MONGODB_URI);
      isConnected = true;
      logger.info("MongoDB connected");
      return;
    } catch (err) {
      const isLast = attempt === MAX_RETRIES;
      if (isLast) {
        logger.error({ err }, `MongoDB connection failed after ${MAX_RETRIES} attempts — giving up`);
        throw err;
      }
      const delayMs = INITIAL_DELAY_MS * Math.pow(2, attempt - 1);
      logger.warn({ attempt, delayMs }, `MongoDB connection attempt ${attempt} failed, retrying in ${delayMs}ms`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
