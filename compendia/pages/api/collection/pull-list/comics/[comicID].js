const db = require("../../../../../database").instance

import { getUserOrRedirect } from "../../../../../util/cookie"

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { comicID } = req.query

    const user = getUserOrRedirect(req, res)

    const client = await db.connect()
    try {
        if (req.method === "POST") {
            const insertQuery = `INSERT INTO pull_list_comics(collection_id, comic_id)
                SELECT collection_id, $1 FROM collections WHERE user_id = $2
                RETURNING pull_list_comic_id`
            const insertParams = [comicID, user.id]
            const insertResult = await client.query(insertQuery, insertParams)

            if (insertResult.rows.length > 0) res.status(201).end()
            else throw new Error("Could not add comic to your pull list")
        } else if (req.method === "DELETE") {
            const deleteQuery = `DELETE FROM pull_list_comics as plc
                USING collections as c WHERE c.user_id = $2 AND c.collection_id = plc.collection_id AND plc.comic_id = $1 RETURNING *`
            const deleteParams = [comicID, user.id]
            const deleteResult = await client.query(deleteQuery, deleteParams)

            if (deleteResult.rows.length > 0) res.status(204).end()
            else throw new Error("Could not remove comic from your pull list")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        client.release()
    }
}
