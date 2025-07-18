import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.get("/get-user", authenticate, userController.getUser);

export default router;
