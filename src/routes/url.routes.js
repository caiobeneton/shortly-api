import { Router } from "express";
import { getUrl, postUrl } from "../controllers/url.controller.js";
import { getByIdValidation, postValidation } from "../middleware/urlValidations.middleware.js";

const router = Router()

router.post("/urls/shorten", postValidation, postUrl)
router.get("/urls/:id", getByIdValidation, getUrl)

export default router