const db = require("../../../../../util/database").instance
import { getUserOrRedirect } from "@util/cookie"

async function getPullListSeries(client, seriesID, userID) {
    const query = `SELECT include_single_issues, include_printings, include_variant_covers,
        include_tpbs, include_hardcovers, include_omnibuses, include_compendia, include_all
        FROM pull_list_series FULL JOIN collections USING(collection_id)
        WHERE user_id = $1 AND series_id = $2`
    const params = [userID, seriesID]
    const result = await client.query(query, params)

    return result.rows.length === 1
        ? { isSubscribed: true, details: result.rows[0] }
        : { isSubscribed: false }
}

async function updateSeriesDetails(client, res, reqBody, seriesID, userID) {
    const query = `UPDATE pull_list_series
        SET include_single_issues = $3,
            include_printings = $4,
            include_variant_covers = $5,
            include_tpbs = $6,
            include_hardcovers = $7,
            include_omnibuses = $8,
            include_compendia = $9,
            include_all = $10
        FROM collections as c
        WHERE c.user_id = $1 AND series_id = $2
        RETURNING pull_list_series_id, include_single_issues, include_printings, include_variant_covers,
        include_tpbs, include_hardcovers, include_omnibuses, include_compendia, include_all`
    const params = [
        userID,
        seriesID,
        reqBody.includeSingleIssues,
        reqBody.includePrintings,
        reqBody.includeVariantCovers,
        reqBody.includeTPBs,
        reqBody.includeHardcovers,
        reqBody.includeOmnibuses,
        reqBody.includeCompendia,
        reqBody.includeAll,
    ]
    const result = await client.query(query, params)

    if (result.rows.length !== 1) {
        await client.query("ROLLBACK")
        res.status(400).json({ message: "Could not update series in pull list" })
    } else return result.rows[0]
}

async function clearComicsBySeries(client, seriesID, userID) {
    const query = `DELETE FROM pull_list_comics as plc
        USING collections as col CROSS JOIN comics as c
        LEFT JOIN series as s USING(series_id)
        WHERE col.user_id = $1 AND col.collection_id = plc.collection_id
        AND c.series_id = s.series_id AND c.series_id = $2 RETURNING *`
    const params = [userID, seriesID]
    await client.query(query, params)

    return
}

async function addComicsBySeriesAndFormats(client, reqBody, seriesID, userID) {
    const formats = []
    if (reqBody.includeSingleIssues) formats.push("'Comic'")
    if (reqBody.includeTPBs) formats.push("'TPB'")
    if (reqBody.includeHardcovers) formats.push("'Hardcover'")
    if (reqBody.includeOmnibuses) formats.push("'Omnibus'")
    if (reqBody.includeCompendia) formats.push("'Compendium'")

    const query = `INSERT INTO pull_list_comics (comic_id, collection_id)
        SELECT col.collection_id, c.comic_id FROM collections as col
        CROSS JOIN comics as c FULL JOIN series as s USING(series_id)
        WHERE col.user_id = $1 AND c.series_id = $2 AND
        c.format IN (${formats.join(", ")})
        ${!reqBody.includePrintings ? "AND c.printing = 1" : ""}
        ${
            reqBody.includeSingleIssues && !reqBody.includeVariantCovers
                ? "AND c.version_of = NULL"
                : ""
        }
        AND c.release_date >= CURRENT_DATE`
    const params = [userID, seriesID]
    await client.query(query, params)

    return
}

async function subscribeToSeries(client, res, seriesID, userID) {
    const query = `INSERT INTO pull_list_series(collection_id, series_id)
        SELECT collection_id, $1 FROM collections WHERE user_id = $2
        RETURNING pull_list_series_id, include_single_issues, include_printings, include_variant_covers,
        include_tpbs, include_hardcovers, include_omnibuses, include_compendia, include_all`
    const params = [seriesID, userID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1) {
        await client.query("ROLLBACK")
        res.status(400).json({ message: "Could not subscribe to series" })
    } else return result.rows[0]
}

async function addComicsBySeries(client, seriesID, userID) {
    const query = `INSERT INTO pull_list_comics (comic_id, collection_id)
        SELECT col.collection_id, c.comic_id FROM collections as col
        CROSS JOIN comics as c FULL JOIN series as s USING(series_id)
        WHERE col.user_id = $1 AND c.series_id = $2 AND c.format = 'Comic'
        AND c.printing = 1 AND c.version_of = NULL AND c.release_date >= CURRENT_DATE`
    const params = [userID, seriesID]
    await client.query(query, params)

    return
}

