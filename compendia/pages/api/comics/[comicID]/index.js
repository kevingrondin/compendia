import { getUserOrRedirect } from "@util/cookie"
import { format } from "date-fns"
const db = require("../../../../util/database").instance

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

        // The case/when in the below query is to retrieve the versions of the comic for one of the two scenarios:
        // 1. The comic is a parent version (has no "version_of") so we get all the versions of it
        // 2. The comic is a child version (has a "version_of") so we get all of its sibling versions and add 1 for the parent
        const comicQuery = `SELECT c.comic_id, title, cover, release_date, cover_price, description, age_rating, format, printing,
                p.publisher_id, p.name as publisher_name, s.series_id, s.name as series_name, i.imprint_id, i.name as imprint_name,
                EXISTS (SELECT 1 FROM collected_comics WHERE comic_id = $1 AND collection_id = $2 ) as is_collected,
                (CASE WHEN version_of IS NULL THEN (SELECT COUNT(*) FROM comics WHERE version_of = c.comic_id)
				    ELSE (SELECT COUNT(*) FROM comics WHERE version_of = c.version_of AND comic_id != c.comic_id + 1) END) as versions
            FROM comics as c
            FULL JOIN series as s ON c.series_id = s.series_id
            FULL JOIN publishers as p ON s.publisher_id = p.publisher_id
            FULL JOIN imprints as i ON i.publisher_id = p.publisher_id
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
                otherVersions: comic.versions,
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
        await client.end()
        await client.release()
    }
}
