import { db } from "@util/database"

async function getCreatorDetails(client, creatorID) {
    const query = `SELECT cr.name, cr.creator_id FROM creators as cr WHERE cr.creator_id = $1`
    const params = [creatorID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1)
        res.status(404).json({ message: `Could not find a creator with ID of ${creatorID}` })
    else return result.rows[0]
}

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { creatorID } = req.query

    if (!creatorID) res.status(404).json({ message: `Creator ID cannot be null` })

    const client = await db.connect()
    try {
        const creator = await getCreatorDetails(client, creatorID)

        res.status(200).json({
            id: parseInt(creator.creator_id),
            name: creator.name,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
