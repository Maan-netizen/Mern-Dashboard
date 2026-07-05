import { Router } from "express";
import { User } from "../models/User";
import { Activity } from "../models/Activity";
import { requireAuth, type AuthRequest } from "../middleware/auth";

const router = Router();

// PUT /users/profile — update display name
router.put("/users/profile", requireAuth, async (req: AuthRequest, res) => {
  try {
    const { name } = req.body as { name?: string };

    if (!name?.trim()) {
      res.status(400).json({ error: "name is required" });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name: name.trim() },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await Activity.create({
      userId: req.userId,
      type: "profile",
      description: "Updated profile name",
      metadata: {},
    });

    res.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      lastLogin: user.lastLogin ? user.lastLogin.toISOString() : null,
    });
  } catch (err) {
    req.log.error({ err }, "Update profile failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /users/password — change password
router.put("/users/password", requireAuth, async (req: AuthRequest, res) => {
  try {
    const { currentPassword, newPassword } = req.body as {
      currentPassword?: string;
      newPassword?: string;
    };

    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: "currentPassword and newPassword are required" });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ error: "newPassword must be at least 6 characters" });
      return;
    }

    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const valid = await user.comparePassword(currentPassword);
    if (!valid) {
      res.status(400).json({ error: "Current password is incorrect" });
      return;
    }

    user.password = newPassword;
    await user.save();

    await Activity.create({
      userId: req.userId,
      type: "security",
      description: "Password changed",
      metadata: {},
    });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    req.log.error({ err }, "Change password failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
