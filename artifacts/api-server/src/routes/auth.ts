import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Activity } from "../models/Activity";
import { requireAuth, type AuthRequest } from "../middleware/auth";

const router = Router();

// POST /auth/register
router.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    if (!name || !email || !password) {
      res.status(400).json({ error: "name, email, and password are required" });
      return;
    }

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ error: "An account with this email already exists" });
      return;
    }

    const user = new User({ name, email, password });
    await user.save();

    await Activity.create({
      userId: user._id,
      type: "account",
      description: "Account created",
      metadata: {},
    });

    const secret = process.env["JWT_SECRET"];
    if (!secret) {
      res.status(500).json({ error: "Server misconfigured" });
      return;
    }

    const token = jwt.sign({ userId: user._id.toString() }, secret, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        lastLogin: user.lastLogin ? user.lastLogin.toISOString() : null,
      },
    });
  } catch (err) {
    req.log.error({ err }, "Register failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /auth/login
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      res.status(400).json({ error: "email and password are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    user.lastLogin = new Date();
    await user.save();

    await Activity.create({
      userId: user._id,
      type: "auth",
      description: "Signed in",
      metadata: {},
    });

    const secret = process.env["JWT_SECRET"];
    if (!secret) {
      res.status(500).json({ error: "Server misconfigured" });
      return;
    }

    const token = jwt.sign({ userId: user._id.toString() }, secret, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        lastLogin: user.lastLogin ? user.lastLogin.toISOString() : null,
      },
    });
  } catch (err) {
    req.log.error({ err }, "Login failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /auth/logout
router.post("/auth/logout", (req, res) => {
  // JWT is stateless — client drops the token. We just confirm.
  res.json({ message: "Logged out successfully" });
});

// GET /auth/me
router.get("/auth/me", requireAuth, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    res.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      lastLogin: user.lastLogin ? user.lastLogin.toISOString() : null,
    });
  } catch (err) {
    req.log.error({ err }, "Get current user failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
