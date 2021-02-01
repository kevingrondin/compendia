const db = require("../../../../../util/database").instance
import { getUserOrRedirect } from "@util/cookie"

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { comicDay } = req.query
    const user = getUserOrRedirect(req, res)
    const client = await db.connect()

    try {
        if (req.method === "GET") {
            const query = `SELECT comic_id, title, cover FROM comics as c
                WHERE c.release_date = $1 AND
                    EXISTS (SELECT 1 FROM pull_list_comics as plc
                        FULL JOIN collections as col USING(collection_id)
                        WHERE col.user_id = $2 AND plc.comic_id = c.comic_id)`
            const params = [comicDay, user.id]
            const results = await client.query(query, params)

            res.status(200).json(
                results.rows.map((comic) => {
                    return {
                        id: comic.comic_id,
                        title: comic.title,
                        cover: comic.cover,
                    }
                })
            )
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
