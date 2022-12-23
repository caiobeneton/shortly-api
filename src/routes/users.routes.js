import { Router } from "express";
import { getRanking, getUser } from "../controllers/users.controller.js";
import { userValidation } from "../middleware/users.middleware.js";

const router = Router()

router.get("/users/me", userValidation, getUser)
router.get("/ranking", getRanking)

export default router