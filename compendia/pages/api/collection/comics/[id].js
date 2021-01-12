const db = require("../../../../database").instance
import { getUserOrRedirect } from "../../../../util/cookie"

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json")
    const { id } = req.query

    const user = getUserOrRedirect(req, res)

    const client = await db.connect()
    try {
        if (req.method === "POST") {
            const insert = `INSERT INTO collected_comics(collection_id, comic_id)
                SELECT collection_id, $1 FROM collections WHERE user_id = $2
                RETURNING collected_comic_id`
            const insertParams = [id, user.id]
            const insertResult = await client.query(insert, insertParams)

            if (insertResult.rows.length > 0) res.status(201).end()
            else throw new Error("Could not add comic to your collection")
        } else if (req.method === "PUT") {
            const { dateCollected, purchasePrice, boughtAt, condition, quantity, notes } = req.body

            const update = `UPDATE collected_comics as cc SET date_collected = $1, purchase_price = $2, bought_at = $3, condition = $4, quantity = $5, notes = $6
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
            const updateResult = await client.query(update, updateParams)

            console.log(updateResult)

            if (updateResult.rows.length > 0)
                res.status(200).json({
                    dateCollected: updateResult.date_collected,
                    purchasePrice: updateResult.purchase_price,
                    boughtAt: updateResult.bought_at,
                    condition: updateResult.condition,
                    quantity: updateResult.quantity,
                    notes: updateResult.notes,
                })
            else throw new Error("Could not update comic in your collection")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        client.release()
    }
}
