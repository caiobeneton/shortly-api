import { Router } from "express";
import { postUrl } from "../controllers/url.controller.js";
import { postValidation } from "../middleware/urlValidations.middleware.js";

const router = Router()

router.post("/urls/shorten", postValidation, postUrl)

export default router