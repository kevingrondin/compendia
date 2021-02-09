import { getUserOrRedirect } from "@util/cookie"
const db = require("../../util/database").instance

async function getPublisherDetails(client, res, publisherID) {
    const query = `SELECT name, 
    (SELECT COUNT(*) FROM comics FULL JOIN series as s USING(series_id)
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
    const query = `SELECT series_id, name
        FROM series WHERE publisher_id = $1
        ORDER BY name DESC FETCH FIRST 30 ROWS ONLY`
    const params = [publisherID]
    const result = await client.query(query, params)

    return result.rows
}

async function getPublisherImprintsList(client, publisherID) {
    const query = `SELECT imprint_id, name
        FROM imprints WHERE publisher_id = $1
        ORDER BY name DESC FETCH FIRST 30 ROWS ONLY`
    const params = [publisherID]
    const result = await client.query(query, params)

    return result.rows
}

async function getPublisherComicsList(client, publisherID) {
    const query = `SELECT comic_id, title, item_number, cover
        FROM comics WHERE series_id = $1
        ORDER BY c.release_date DESC
        FETCH FIRST 30 ROWS ONLY`
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
        const imprintsList = await getPublisherImprintsList(client, publisherID)

        res.status(200).json({
            id: parseInt(publisherID),
            name: publisher.name,
            seriesCount: publisher.series_count,
            imprintsCount: publisher.imprints_count,
            comicsCount: publisher.comics_count,
            seriesList: seriesList.map((series) => {
                return {
                    id: parseInt(series.comic_id),
                    name: series.name,
                    cover: series.cover,
                }
            }),
            imprintsList: imprintsList.map((imprint) => {
                return {
                    id: imprint.imprint_id,
                    name: imprint.name,
                }
            }),
            comicsList: comicsList.map((comic) => {
                return {
                    id: comic.comic_id,
                    title: comic.title,
                    itemNumber: comic.item_number,
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
