const db = require("../../../../database").instance
import { format } from "date-fns"
import { getUserOrRedirect } from "../../../../util/cookie"

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { id } = req.query

    const user = getUserOrRedirect(req, res)

    const client = await db.connect()
    try {
        if (req.method === "GET") {
            const getQuery = `SELECT date_collected, purchase_price, bought_at, condition, quantity, notes
                FROM collected_comics as cc FULL JOIN collections as c USING(collection_id) WHERE c.user_id = $1 AND cc.comic_id = $2`
            const getParams = [user.id, id]
            const getResult = await client.query(getQuery, getParams)

            if (getResult.rows.length > 0) {
                const result = getResult.rows[0]
                res.status(200).json({
                    dateCollected: result.date_collected
                        ? format(result.date_collected, "yyyy-MM-dd")
                        : result.date_collected,
                    purchasePrice: result.purchase_price,
                    boughtAt: result.bought_at,
                    condition: result.condition,
                    quantity: result.quantity,
                    notes: result.notes,
                })
            } else res.status(200).json({})
        } else if (req.method === "POST") {
            const insertQuery = `INSERT INTO collected_comics(collection_id, comic_id)
                SELECT collection_id, $1 FROM collections WHERE user_id = $2
                RETURNING collected_comic_id`
            const insertParams = [id, user.id]
            const insertResult = await client.query(insertQuery, insertParams)

            if (insertResult.rows.length > 0) res.status(201).end()
            else throw new Error("Could not add comic to your collection")
        } else if (req.method === "PUT") {
            const { dateCollected, purchasePrice, boughtAt, condition, quantity, notes } = req.body

            const updateQuery = `UPDATE collected_comics as cc SET date_collected = $1, purchase_price = $2, bought_at = $3, condition = $4, quantity = $5, notes = $6
                FROM collections as c WHERE c.user_id = $7 AND c.collection_id = cc.collection_id AND cc.comic_id = $8
                RETURNING date_collected, purchase_price, bought_at, condition, quantity, notes`
            const updateParams = [
                dateCollected,
                purchasePrice,
                boughtAt,
                condition,
                quantity,
                notes,
                user.id,
                id,
            ]
            const updateResult = await client.query(updateQuery, updateParams)

            if (updateResult.rows.length > 0) {
                const result = updateResult.rows[0]
                res.status(200).json({
                    dateCollected: format(result.date_collected, "yyyy-MM-dd"),
                    purchasePrice: result.purchase_price,
                    boughtAt: result.bought_at,
                    condition: result.condition,
                    quantity: result.quantity,
                    notes: result.notes,
                })
            } else throw new Error("Could not update comic in your collection")
        } else if (req.method === "DELETE") {
            const deleteQuery = `DELETE FROM collected_comics as cc
                USING collections as c WHERE c.user_id = $1 AND c.collection_id = cc.collection_id AND cc.comic_id = $2 RETURNING *`
            const deleteParams = [user.id, id]
            const deleteResult = await client.query(deleteQuery, deleteParams)

            if (deleteResult.rows.length > 0) res.status(204).end()
            else throw new Error("Could not remove comic from your collection")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
