import { db } from "@util/database"
import { getUserOrRedirect } from "@util/cookie"

async function getPullListSeries(client, seriesID, userID) {
    const query = `SELECT include_single_issues, include_subsequent_printings, include_reprints, include_cover_variants,
        include_tpbs, include_hardcovers, include_omnibuses, include_compendia, include_all, include_graphic_novels
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
            include_subsequent_printings = $4,
            include_reprints = $5,
            include_cover_variants = $6,
            include_tpbs = $7,
            include_hardcovers = $8,
            include_omnibuses = $9,
            include_compendia = $10,
            include_all = $11,
            include_graphic_novels = $12
        FROM collections as c
        WHERE c.user_id = $1 AND series_id = $2
        RETURNING *`
    const params = [
        userID,
        seriesID,
        reqBody.includeSingleIssues,
        reqBody.includeSubPrintings,
        reqBody.includeReprints,
        reqBody.includeCoverVariants,
        reqBody.includeTPBs,
        reqBody.includeHardcovers,
        reqBody.includeOmnibuses,
        reqBody.includeCompendia,
        reqBody.includeAll,
        reqBody.isGraphicNovelSeries,
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

async function addComicsBySeriesAndFormats(
    client,
    reqBody,
    seriesID,
    isGraphicNovelSeries,
    userID
) {
    const formats = []
    if (isGraphicNovelSeries) {
        formats.push("'Graphic Novel'")
        formats.push("'Graphic Novel Hardcover'")
    }
    if (reqBody.includeSingleIssues) formats.push("'Single Issue'")
    if (reqBody.includeTPBs) formats.push("'Trade Paperback'")
    if (reqBody.includeHardcovers) formats.push("'Hardcover'")
    if (reqBody.includeOmnibuses) {
        formats.push("'Omnibus'")
        formats.push("'Omnibus Hardcover'")
    }
    if (reqBody.includeCompendia) {
        formats.push("'Compendium'")
        formats.push("'Compendium Hardcover'")
    }

    const query = `INSERT INTO pull_list_comics (comic_id, collection_id)
        SELECT col.collection_id, c.comic_id FROM collections as col
        CROSS JOIN comics as c FULL JOIN series as s USING(series_id)
        WHERE col.user_id = $1 AND c.series_id = $2 AND
        c.format IN (${formats.join(", ")})
        ${
            isGraphicNovelSeries === false
                ? `${
                      reqBody.includeSubPrintings === false
                          ? "AND NOT ('spr' = ANY (variant_types))"
                          : ""
                  }
                ${reqBody.includeReprints === false ? "AND NOT ('rpr' = ANY (variant_types))" : ""}
                ${
                    reqBody.includeVariantCovers === false
                        ? "AND NOT (('cvr' = ANY (variant_types)) OR (('cvl' = ANY (variant_types)) AND (is_variant_root = false OR is_temp_variant_root = true)))"
                        : ""
                }`
                : ``
        }
        AND c.release_date >= CURRENT_DATE`
    const params = [userID, seriesID]
    await client.query(query, params)
}

async function subscribeToSeries(client, res, seriesID, isGraphicNovelSeries, userID) {
    const query = `INSERT INTO pull_list_series(collection_id, series_id, include_single_issues, include_graphic_novels)
        SELECT collection_id, $1, $2, $3 FROM collections WHERE user_id = $4
        RETURNING *`
    const params = [seriesID, !isGraphicNovelSeries, isGraphicNovelSeries, userID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1) {
        await client.query("ROLLBACK")
        res.status(400).json({ message: "Could not subscribe to series" })
    } else return result.rows[0]
}

async function addComicsBySeries(client, seriesID, isGraphicNovelSeries, userID) {
    const query = `INSERT INTO pull_list_comics (collection_id, comic_id)
        SELECT col.collection_id, c.comic_id FROM collections as col
        CROSS JOIN comics as c FULL JOIN series as s USING(series_id)
        WHERE col.user_id = $1 AND c.series_id = $2 AND ${
            isGraphicNovelSeries
                ? `(c.format = 'Graphic Novel' OR c.format = 'Graphic Novel Hardcover')`
                : `c.format = 'Single Issue'`
        }
        AND c.is_variant_root = true AND c.is_temp_variant_root = false AND c.release_date >= CURRENT_DATE`
    const params = [userID, seriesID]
    await client.query(query, params)
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
    }
}

export default async function handler(req, res) {
    const { seriesID } = req.query
    const isGraphicNovelSeries = req.query.isGraphicNovelSeries === "true"
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
                    includeSubPrintings: seriesDetails.details.include_subsequent_printings,
                    includeReprints: seriesDetails.details.include_reprints,
                    includeCoverVariants: seriesDetails.details.include_cover_variants,
                    includeTPBs: seriesDetails.details.include_tpbs,
                    includeHardcovers: seriesDetails.details.include_hardcovers,
                    includeOmnibuses: seriesDetails.details.include_omnibuses,
                    includeCompendia: seriesDetails.details.include_compendia,
                    includeAll: seriesDetails.details.include_all,
                    includeGraphicNovels: seriesDetails.details.include_graphic_novels,
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
                    isSubscribed: true,
                    includeSingleIssues: updatedDetails.include_single_issues,
                    includeSubPrintings: updatedDetails.include_subsequent_printings,
                    includeReprints: updatedDetails.include_reprints,
                    includeCoverVariants: updatedDetails.include_cover_variants,
                    includeTPBs: updatedDetails.include_tpbs,
                    includeHardcovers: updatedDetails.include_hardcovers,
                    includeOmnibuses: updatedDetails.include_omnibuses,
                    includeCompendia: updatedDetails.include_compendia,
                    includeAll: updatedDetails.include_all,
                    includeGraphicNovels: updatedDetails.include_graphic_novels,
                })
            } else {
                await client.query("ROLLBACK")
                res.status(400).json({ message: "Could not update pull list series" })
            }
        } else if (req.method === "POST") {
            await client.query("BEGIN")

            const seriesDetails = await subscribeToSeries(
                client,
                res,
                seriesID,
                isGraphicNovelSeries,
                user.id
            )

            if (seriesDetails.pull_list_series_id) {
                await addComicsBySeries(client, seriesID, isGraphicNovelSeries, user.id)
                await client.query("COMMIT")

                res.status(201).json({
                    isSubscribed: true,
                    includeSingleIssues: seriesDetails.include_single_issues,
                    includeSubPrintings: seriesDetails.include_subsequent_printings,
                    includeReprints: seriesDetails.include_reprints,
                    includeCoverVariants: seriesDetails.include_cover_variants,
                    includeTPBs: seriesDetails.include_tpbs,
                    includeHardcovers: seriesDetails.include_hardcovers,
                    includeOmnibuses: seriesDetails.include_omnibuses,
                    includeCompendia: seriesDetails.include_compendia,
                    includeAll: seriesDetails.include_all,
                    includeGraphicNovels: seriesDetails.include_graphic_novels,
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
