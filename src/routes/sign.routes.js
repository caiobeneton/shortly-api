import {Router} from "express"
import { signIn, signUp } from "../controllers/sign.controller.js"
import { signInValidator, signUpValidator } from "../middleware/signValidations.middlewares.js"

const router = Router()

router.post("/signup", signUpValidator, signUp)
router.post("/signin", signInValidator, signIn)

export default router