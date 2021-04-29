import { getUserOrRedirect } from "@util/cookie"
import { db } from "@util/database"

async function getLists(client, comicID, userID) {
    const query = `SELECT comic_list_id, name,
        EXISTS (SELECT 1 FROM comic_list_comics a
        WHERE a.comic_id = $1 AND b.comic_list_id = a.comic_list_id ) as isComicInList
        FROM comic_lists as b WHERE collection_id = (SELECT collection_id FROM collections WHERE user_id = $2)`
    const params = [comicID, userID]
    const result = await client.query(query, params)

    return result.rows
}

export default async function handler(req, res) {
    const { comicID } = req.query
    const user = getUserOrRedirect(req, res)
    res.setHeader("Content-Type", "application/json")

    if (!comicID) res.status(404).json({ message: `Could not find a comic with ID of ${comicID}` })

    const client = await db.connect()
    try {
        const lists = await getLists(client, comicID, user.id)

        res.status(200).json(
            lists.map((list) => ({
                id: list.comic_list_id,
                name: list.name,
                isComicInList: list.iscomicinlist,
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
