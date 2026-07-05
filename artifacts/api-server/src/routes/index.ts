import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import dashboardRouter from "./dashboard";
import notesRouter from "./notes";
import usersRouter from "./users";

const router: IRouter = Router();

router.use(authRouter);
router.use(dashboardRouter);
router.use(notesRouter);
router.use(usersRouter);

export default router;
