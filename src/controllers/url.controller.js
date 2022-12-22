import connectionDB from "../database/database.js"
import { nanoid } from "nanoid"

export async function postUrl(req, res) {
    const url = req.body
    const shortUrl = nanoid(8)

    usersId = res.locals.usersId

    try {
        await connectionDB.query(`INSERT INTO urls (url, "shortUrl", "usersId") VALUES($1, $2, $3);`,
        [url, shortUrl, usersId])

        res.status(201).send(shortUrl)
    } catch (error) {
        res.sendStatus(500)
    }
}

export async function getUrl(req, res) {
    const selectedUrl = res.locals.selectedUrl

    res.status(200).send(selectedUrl)
}

export async function getShortUrl(req, res) {
    const { selectedUrl, userId, urlId } = res.locals

    try {
        await connectionDB.query(`INSERT INTO urlscount ("usersId", "urlId") VALUES($1, $2);`,
        [userId, urlId])

        res.redirect(selectedUrl)
    } catch (error) {
        res.sendStatus(500)
    }
}