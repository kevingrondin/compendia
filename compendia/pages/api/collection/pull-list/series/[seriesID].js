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
                    RETURNING *`
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
            const insert = `INSERT INTO pull_list_series(collection_id, series_id)
                SELECT collection_id, $1 FROM collections WHERE user_id = $2
                RETURNING pull_list_series_id`
            const params = [seriesID, user.id]
            const result = await client.query(insert, params)

            if (result.rows.length > 0) res.status(201).json({ isSubscribed: true })
            else throw new Error("Could not subscribe to series")
        } else if (req.method === "DELETE") {
            const del = `DELETE FROM pull_list_series as pls
                USING collections as c
                WHERE c.user_id = $1 AND c.collection_id = plc.collection_id AND pls.series_id = $2 RETURNING *`
            const params = [user.id, comicID]
            const result = await client.query(del, params)

            if (result.rows.length > 0) res.status(204).json({ isSubscribed: false })
            else throw new Error("Could not unsubscribe from series")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        client.release()
    }
}
