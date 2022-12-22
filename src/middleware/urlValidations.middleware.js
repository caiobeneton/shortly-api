import connectionDB from "../database/database.js"
import { urlSchema } from "../models/urlSchema.model.js"

export async function postValidation(req, res, next) {
    const url = req.body

    const { error } = urlSchema.validate(url, { abortEarly: false })

    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }

    const token = req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const getId = await connectionDB.query(`SELECT "usersId" FROM sessions WHERE token = ($1);`, [token])

        if (getId.rows.length === 0) {
            return res.sendStatus(401)
        }

        const usersId = getId.rows[0].usersId

        res.locals.usersId = usersId

    } catch (error) {
        res.sendStatus(500)
    }

    next()
}

export async function getByIdValidation(req, res, next) {
    const id = req.params.id

    if (!id) {
        return res.sendStatus(422)
    }

    try {
        const getUrl = await connectionDB.query(`SELECT id, "shortUrl", url FROM urls WHERE id = ($1);`, [id])

        if (getUrl.rows.length === 0) {
            return res.status(404).send("Not found")
        }

        const selectedUrl = getUrl.rows[0]

        res.locals.selectedUrl = selectedUrl

    } catch (error) {
        res.sendStatus(500)
    }

    next()
}

export async function shortValidation(req, res, next) {
    const shortUrl = req.params.shortUrl

    if (!shortUrl) {
        return res.sendStatus(422)
    }

    try {
        const getShort = await connectionDB.query(`SELECT id, url, "usersId" FROM urls WHERE "shortUrl" = ($1);`,
            [shortUrl])

        if (getShort.rows.length === 0) {
            return res.status(404).send("Not found")
        }

        res.locals.selectedUrl = getShort.rows[0].url
        res.locals.userId = getShort.rows[0].usersId
        res.locals.urlId = selectUrl.rows[0].id

    } catch (error) {
        res.sendStatus(500)
    }

    next()
}

export async function deleteValidation(req, res, next) {
    const id = req.params.id

    if (!id) {
        return res.sendStatus(422)
    }

    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const userId = await connectionDB.query(`SELECT "usersId" FROM sessions WHERE token = ($1);`, [token])

        if (userId.rows.length === 0) {
            return res.sendStatus(401)
        }

        const userUrl = await connectionDB.query(`SELECT "usersId", id FROM urls WHERE id = ($1);`, [id])

        if (userUrl.rows.length === 0) {
            return res.sendStatus(404)
        }

        const usersId = userId.rows[0].usersId
        const userUrlId = userUrl.rows[0].usersId

        if (userUrlId !== usersId) {
            return res.sendStatus(401)
        }

        res.locals.deleteId = userUrl.rows[0].id
    } catch (error) {
        res.sendStatus(500)
    }

    next()
}