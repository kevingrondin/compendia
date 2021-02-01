const db = require("../../../../../util/database").instance
import { getUserOrRedirect } from "@util/cookie"

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { comicID } = req.query
    const user = getUserOrRedirect(req, res)
    const client = await db.connect()

    try {
        if (req.method === "GET") {
            const query = `SELECT pull_list_comic_id
            FROM pull_list_comics FULL JOIN collections USING (collection_id)
            WHERE user_id = $1 AND comic_id = $2`
            const params = [user.id, comicID]
            const result = await client.query(query, params)

            res.status(200).json({ isComicPulled: result.rows.length > 0 ? true : false })
        } else if (req.method === "POST") {
            const insert = `INSERT INTO pull_list_comics(collection_id, comic_id)
                SELECT collection_id, $1 FROM collections WHERE user_id = $2
                RETURNING pull_list_comic_id`
            const params = [comicID, user.id]
            const result = await client.query(insert, params)

            if (result.rows.length > 0) res.status(201).end()
            else throw new Error("Could not add comic to your pull list")
        } else if (req.method === "DELETE") {
            const del = `DELETE FROM pull_list_comics as plc
                USING collections as c WHERE c.user_id = $1 AND c.collection_id = plc.collection_id AND plc.comic_id = $2 RETURNING *`
            const params = [user.id, comicID]
            const result = await client.query(del, params)

            if (result.rows.length > 0) res.status(204).end()
            else throw new Error("Could not remove comic from your pull list")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
