import { Router } from "express";
import { deleteUrl, getShortUrl, getUrl, postUrl } from "../controllers/url.controller.js";
import { deleteValidation, getByIdValidation, postValidation, shortValidation } from "../middleware/urlValidations.middleware.js";

const router = Router()

router.post("/urls/shorten", postValidation, postUrl)
router.get("/urls/:id", getByIdValidation, getUrl)
router.get("/urls/open/:shortUrl", shortValidation, getShortUrl)
router.delete("/urls/:id", deleteValidation, deleteUrl)

export default router