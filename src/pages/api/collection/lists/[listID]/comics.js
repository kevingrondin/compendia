import { getUserOrRedirect } from "@util/cookie"
import { db } from "@util/database"

async function getListComics(client, listID) {
    const query = `SELECT c.comic_id, c.cover, c.title, c.item_number
        FROM comics as c FULL JOIN comic_list_comics as clc USING(comic_id)
        WHERE clc.comic_list_id = $1
        ORDER BY c.release_date DESC FETCH FIRST 30 ROWS ONLY`
    const params = [listID]
    const result = await client.query(query, params)

    return result.rows
}

export default async function handler(req, res) {
    const { listID } = req.query
    res.setHeader("Content-Type", "application/json")
    getUserOrRedirect(req, res)

    if (!listID) res.status(404).json({ message: `List ID cannot be null` })

    const client = await db.connect()
    try {
        const comics = await getListComics(client, listID)

        res.status(200).json({
            comics: comics.map((comic) => {
                return {
                    id: parseInt(comic.comic_id),
                    cover: comic.cover,
                    title: comic.title,
                    itemNumber: comic.item_number,
                }
            }),
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
