import connectionDB from "../database/database.js"

export async function userValidation(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
        return res.sendStatus(401)
    }

    try {
        const checkToken = await connectionDB.query(`SELECT * FROM sessions WHERE token = ($1);`, [token])

        if (checkToken.rows.length === 0) {
            return res.sendStatus(401)
        }

        const userId = checkToken.rows[0].usersId

        if (userId === undefined || userId === null) {
            return res.sendStatus(404)
        }

        res.locals.userId = userId

    } catch (error) {
        res.sendStatus(500)
    }

    next()
}