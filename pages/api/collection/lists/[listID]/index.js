import { getUserOrRedirect } from "@util/cookie"
const db = require("../../../../../util/database").instance

async function getListDetails(client, listID) {
    const query = `SELECT name, comic_list_id FROM comic_lists WHERE comic_list_id = $1`
    const params = [listID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1)
        res.status(404).json({ message: `Could not find a list with ID of ${listID}` })
    else return result.rows[0]
}

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { listID } = req.query
    getUserOrRedirect(req, res)

    if (!listID) res.status(404).json({ message: `List ID cannot be null` })

    const client = await db.connect()
    try {
        const list = await getListDetails(client, listID)

        res.status(200).json({
            id: parseInt(list.comic_list_id),
            name: list.name,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
