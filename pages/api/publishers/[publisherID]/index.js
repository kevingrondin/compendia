import { getUserOrRedirect } from "@util/cookie"
import { db } from "@util/database"

async function getPublisherDetails(client, res, publisherID) {
    const query = `SELECT name, 
    (SELECT COUNT(*) FROM comics as c FULL JOIN series as s USING(series_id)
        FULL JOIN publishers as p ON p.publisher_id = s.publisher_id WHERE p.publisher_id = $1) as comics_count,
    (SELECT COUNT(*) FROM series as s WHERE publisher_id = $1) as series_count,
    (SELECT COUNT(*) FROM imprints as i WHERE publisher_id = $1) as imprints_count
    FROM publishers WHERE publisher_id = $1`
    const params = [publisherID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1) res.status(404).json({ message: "Publisher not found" })
    else return result.rows[0]
}

async function getPublisherSeriesList(client, publisherID) {
    const query = `SELECT series_id, name,
        (SELECT release_date FROM comics WHERE series_id = s.series_id ORDER BY release_date DESC LIMIT 1) as release_date
        FROM series as s WHERE publisher_id = $1
        ORDER BY release_date DESC FETCH FIRST 10 ROWS ONLY`
    const params = [publisherID]
    const result = await client.query(query, params)

    return result.rows
}

async function getPublisherComicsList(client, publisherID) {
    const query = `SELECT comic_id, title, cover
        FROM comics as c FULL JOIN series as s USING(series_id)
        FULL JOIN publishers USING(publisher_id) WHERE publisher_id = $1
        ORDER BY c.release_date DESC
        FETCH FIRST 15 ROWS ONLY`
    const params = [publisherID]
    const result = await client.query(query, params)

    return result.rows
}

export default async function handler(req, res) {
    const { publisherID } = req.query
    getUserOrRedirect(req, res)
    res.setHeader("Content-Type", "application/json")

    if (!publisherID)
        res.status(404).json({ message: `Could not find a publisher with ID of ${publisherID}` })

    const client = await db.connect()
    try {
        const publisher = await getPublisherDetails(client, res, publisherID)
        const seriesList = await getPublisherSeriesList(client, publisherID)
        const comicsList = await getPublisherComicsList(client, publisherID)

        res.status(200).json({
            id: parseInt(publisherID),
            name: publisher.name,
            seriesCount: publisher.series_count,
            imprintsCount: publisher.imprints_count,
            comicsCount: publisher.comics_count,
            seriesList: seriesList.map((series) => {
                return {
                    id: parseInt(series.series_id),
                    name: series.name,
                    cover: series.cover,
                }
            }),
            comicsList: comicsList.map((comic) => {
                return {
                    id: comic.comic_id,
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
