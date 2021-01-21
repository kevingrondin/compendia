const db = require("../../../../../database").instance
import { getUserOrRedirect } from "../../../../../util/cookie"

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { seriesID } = req.query
    const user = getUserOrRedirect(req, res)
    const client = await db.connect()

    try {
        if (req.method === "GET") {
            const query = `SELECT include_standard_issues, include_variant_issues, include_tpb, include_collections, include_all
                FROM pull_list_series FULL JOIN collections USING(collection_id)
                WHERE user_id = $1 AND series_id = $2`
            const params = [user.id, seriesID]
            const result = await client.query(query, params)

            if (result.rows.length > 0) {
                const seriesDetails = result.rows[0]

                res.status(200).json({
                    isSubscribed: true,
                    includeStandard: seriesDetails.include_standard_issues,
                    includeVariants: seriesDetails.include_variant_issues,
                    includeTPB: seriesDetails.include_tpb,
                    includeCollections: seriesDetails.include_collections,
                    includeAll: seriesDetails.include_all,
                })
            } else res.status(200).json({ isSubscribed: false })
        } else if (req.method === "PUT") {
            const insert = `UPDATE pull_list_series
                SET include_standard_issues = $3,
                    include_variant_issues = $4,
                    include_tpb = $5,
                    include_collections = $6,
                    include_all = $7
                    FROM collections as c
                    WHERE c.user_id = $1 AND series_id = $2
                    RETURNING include_standard_issues, include_variant_issues, include_tpb, include_collections, include_all`
            const params = [
                user.id,
                seriesID,
                req.body.includeStandard,
                req.body.includeVariants,
                req.body.includeTPB,
                req.body.includeCollections,
                req.body.includeAll,
            ]
            const result = await client.query(insert, params)

            if (result.rows.length > 0) {
                const seriesDetails = result.rows[0]

                res.status(200).json({
                    isSubscribed: req.body.isSubscribed,
                    includeStandard: seriesDetails.include_standard_issues,
                    includeVariants: seriesDetails.include_variant_issues,
                    includeTPB: seriesDetails.include_tpb,
                    includeCollections: seriesDetails.include_collections,
                    includeAll: seriesDetails.include_all,
                })
            } else throw new Error("Could not update series in your pull list")
        } else if (req.method === "POST") {
            //TODO make this into a DB transaction

            const insertSeries = `INSERT INTO pull_list_series(collection_id, series_id)
                SELECT collection_id, $1 FROM collections WHERE user_id = $2
                RETURNING include_standard_issues, include_variant_issues, include_tpb, include_collections, include_all`
            const seriesParams = [seriesID, user.id]
            const seriesResult = await client.query(insertSeries, seriesParams)

            if (seriesResult.rows.length > 0) {
                const insertComics = `INSERT INTO pull_list_comics (comic_id, collection_id)
                SELECT col.collection_id, c.comic_id FROM collections as col
                CROSS JOIN comics as c FULL JOIN series as s USING(series_id)
                WHERE col.user_id = $1 AND c.series_id = $2 AND c.format = 'Comic' AND c.release_date >= CURRENT_DATE`
                const comicsParams = [user.id, seriesID]
                await client.query(insertComics, comicsParams)

                const series = seriesResult.rows[0]
                res.status(201).json({
                    isSubscribed: true,
                    includeStandard: series.include_standard_issues,
                    includeVariants: series.include_variant_issues,
                    includeTPB: series.include_tpb,
                    includeCollections: series.include_collections,
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
