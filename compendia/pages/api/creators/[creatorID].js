const db = require("../../../database").instance

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { creatorID, sortBy } = req.query

    if (!creatorID) res.status(404).json({ message: `Creator ID cannot be null` })

    const client = await db.connect()
    try {
        const creatorQuery = `SELECT cr.name, cr.creator_id FROM creators as cr WHERE cr.creator_id = $1`
        const creatorParams = [creatorID]
        const creatorResult = await client.query(creatorQuery, creatorParams)

        if (creatorResult.rows.length < 1)
            res.status(404).json({ message: `Could not find a creator with ID of ${creatorID}` })

        if (sortBy === "releaseDate") {
            const creator = creatorResult.rows[0]
            const comicsQuery = `SELECT c.comic_id, c.cover, c.title, cc.creator_types
                    FROM comics as c
                    FULL JOIN comic_creators as cc USING(comic_id)
                    WHERE cc.creator_id = $1
                    ORDER BY c.release_date DESC
                    FETCH FIRST 30 ROWS ONLY`
            const comicsParams = [creator.creator_id]
            const comicsResult = await client.query(comicsQuery, comicsParams)

            res.status(200).json({
                id: parseInt(creator.creator_id),
                name: creator.name,
                comics: comicsResult.rows.map((comic) => {
                    return {
                        id: parseInt(comic.comic_id),
                        cover: comic.cover,
                        title: comic.title,
                        creatorTypes: comic.creator_types,
                    }
                }),
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
