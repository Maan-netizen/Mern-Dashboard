import { Router } from "express";
import mongoose from "mongoose";
import { Note } from "../models/Note";
import { Activity } from "../models/Activity";
import { requireAuth, type AuthRequest } from "../middleware/auth";

const isCastError = (err: unknown): err is mongoose.Error.CastError =>
  err instanceof mongoose.Error.CastError;

const router = Router();

// GET /notes
router.get("/notes", requireAuth, async (req: AuthRequest, res) => {
  try {
    const notes = await Note.find({ userId: req.userId })
      .sort({ updatedAt: -1 })
      .limit(100);

    res.json(
      notes.map((n) => ({
        id: n._id.toString(),
        title: n.title,
        content: n.content,
        createdAt: n.createdAt.toISOString(),
        updatedAt: n.updatedAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error({ err }, "List notes failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /notes
router.post("/notes", requireAuth, async (req: AuthRequest, res) => {
  try {
    const { title, content } = req.body as { title: string; content?: string };

    if (!title?.trim()) {
      res.status(400).json({ error: "title is required" });
      return;
    }

    const note = await Note.create({
      userId: req.userId,
      title: title.trim(),
      content: content ?? "",
    });

    await Activity.create({
      userId: req.userId,
      type: "note",
      description: `Created note: ${note.title}`,
      metadata: { noteId: note._id.toString() },
    });

    res.status(201).json({
      id: note._id.toString(),
      title: note.title,
      content: note.content,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Create note failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /notes/:id
router.put("/notes/:id", requireAuth, async (req: AuthRequest, res) => {
  try {
    const { title, content } = req.body as { title?: string; content?: string };

    if (title !== undefined && !title.trim()) {
      res.status(400).json({ error: "title cannot be empty" });
      return;
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params["id"], userId: req.userId },
      {
        ...(title !== undefined && { title: title.trim() }),
        ...(content !== undefined && { content }),
      },
      { new: true }
    );

    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    res.json({
      id: note._id.toString(),
      title: note.title,
      content: note.content,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    });
  } catch (err) {
    if (isCastError(err)) { res.status(400).json({ error: "Invalid note ID" }); return; }
    req.log.error({ err }, "Update note failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /notes/:id
router.delete("/notes/:id", requireAuth, async (req: AuthRequest, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params["id"],
      userId: req.userId,
    });

    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    res.json({ message: "Note deleted" });
  } catch (err) {
    if (isCastError(err)) { res.status(400).json({ error: "Invalid note ID" }); return; }
    req.log.error({ err }, "Delete note failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
