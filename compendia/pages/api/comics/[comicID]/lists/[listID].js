import { getUserOrRedirect } from "@util/cookie"
const db = require("../../../../../util/database").instance

async function removeComicFromList(client, comicID, listID) {
    const query = `DELETE FROM comic_list_comics WHERE comic_id = $1 AND comic_list_id = $2`
    const params = [comicID, listID]
    await client.query(query, params)

    return
}

async function addComicToList(client, comicID, listID) {
    const query = `INSERT INTO comic_list_comics (comic_id, comic_list_id) VALUES ($1, $2) RETURNING comic_list_id`
    const params = [comicID, listID]
    const result = await client.query(query, params)

    return
}

export default async function handler(req, res) {
    const { listID, comicID } = req.query
    const { isComicInList } = req.body
    getUserOrRedirect(req, res)
    res.setHeader("Content-Type", "application/json")

    const client = await db.connect()
    try {
        if (req.method === "PUT") {
            if (isComicInList) {
                await removeComicFromList(client, comicID, listID)
                res.status(200).json({ id: listID, action: "remove" })
            } else {
                await addComicToList(client, comicID, listID)
                res.status(200).json({ id: listID, action: "add" })
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
