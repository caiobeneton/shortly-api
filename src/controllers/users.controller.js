import connectionDB from "../database/database.js"

export async function getUser(req, res) {
    const userId = res.locals.userId

    try {
        const userProfile = await connectionDB.query(`SELECT users.id, users.name, COUNT(urlscount."urlId") AS "visitCount" FROM users JOIN urlscount ON urlscount."usersId" = users.id WHERE users.id = $1 GROUP BY users.id;`, [userId])

        const urlCount = await connectionDB.query(`SELECT urls.id, urls."shortUrl", urls."url", COUNT(urlscount."urlId") AS "visitCount" FROM urls JOIN urlscount ON urlscount."urlId" = urls.id WHERE urls."usersId" = $1 GROUP BY urls.id;`, [userId])

        const userInfo = userProfile.rows[0]

        userInfo.shortenedUrls = urlCount.rows

        res.status(200).send(userInfo)

    } catch (error) {
        res.sendStatus(500)
    }
}
