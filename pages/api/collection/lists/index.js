import { getUserOrRedirect } from "@util/cookie"
const db = require("../../../../util/database").instance

async function getLists(client, userID) {
    const query = `SELECT cl.comic_list_id, cl.name, clc.num_comics FROM comic_lists as cl
    FULL JOIN (SELECT COUNT(*) as num_comics, comic_list_id FROM comic_list_comics GROUP BY comic_list_id) as clc ON cl.comic_list_id = clc.comic_list_id
    WHERE collection_id = (SELECT collection_id FROM collections WHERE user_id = $1)`
    const params = [userID]
    const result = await client.query(query, params)

    return result.rows
}

export default async function handler(req, res) {
    const user = getUserOrRedirect(req, res)
    res.setHeader("Content-Type", "application/json")

    const client = await db.connect()
    try {
        const lists = await getLists(client, user.id)

        res.status(200).json(
            lists.map((list) => ({
                id: list.comic_list_id,
                name: list.name,
                numComics: list.num_comics,
            }))
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Could not retrieve comic lists" })
    } finally {
        await client.end()
        await client.release()
    }
}
