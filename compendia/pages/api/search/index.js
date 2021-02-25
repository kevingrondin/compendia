const db = require("../../../util/database").instance

async function getComicSearchResults(client, searchQuery) {
    const query = `SELECT comic_id, title, item_number
        FROM comics WHERE document @@ plainto_tsquery('english', $1) ORDER BY ts_rank(document, plainto_tsquery('english', $1)) DESC, release_date DESC;`
    const params = [searchQuery]
    const result = await client.query(query, params)

    return result.rows
}

async function getSeriesSearchResults(client, searchQuery) {
    const query = `SELECT series_id, name
        FROM series WHERE document @@ plainto_tsquery('english', $1) ORDER BY ts_rank(document, plainto_tsquery('english', $1)) DESC;`
    const params = [searchQuery]
    const result = await client.query(query, params)

    return result.rows
}

async function getPublisherSearchResults(client, searchQuery) {
    const query = `SELECT publisher_id, name
        FROM publishers WHERE document @@ plainto_tsquery('english', $1) ORDER BY ts_rank(document, plainto_tsquery('english', $1)) DESC;`
    const params = [searchQuery]
    const result = await client.query(query, params)

    return result.rows
}

async function getImprintSearchResults(client, searchQuery) {
    const query = `SELECT imprint_id, name
        FROM imprints WHERE document @@ plainto_tsquery('english', $1) ORDER BY ts_rank(document, plainto_tsquery('english', $1)) DESC;`
    const params = [searchQuery]
    const result = await client.query(query, params)

    return result.rows
}

async function getCreatorSearchResults(client, searchQuery) {
    const query = `SELECT creator_id, name
        FROM creators WHERE document @@ plainto_tsquery('english', $1) ORDER BY ts_rank(document, plainto_tsquery('english', $1)) DESC;`
    const params = [searchQuery]
    const result = await client.query(query, params)

    return result.rows
}

export default async function handler(req, res) {
    const { searchQuery } = req.query
    res.setHeader("Content-Type", "application/json")

    const client = await db.connect()
    try {
        const comicSearchResults = await getComicSearchResults(client, searchQuery)
        const seriesSearchResults = await getSeriesSearchResults(client, searchQuery)
        const publisherSearchResults = await getPublisherSearchResults(client, searchQuery)
        const imprintSearchResults = await getImprintSearchResults(client, searchQuery)
        const creatorSearchResults = await getCreatorSearchResults(client, searchQuery)

        res.status(200).json({
            comics: comicSearchResults
                ? comicSearchResults.map((comic) => {
                      return {
                          id: comic.comic_id,
                          title: comic.title,
                          itemNumber: comic.item_number,
                      }
                  })
                : [],
            series: seriesSearchResults
                ? seriesSearchResults.map((series) => {
                      return {
                          id: series.series_id,
                          name: series.name,
                      }
                  })
                : [],
            publishers: publisherSearchResults
                ? publisherSearchResults.map((publisher) => {
                      return {
                          id: publisher.publisher_id,
                          name: publisher.name,
                      }
                  })
                : [],
            imprints: imprintSearchResults
                ? imprintSearchResults.map((imprint) => {
                      return {
                          id: imprint.imprint_id,
                          name: imprint.name,
                      }
                  })
                : [],
            creators: creatorSearchResults
                ? creatorSearchResults.map((creator) => {
                      return {
                          id: creator.creator_id,
                          name: creator.name,
                      }
                  })
                : [],
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
