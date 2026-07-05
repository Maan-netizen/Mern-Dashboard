import type { Request, Response, NextFunction } from "express";
import { isDBReady } from "../db/mongoose";

/**
 * Returns 503 on any API request that arrives before MongoDB has connected.
 * This lets the server open its port (and pass health-checks) immediately
 * while the DB connection is still being established in the background.
 */
export function requireDB(req: Request, res: Response, next: NextFunction): void {
  if (!isDBReady()) {
    res.status(503).json({ error: "Service temporarily unavailable — database connecting, please retry shortly." });
    return;
  }
  next();
}
