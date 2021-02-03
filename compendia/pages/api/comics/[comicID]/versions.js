const db = require("../../../../util/database").instance

async function getComicDetails(client, res, comicID) {
    const query = `SELECT title, version_of FROM comics WHERE comic_id = $1`
    const params = [comicID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1) res.status(404).json({ message: "Comic not found" })
    else return result.rows[0]
}

async function getComicVersions(client, comicID, versionOf) {
    const isParentComic = versionOf === null
    const params = isParentComic ? [comicID] : [comicID, comic.version_of]
    const query = `SELECT comic_id, title, cover FROM comics as c
        WHERE ${
            isParentComic
                ? "version_of = $1"
                : "comic_id = $2 OR (version_of = $2 AND comic_id != $1)"
        }
        ORDER BY c.release_date DESC
        FETCH FIRST 30 ROWS ONLY`
    const result = await client.query(query, params)

    return result.rows
}

export default async function handler(req, res) {
    const { comicID } = req.query
    const client = await db.connect()
    res.setHeader("Content-Type", "application/json")

    if (!comicID) res.status(404).json({ message: `Could not find a comic with ID of ${comicID}` })

    try {
        const comic = await getComicDetails(client, res, comicID)
        const comicVersionsList = await getComicVersions(client, comicID, comic.version_of)

        res.status(200).json({
            id: parseInt(comicID),
            title: comic.title,
            versions: comicVersionsList.map((comic) => {
                return {
                    id: parseInt(comic.comic_id),
                    title: comic.title,
                    cover: comic.cover,
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
