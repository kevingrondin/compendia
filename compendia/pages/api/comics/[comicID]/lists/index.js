import { getUserOrRedirect } from "@util/cookie"
const db = require("../../../../../util/database").instance

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { comicID } = req.query
    const user = getUserOrRedirect(req, res)

    if (!comicID) res.status(404).json({ message: `Could not find a comic with ID of ${comicID}` })

    const client = await db.connect()
    try {
        const listsQuery = `SELECT comic_list_id, name,
            EXISTS (SELECT 1 FROM comic_list_comics a
                WHERE a.comic_id = $1 AND b.comic_list_id = a.comic_list_id ) as isComicInList
            FROM comic_lists as b
            WHERE collection_id = (SELECT collection_id FROM collections WHERE user_id = $2)`
        const listsQueryParams = [comicID, user.id]
        const listsResult = await client.query(listsQuery, listsQueryParams)

        res.status(200).json(
            listsResult.rows.map((list) => ({
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
