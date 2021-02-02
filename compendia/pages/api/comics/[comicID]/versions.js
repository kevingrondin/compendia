import { getUserOrRedirect } from "@util/cookie"
const db = require("../../../../util/database").instance

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { comicID } = req.query
    getUserOrRedirect(req, res)

    if (!comicID) res.status(404).json({ message: `Could not find a comic with ID of ${comicID}` })

    const client = await db.connect()
    try {
        const comicQuery = `SELECT title, version_of FROM comics WHERE comic_id = $1`
        const comicParams = [comicID]
        const comicResult = await client.query(comicQuery, comicParams)
        if (comicResult.rows.length !== 1) res.status(404).json({ message: "Comic not found" })
        const comic = comicResult.rows[0]

        // If version_of is null, the comic is a parent version (has no "version_of") so we get all the
        // versions of it in the query below otherwise, it's a child version (has a "version_of") so we
        // get all of its sibling versions and the parent comic
        let versionsWhere = ""
        let versionsParams = []
        if (comic.version_of === null) {
            versionsWhere = "version_of = $1"
            versionsParams = [comicID]
        } else {
            versionsWhere = "comic_id = $2 OR (version_of = $2 AND comic_id != $1)"
            versionsParams = [comicID, comic.version_of]
        }
        const versionsQuery = `SELECT comic_id, title, cover FROM comics as c WHERE ${versionsWhere}`
        const versionsResult = await client.query(versionsQuery, versionsParams)

        res.status(200).json({
            id: parseInt(comicID),
            title: comic.title,
            versions: versionsResult.rows.map((comic) => {
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
