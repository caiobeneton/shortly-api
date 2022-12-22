import { Router } from "express";
import { getShortUrl, getUrl, postUrl } from "../controllers/url.controller.js";
import { getByIdValidation, postValidation, shortValidation } from "../middleware/urlValidations.middleware.js";

const router = Router()

router.post("/urls/shorten", postValidation, postUrl)
router.get("/urls/:id", getByIdValidation, getUrl)
router.get("/urls/open/:shortUrl", shortValidation, getShortUrl)

export default router