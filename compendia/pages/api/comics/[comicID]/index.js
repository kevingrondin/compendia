import { getUserOrRedirect } from "../../../../util/cookie"
import { format } from "date-fns"
const db = require("../../../../database").instance

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { comicID } = req.query
    const user = getUserOrRedirect(req, res)

    if (!comicID) res.status(404).json({ message: `Could not find a comic with ID of ${comicID}` })

    const client = await db.connect()
    try {
        const collectionQuery = `SELECT collection_id FROM collections WHERE user_id = $1`
        const collectionParams = [user.id]
        const collectionResult = await client.query(collectionQuery, collectionParams)
        if (collectionResult.rows.length !== 1) throw new Error("Could not find user")

        const collectionID = collectionResult.rows[0].collection_id

        const comicQuery = `SELECT c.comic_id, title, cover, release_date, cover_price, description, age_rating, format, printing, p.publisher_id, p.name as publisher_name, s.series_id, s.name as series_name, i.imprint_id, i.name as imprint_name, versions,
            EXISTS (SELECT 1 FROM collected_comics WHERE comic_id = $1 AND collection_id = $2 ) as is_collected
            FROM comics as c
            FULL JOIN series as s ON c.series_id = s.series_id
            FULL JOIN publishers as p ON s.publisher_id = p.publisher_id
            FULL JOIN imprints as i ON i.publisher_id = p.publisher_id
            CROSS JOIN (SELECT COUNT(*) as versions FROM comics WHERE version_of = $1) as v
            WHERE c.comic_id = $1`
        const comicQueryParams = [comicID, collectionID]
        const comicResult = await client.query(comicQuery, comicQueryParams)

        const creatorsQuery = `SELECT creator_id, name, creator_types
            FROM creators FULL JOIN comic_creators USING(creator_id)
            WHERE comic_id = $1`
        const creatorsParams = [comicID]
        const creatorsResult = await client.query(creatorsQuery, creatorsParams)

        if (comicResult.rows.length > 0) {
            const comic = comicResult.rows[0]
            const creators = creatorsResult.rows

            res.status(200).json({
                id: parseInt(comic.comic_id),
                title: comic.title,
                cover: comic.cover,
                releaseDate: format(comic.release_date, "yyyy-MM-dd"),
                coverPrice: comic.cover_price,
                description: comic.description,
                ageRating: comic.age_rating,
                format: comic.format,
                printing: comic.printing,
                publisherID: comic.publisher_id,
                publisherName: comic.publisher_name,
                seriesID: comic.series_id,
                seriesName: comic.series_name,
                imprintID: comic.imprint_id,
                imprintName: comic.imprint_name,
                versions: comic.versions,
                isCollected: comic.is_collected,
                creators: creators.map((creator) => {
                    return {
                        id: parseInt(creator.creator_id),
                        name: creator.name,
                        types: creator.creator_types,
                    }
                }),
            })
        } else res.status(404).json({ message: `Could not find a comic with ID of ${comicID}` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        client.release()
    }
}
