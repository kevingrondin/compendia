const db = require("../../../../database").instance

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { creatorID } = req.query

    const types = req.query.types.split("/")

    if (!creatorID) res.status(404).json({ message: `Creator ID cannot be null` })

    const client = await db.connect()
    try {
        let creatorTypes = ""

        if (types && types.length > 0 && types[0] !== "All") creatorTypes = types

        const comicsQuery = `SELECT c.comic_id, c.cover, c.title, cc.creator_types
                    FROM comics as c
                    FULL JOIN comic_creators as cc USING(comic_id)
                    WHERE cc.creator_id = $1 ${
                        creatorTypes !== "" ? "AND $2 && cc.creator_types" : ""
                    }
                    ORDER BY c.release_date DESC
                    FETCH FIRST 30 ROWS ONLY`
        const comicsParams = creatorTypes !== "" ? [creatorID, types] : [creatorID]
        const comicsResult = await client.query(comicsQuery, comicsParams)

        console.log("GOOOO", comicsQuery, creatorTypes)
        console.log("Comics Result:", comicsResult)

        res.status(200).json({
            comics: comicsResult.rows.map((comic) => {
                return {
                    id: parseInt(comic.comic_id),
                    cover: comic.cover,
                    title: comic.title,
                    creatorTypes: comic.creator_types,
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
