import { Router } from "express";
import { User } from "../models/User";
import { Activity } from "../models/Activity";
import { requireAuth, type AuthRequest } from "../middleware/auth";

const router = Router();

// GET /dashboard/stats
router.get("/dashboard/stats", requireAuth, async (req: AuthRequest, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [totalUsers, activeToday, newThisWeek, currentUser] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ lastLogin: { $gte: startOfToday } }),
      User.countDocuments({ createdAt: { $gte: oneWeekAgo } }),
      User.findById(req.userId),
    ]);

    const accountAgeDays = currentUser
      ? Math.floor(
          (now.getTime() - currentUser.createdAt.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

    res.json({ totalUsers, activeToday, newThisWeek, accountAgeDays });
  } catch (err) {
    req.log.error({ err }, "Get dashboard stats failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /dashboard/activity
router.get("/dashboard/activity", requireAuth, async (req: AuthRequest, res) => {
  try {
    const activities = await Activity.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(
      activities.map((a) => ({
        id: a._id.toString(),
        type: a.type,
        description: a.description,
        timestamp: a.createdAt.toISOString(),
        metadata: a.metadata ?? {},
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Get recent activity failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
