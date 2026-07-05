import app from "./app";
import { logger } from "./lib/logger";
import { connectDB } from "./db/mongoose";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Start the HTTP server immediately so the port opens and health-checks pass.
// MongoDB connection is attempted in the background; routes will return 503
// until the DB is ready (see middleware/dbReady.ts).
app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }
  logger.info({ port }, "Server listening");
});

// Connect to MongoDB after the server is already accepting connections.
connectDB().catch((err) => {
  logger.error({ err }, "MongoDB connection failed — API routes will return 503 until DB is available");
});
