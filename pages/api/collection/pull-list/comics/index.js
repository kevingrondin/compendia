import { db } from "@util/database"
import { getUserOrRedirect } from "@util/cookie"

async function getPullListComics(client, comicDay, userID) {
    const query = `SELECT comic_id, title, item_number, cover FROM comics as c
        WHERE c.release_date = $1 AND
        EXISTS (SELECT 1 FROM pull_list_comics as plc
        FULL JOIN collections as col USING(collection_id)
        WHERE col.user_id = $2 AND plc.comic_id = c.comic_id)`
    const params = [comicDay, userID]
    const result = await client.query(query, params)

    return result.rows
}

export default async function handler(req, res) {
    const { comicDay } = req.query
    const user = getUserOrRedirect(req, res)
    res.setHeader("Content-Type", "application/json")

    const client = await db.connect()
    try {
        if (req.method === "GET") {
            const pullListComics = await getPullListComics(client, comicDay, user.id)

            res.status(200).json(
                pullListComics.map((comic) => {
                    return {
                        id: comic.comic_id,
                        title: comic.title,
                        itemNumber: comic.item_number,
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