async function unsubscribeFromSeries(client, res, seriesID, userID) {
    const query = `DELETE FROM pull_list_series as pls
                USING collections as c
                WHERE c.user_id = $1 AND c.collection_id = pls.collection_id AND pls.series_id = $2 RETURNING *`
    const params = [userID, seriesID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1) {
        await client.query("ROLLBACK")
        res.status(400).json({ message: "Could not unsubscribe from series" })
    } else return
}

export default async function handler(req, res) {
    const { seriesID } = req.query
    const user = getUserOrRedirect(req, res)
    res.setHeader("Content-Type", "application/json")

    const client = await db.connect()
    try {
        if (req.method === "GET") {
            const seriesDetails = await getPullListSeries(client, seriesID, user.id)

            if (seriesDetails.isSubscribed) {
                res.status(200).json({
                    isSubscribed: seriesDetails.isSubscribed,
                    includeSingleIssues: seriesDetails.details.include_single_issues,
                    includePrintings: seriesDetails.details.include_printings,
                    includeVariantCovers: seriesDetails.details.include_variant_covers,
                    includeTPBs: seriesDetails.details.include_tpbs,
                    includeHardcovers: seriesDetails.details.include_hardcovers,
                    includeOmnibuses: seriesDetails.details.include_omnibuses,
                    includeCompendia: seriesDetails.details.include_compendia,
                    includeAll: seriesDetails.details.include_all,
                })
            } else res.status(200).json({ isSubscribed: seriesDetails.isSubscribed })
        } else if (req.method === "PUT") {
            await client.query("BEGIN")

            const updatedDetails = await updateSeriesDetails(
                client,
                res,
                req.body,
                seriesID,
                user.id
            )

            if (updatedDetails.pull_list_series_id) {
                await clearComicsBySeries(client, seriesID, user.id)
                await addComicsBySeriesAndFormats(client, req.body, seriesID, user.id)
                await client.query("COMMIT")

                res.status(200).json({
                    isSubscribed: req.body.isSubscribed,
                    includeSingleIssues: updatedDetails.include_single_issues,
                    includePrintings: updatedDetails.include_printings,
                    includeVariantCovers: updatedDetails.include_variant_covers,
                    includeTPBs: updatedDetails.include_tpbs,
                    includeHardcovers: updatedDetails.include_hardcovers,
                    includeOmnibuses: updatedDetails.include_omnibuses,
                    includeCompendia: updatedDetails.include_compendia,
                    includeAll: updatedDetails.include_all,
                })
            } else {
                await client.query("ROLLBACK")
                res.status(400).json({ message: "Could not update pull list series" })
            }
        } else if (req.method === "POST") {
            await client.query("BEGIN")

            const seriesDetails = await subscribeToSeries(client, res, seriesID, user.id)

            if (seriesDetails.pull_list_series_id) {
                await addComicsBySeries(client, seriesID, user.id)
                await client.query("COMMIT")

                res.status(201).json({
                    isSubscribed: true,
                    includeSingleIssues: seriesDetails.include_single_issues,
                    includePrintings: seriesDetails.include_printings,
                    includeVariantCovers: seriesDetails.include_variant_covers,
                    includeTPBs: seriesDetails.include_tpbs,
                    includeHardcovers: seriesDetails.include_hardcovers,
                    includeOmnibuses: seriesDetails.include_omnibuses,
                    includeCompendia: seriesDetails.include_compendia,
                    includeAll: seriesDetails.include_all,
                })
            } else {
                await client.query("ROLLBACK")
                res.status(400).json({ message: "Could not subscribe to series" })
            }
        } else if (req.method === "DELETE") {
            await client.query("BEGIN")

            await unsubscribeFromSeries(client, res, seriesID, user.id)
            await clearComicsBySeries(client, seriesID, user.id)
            await client.query("COMMIT")

            res.status(204).json({ isSubscribed: false })
        }
    } catch (error) {
        if (req.method === "PUT" || req.method === "POST" || req.method === "DELETE")
            await client.query("ROLLBACK")
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
