const db = require("../../../../../database").instance
import { getUserOrRedirect } from "../../../../../util/cookie"

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { seriesID } = req.query
    const user = getUserOrRedirect(req, res)
    const client = await db.connect()

    try {
        if (req.method === "GET") {
            const query = `SELECT include_single_issues, include_printings, include_variant_covers, include_tpbs, include_hardcovers, include_omnibuses, include_compendia, include_all
                FROM pull_list_series FULL JOIN collections USING(collection_id)
                WHERE user_id = $1 AND series_id = $2`
            const params = [user.id, seriesID]
            const result = await client.query(query, params)

            if (result.rows.length > 0) {
                const seriesDetails = result.rows[0]

                res.status(200).json({
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
            } else res.status(200).json({ isSubscribed: false })
        } else if (req.method === "PUT") {
            // TODO turn this into a transaction

            const seriesInsert = `UPDATE pull_list_series
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
                    RETURNING include_single_issues, include_printings, include_variant_covers, include_tpbs, include_hardcovers, include_omnibuses, include_compendia, include_all`
            const seriesParams = [
                user.id,
                seriesID,
                req.body.includeSingleIssues,
                req.body.includePrintings,
                req.body.includeVariantCovers,
                req.body.includeTPBs,
                req.body.includeHardcovers,
                req.body.includeOmnibuses,
                req.body.includeCompendia,
                req.body.includeAll,
            ]
            const seriesResult = await client.query(seriesInsert, seriesParams)

            if (seriesResult.rows.length > 0) {
                const deleteComics = `DELETE FROM pull_list_comics as plc
                    USING collections as col CROSS JOIN comics as c
                    LEFT JOIN series as s USING(series_id)
                    WHERE col.user_id = $1 AND col.collection_id = plc.collection_id
                        AND c.series_id = s.series_id AND c.series_id = $2 RETURNING *`
                const deleteComicsParams = [user.id, seriesID]
                await client.query(deleteComics, deleteComicsParams)

                const formats = []
                if (req.body.includeSingleIssues) formats.push("Comic")
                if (req.body.includeTPBs) formats.push("TPB")
                if (req.body.includeHardcovers) formats.push("Hardcover")
                if (req.body.includeOmnibuses) formats.push("Omnibus")
                if (req.body.includeCompendia) formats.push("Compendium")

                const insertComics = `INSERT INTO pull_list_comics (comic_id, collection_id)
                    SELECT col.collection_id, c.comic_id FROM collections as col
                    CROSS JOIN comics as c FULL JOIN series as s USING(series_id)
                    WHERE col.user_id = $1 AND c.series_id = $2 AND
                        c.format IN (${formats.join(", ")})
                        ${!req.body.includePrintings && "AND c.printing = 1"}
                        ${
                            req.body.includeSingleIssues &&
                            !req.body.includeVariantCovers &&
                            "AND c.version_of = NULL"
                        }
                        AND c.release_date >= CURRENT_DATE`

                const insertComicsParams = [user.id, seriesID]
                await client.query(insertComics, insertComicsParams)

                const seriesDetails = result.rows[0]

                res.status(200).json({
                    isSubscribed: req.body.isSubscribed,
                    includeSingleIssues: seriesDetails.include_single_issues,
                    includePrintings: seriesDetails.include_printings,
                    includeVariantCovers: seriesDetails.include_variant_covers,
                    includeTPBs: seriesDetails.include_tpbs,
                    includeHardcovers: seriesDetails.include_hardcovers,
                    includeOmnibuses: seriesDetails.include_omnibuses,
                    includeCompendia: seriesDetails.include_compendia,
                    includeAll: seriesDetails.include_all,
                })
            } else throw new Error("Could not update series in your pull list")
        } else if (req.method === "POST") {
            //TODO make this into a DB transaction

            const insertSeries = `INSERT INTO pull_list_series(collection_id, series_id)
                SELECT collection_id, $1 FROM collections WHERE user_id = $2
                RETURNING include_single_issues, include_printings, include_variant_covers, include_tpbs, include_hardcovers, include_omnibuses, include_compendia, include_all`
            const seriesParams = [seriesID, user.id]
            const seriesResult = await client.query(insertSeries, seriesParams)

            if (seriesResult.rows.length > 0) {
                const insertComics = `INSERT INTO pull_list_comics (comic_id, collection_id)
                SELECT col.collection_id, c.comic_id FROM collections as col
                CROSS JOIN comics as c FULL JOIN series as s USING(series_id)
                WHERE col.user_id = $1 AND c.series_id = $2 AND c.format = 'Comic' AND c.printing = 1 AND c.version_of = NULL AND c.release_date >= CURRENT_DATE`
                const comicsParams = [user.id, seriesID]
                await client.query(insertComics, comicsParams)

                const series = seriesResult.rows[0]
                res.status(201).json({
                    isSubscribed: true,
                    includeSingleIssues: series.include_single_issues,
                    includePrintings: series.include_printings,
                    includeVariantCovers: series.include_variant_covers,
                    includeTPBs: series.include_tpbs,
                    includeHardcovers: series.include_hardcovers,
                    includeOmnibuses: series.include_omnibuses,
                    includeCompendia: series.include_compendia,
                    includeAll: series.include_all,
                })
            } else throw new Error("Could not subscribe to series")
        } else if (req.method === "DELETE") {
            //TODO make this into a DB transaction

            const deleteSeries = `DELETE FROM pull_list_series as pls
                USING collections as c
                WHERE c.user_id = $1 AND c.collection_id = pls.collection_id AND pls.series_id = $2 RETURNING *`
            const seriesParams = [user.id, seriesID]
            const seriesResult = await client.query(deleteSeries, seriesParams)

            if (seriesResult.rows.length > 0) {
                const deleteComics = `DELETE FROM pull_list_comics as plc
                    USING collections as col CROSS JOIN comics as c
                    LEFT JOIN series as s USING(series_id)
                    WHERE col.user_id = $1 AND col.collection_id = plc.collection_id
                        AND c.series_id = s.series_id AND c.series_id = $2 RETURNING *`
                const comicsParams = [user.id, seriesID]
                await client.query(deleteComics, comicsParams)

                res.status(204).json({ isSubscribed: false })
            } else throw new Error("Could not unsubscribe from series")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
