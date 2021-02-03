const db = require("../../../../../util/database").instance
import { getUserOrRedirect } from "@util/cookie"

async function getIsComicPulled(client, comicID, userID) {
    const query = `SELECT pull_list_comic_id
        FROM pull_list_comics FULL JOIN collections USING (collection_id)
        WHERE user_id = $1 AND comic_id = $2`
    const params = [userID, comicID]
    const result = await client.query(query, params)

    return result.rows.length === 1 ? true : false
}

async function addComicToPullList(client, res, comicID, userID) {
    const query = `INSERT INTO pull_list_comics(collection_id, comic_id)
        SELECT collection_id, $1 FROM collections WHERE user_id = $2
        RETURNING pull_list_comic_id`
    const params = [comicID, userID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1)
        res.status(400).json({ message: "Comic was not added to your pull list" })
    else return result.rows[0].pull_list_comic_id
}

async function removeComicFromPullList(client, res, comicID, userID) {
    const query = `DELETE FROM pull_list_comics as plc
        USING collections as c WHERE c.user_id = $1
        AND c.collection_id = plc.collection_id
        AND plc.comic_id = $2 RETURNING *`
    const params = [userID, comicID]
    const result = await client.query(query, params)

    if (result.rows.length < 1)
        res.status(400).json({ message: "Comic was not removed from your pull list" })
    else return
}

export default async function handler(req, res) {
    const { comicID } = req.query
    const user = getUserOrRedirect(req, res)
    res.setHeader("Content-Type", "application/json")

    const client = await db.connect()
    try {
        if (req.method === "GET") {
            const isComicPulled = await getIsComicPulled(client, comicID, user.id)
            res.status(200).json({ isComicPulled })
        } else if (req.method === "POST") {
            const pullListComicID = await addComicToPullList(client, res, comicID, user.id)
            res.status(201).json({ pullListComicID })
        } else if (req.method === "DELETE") {
            await removeComicFromPullList(client, res, comicID, user.id)
            res.status(204).end()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
