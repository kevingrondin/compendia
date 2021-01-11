const db = require("../../../../database").instance
import { validateAndGetUser } from "../../../../util/cookie"

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { id } = req.query

    const user = validateAndGetUser(req, res)

    const client = await db.connect()
    try {
        if (req.method === "POST") {
            const insert = `INSERT INTO collected_comics(collection_id, comic_id) VALUES($1, $2) RETURNING collected_comic_id`
            const insertParams = [user.collectionID, id]
            const insertResult = await client.query(insert, insertParams)

            if (insertResult.rows.length > 0) res.status(201).end()
            else throw new Error()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Could not add comic to your collection` })
    }
}
