import connectionDB from "../database/database.js"
import { nanoid } from "nanoid"

export async function postUrl(req, res) {
    const {url} = req.body
    const shortUrl = nanoid(8)

    const usersId = res.locals.usersId

    try {
        await connectionDB.query(`INSERT INTO urls (url, "shortUrl", "usersId") VALUES($1, $2, $3);`,
        [url, shortUrl, usersId])

        return res.status(201).send(shortUrl)
    } catch (error) {
        return res.sendStatus(500)
    }
}

export async function getUrl(req, res) {
    const selectedUrl = res.locals.selectedUrl

    return res.status(200).send(selectedUrl)
}

export async function getShortUrl(req, res) {
    const { selectedUrl, userId, urlId } = res.locals

    try {
        await connectionDB.query(`INSERT INTO urlscount ("usersId", "urlId") VALUES($1, $2);`,
        [userId, urlId])

        return res.redirect(selectedUrl)
    } catch (error) {
        return res.sendStatus(500)
    }
}

export async function deleteUrl(req, res) {
    const deleteId = res.locals.deleteId

    try {
        await connectionDB.query(`DELETE FROM urls WHERE id = ($1);`, [deleteId])
        await connectionDB.query(`DELETE FROM urlscount WHERE "urlId" = ($1);`, [deleteId])

        return res.sendStatus(204)
    } catch (error) {
        return res.sendStatus(500)
    }
}