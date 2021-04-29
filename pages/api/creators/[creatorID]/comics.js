const db = require("../../../../util/database").instance

async function getCreatorComics(client, creatorTypes, creatorID) {
    const hasCreatorTypes = creatorTypes && creatorTypes.length > 0 && creatorTypes[0] !== "All"

    const query = `SELECT c.comic_id, c.cover, c.title, c.item_number, cc.creator_types
        FROM comics as c FULL JOIN comic_creators as cc USING(comic_id)
        WHERE cc.creator_id = $1 ${hasCreatorTypes ? "AND $2 && cc.creator_types" : ""}
        ORDER BY c.release_date DESC FETCH FIRST 30 ROWS ONLY`
    const params = hasCreatorTypes ? [creatorID, creatorTypes] : [creatorID]
    const result = await client.query(query, params)

    return result.rows
}

export default async function handler(req, res) {
    const { creatorID } = req.query
    const creatorTypes = req.query.types.split("/")
    res.setHeader("Content-Type", "application/json")

    if (!creatorID) res.status(404).json({ message: `Creator ID cannot be null` })

    const client = await db.connect()
    try {
        const comics = await getCreatorComics(client, creatorTypes, creatorID)

        res.status(200).json({
            comics: comics.map((comic) => {
                return {
                    id: parseInt(comic.comic_id),
                    cover: comic.cover,
                    title: comic.title,
                    itemNumber: comic.item_number,
                    creatorTypes: comic.creator_types.map((type) => {
                        if (type === "W") return "Writer"
                        else if (type === "A") return "Artist"
                        else if (type === "CA") return "Cover Artist"
                    }),
                }
            }),
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
