import { Router } from "express";
import { getUser } from "../controllers/users.controller.js";
import { userValidation } from "../middleware/users.middleware.js";

const router = Router()

router.get("/users/me", userValidation, getUser)
router.get("/ranking",)

export default router