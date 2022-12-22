import connectionDB from "../database/database.js";
import { signUpSchema } from "../models/signupSchema.model.js";
import { signinSchema } from "../models/signInSchema.model.js";
import bcrypt from "bcrypt"

export async function signUpValidator(req, res, next) {
    const user = req.body

    const {error} = signUpSchema.validate(user, {abortEarly: false})

    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }

    const { email, password, confirmPassword } = user

    if (password !== confirmPassword) {
        return res.status(422).send("Passwords don't match");
    }

    try {
        const checkEmail = await connectionDB.query(`SELECT email FROM users WHERE email = ($1);`, [email])

        if (checkEmail) {
            return res.status(409).send("Email already exists")
        } 
    } catch (error) {
        res.sendStatus(500)
    }

    next()
}

export async function signInValidator(req, res, next) {
    const user = req.body

    const {error} = signinSchema.validate(user, {abortEarly: false})

    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }

    const { email, password } = user

    try {
        const checkUser = await connectionDB.query(`SELECT email FROM users WHERE email = ($1);`, [email])

        if (checkUser.rows.length === 0) {
            return res.status(401).send("User not found, check email or password")
        }

        const checkPassword = bcrypt.compareSync(password, checkUser.rows[0].password)

        const userId = checkUser.rows[0].id
        res.locals.userId = userId

        if (!checkPassword) {
            return res.status(401).send("User not found, check email or password")
        }
    } catch (error) {
        res.sendStatus(500)
    }

    next()
}