import { getUserOrRedirect } from "../../../../../util/cookie"
const db = require("../../../../../database").instance

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { listID, comicID } = req.query
    const { isComicInList } = req.body
    getUserOrRedirect(req, res)

    const client = await db.connect()
    try {
        if (req.method === "PUT") {
            if (isComicInList) {
                const listComicDelete = `DELETE FROM comic_list_comics WHERE comic_id = $1 AND comic_list_id = $2`
                const listComicDeleteParams = [comicID, listID]
                await client.query(listComicDelete, listComicDeleteParams)

                res.status(200).json({ id: listID, action: "remove" })
            } else {
                const listComicInsert = `INSERT INTO comic_list_comics (comic_id, comic_list_id) VALUES ($1, $2) RETURNING comic_list_id`
                const listComicInsertParams = [comicID, listID]
                const listComicInsertResult = await client.query(
                    listComicInsert,
                    listComicInsertParams
                )

                res.status(200).json({
                    id: listID,
                    action: "add",
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Could not update ${list.name} list` })
    } finally {
        await client.end()
        await client.release()
    }
}
