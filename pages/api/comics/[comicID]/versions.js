const db = require("../../../../util/database").instance

async function getComicDetails(client, res, comicID) {
    const query = `SELECT title, item_number, version_of, is_variant_root FROM comics WHERE comic_id = $1`
    const params = [comicID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1) res.status(404).json({ message: "Comic not found" })
    else return result.rows[0]
}

async function getComicVersions(client, comicID, versionOf, isVariantRoot) {
    const query = `SELECT comic_id, title, item_number, cover, variant_types FROM comics as c
    WHERE ${
        isVariantRoot ? `version_of = $1` : `comic_id = $2 OR (version_of = $2 AND comic_id != $1)`
    } ORDER BY c.release_date DESC FETCH FIRST 30 ROWS ONLY`
    const params = isVariantRoot ? [comicID] : [comicID, versionOf]
    const result = await client.query(query, params)

    return result.rows
}

export default async function handler(req, res) {
    const { comicID } = req.query
    res.setHeader("Content-Type", "application/json")

    if (!comicID) res.status(404).json({ message: `Could not find a comic with ID of ${comicID}` })

    const client = await db.connect()
    try {
        const comic = await getComicDetails(client, res, comicID)
        const comicVersionsList = await getComicVersions(
            client,
            comicID,
            comic.version_of,
            comic.is_variant_root
        )

        res.status(200).json({
            id: parseInt(comicID),
            title: comic.title,
            itemNumber: comic.item_number,
            versions: comicVersionsList.map((comic) => {
                return {
                    id: parseInt(comic.comic_id),
                    title: comic.title,
                    itemNumber: comic.item_number,
                    cover: comic.cover,
                    variantTypes: comic.variant_types
                        ? comic.variant_types
                              .map((type) => {
                                  if (type === "spr" || type === "rpr") return "Reprint"
                                  else if (type === "cvr" || type === "cvl") return "Cover"
                              })
                              .join(" / ")
                        : null,
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
