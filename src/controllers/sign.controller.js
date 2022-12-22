import connectionDB from "../database/database.js";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"

export async function signUp(req, res) {
    const { name, email, password } = req.body

    const hashPassword = bcrypt.hashSync(password, 10)

    try {
        await connectionDB.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
        [name, email, hashPassword])

        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
    }
}

export async function signIn(req, res) {
    const token = uuidv4()

    const { userId } = res.locals

    try {
        await connectionDB.query(`INSERT INTO sessions ("usersId", token) VALUES ($1, $2);`, [userId, token])

        res.status(200).send({ token: token })
    } catch (error) {
        res.sendStatus(500)
    }
}