const db = require("../../../util/database").instance

async function getComicSearchResults(client, searchQuery) {
    const query = `SELECT comic_id, title, item_number, format, cover_letter, variant_description
        FROM comics WHERE document @@ plainto_tsquery('english', $1) ORDER BY ts_rank(document, plainto_tsquery('english', $1)) DESC, release_date DESC
        FETCH FIRST 25 ROWS ONLY;`
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
        const publisherResults = await getPublisherSearchResults(client, searchQuery)
        const imprintResults = await getImprintSearchResults(client, searchQuery)
        const seriesResults = await getSeriesSearchResults(client, searchQuery)
        const creatorResults = await getCreatorSearchResults(client, searchQuery)
        const comicResults = await getComicSearchResults(client, searchQuery)

        const resultSets = [
            { results: publisherResults, type: "Publisher" },
            { results: imprintResults, type: "Imprint" },
            { results: seriesResults, type: "Series" },
            { results: creatorResults, type: "Creator" },
            { results: comicResults, type: "Comic" },
        ]

        const combinedResults = []
        resultSets.forEach((resultSet) =>
            resultSet.results.forEach((result) => {
                const type = resultSet.type
                if (type === "Publisher")
                    combinedResults.push({ id: result.publisher_id, name: result.name, type })
                if (type === "Imprint")
                    combinedResults.push({ id: result.imprint_id, name: result.name, type })
                if (type === "Series")
                    combinedResults.push({ id: result.series_id, name: result.name, type })
                if (type === "Creator")
                    combinedResults.push({ id: result.creator_id, name: result.name, type })
                if (type === "Comic")
                    combinedResults.push({
                        id: result.comic_id,
                        title: result.title,
                        itemNumber: result.item_number,
                        coverLetter: result.cover_letter,
                        variantDescription: result.variant_description,
                        format: result.format,
                        type,
                    })
            })
        )

        res.status(200).json({
            results: combinedResults,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
