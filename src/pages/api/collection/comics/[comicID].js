import { db } from "@util/database"
import { format } from "date-fns"
import { getUserOrRedirect } from "@util/cookie"

async function getCollectedComicDetails(client, res, comicID, userID) {
    const query = `SELECT date_collected, purchase_price, bought_at, condition, quantity, notes
        FROM collected_comics as cc FULL JOIN collections as c USING(collection_id)
        WHERE c.user_id = $1 AND cc.comic_id = $2`
    const params = [userID, comicID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1) res.status(404).json({ message: "No comic details returned" })
    else return result.rows[0]
}

async function addComicToCollection(client, res, comicID, userID) {
    const query = `INSERT INTO collected_comics(collection_id, comic_id)
        SELECT collection_id, $1 FROM collections WHERE user_id = $2
        RETURNING date_collected, purchase_price, bought_at, condition, quantity, notes`
    const params = [comicID, userID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1)
        res.status(400).json({ message: "Comic was not added to collection" })
    else return result.rows[0]
}

async function updateCollectedComicDetails(client, res, details) {
    const query = `UPDATE collected_comics as cc SET date_collected = $1, purchase_price = $2, bought_at = $3, condition = $4, quantity = $5, notes = $6
        FROM collections as c WHERE c.user_id = $7 AND c.collection_id = cc.collection_id AND cc.comic_id = $8
        RETURNING date_collected, purchase_price, bought_at, condition, quantity, notes`
    const params = [
        details.dateCollected,
        details.purchasePrice,
        details.boughtAt,
        details.condition,
        details.quantity,
        details.notes,
        details.userID,
        details.comicID,
    ]
    const result = await client.query(query, params)

    if (result.rows.length !== 1)
        res.status(400).json({ message: "Collection details were not updated" })
    else return result.rows[0]
}

async function removeComicFromCollection(client, res, comicID, userID) {
    const query = `DELETE FROM collected_comics as cc
        USING collections as c WHERE c.user_id = $1
        AND c.collection_id = cc.collection_id
        AND cc.comic_id = $2 RETURNING *`
    const params = [userID, comicID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1)
        res.status(400).json({ message: "Could not remove comic from collection" })
    else res.status(204).end()
}

export default async function handler(req, res) {
    const { comicID } = req.query
    const user = getUserOrRedirect(req, res)
    res.setHeader("Content-Type", "application/json")

    const client = await db.connect()
    try {
        if (req.method === "GET") {
            const comicDetails = await getCollectedComicDetails(client, res, comicID, user.id)

            res.status(200).json({
                dateCollected: format(comicDetails.date_collected, "yyyy-MM-dd"),
                purchasePrice: comicDetails.purchase_price,
                boughtAt: comicDetails.bought_at,
                condition: comicDetails.condition,
                quantity: comicDetails.quantity,
                notes: comicDetails.notes,
            })
        } else if (req.method === "POST") {
            const comicDetails = await addComicToCollection(client, res, comicID, user.id)

            res.status(201).json({
                dateCollected: format(comicDetails.date_collected, "yyyy-MM-dd"),
                purchasePrice: comicDetails.purchase_price,
                boughtAt: comicDetails.bought_at,
                condition: comicDetails.condition,
                quantity: comicDetails.quantity,
                notes: comicDetails.notes,
            })
        } else if (req.method === "PUT") {
            const { dateCollected, purchasePrice, boughtAt, condition, notes } = req.body

            if (isNaN(req.body.quantity))
                res.status(400).json({ message: "Quantity must be a number" })
            const quantity = parseInt(req.body.quantity)

            const details = {
                dateCollected,
                purchasePrice,
                boughtAt,
                condition,
                quantity,
                notes,
                userID: user.id,
                comicID,
            }

            const comicDetails = await updateCollectedComicDetails(client, res, details)

            res.status(200).json({
                dateCollected: format(comicDetails.date_collected, "yyyy-MM-dd"),
                purchasePrice: comicDetails.purchase_price,
                boughtAt: comicDetails.bought_at,
                condition: comicDetails.condition,
                quantity: comicDetails.quantity,
                notes: comicDetails.notes,
            })
        } else if (req.method === "DELETE") {
            await removeComicFromCollection(client, res, comicID, user.id)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
