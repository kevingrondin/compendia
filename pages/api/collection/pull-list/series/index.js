import { db } from "@util/database"
import { getUserOrRedirect } from "@util/cookie"

async function getSubscribedSeries(client, userID, res) {
    const query = `SELECT series_id, name FROM series
        LEFT JOIN pull_list_series USING(series_id)
        LEFT JOIN collections USING(collection_id)
        WHERE user_id = $1`
    const params = [userID]
    const result = await client.query(query, params)

    if (result.rows.length < 1) res.status(200).json({ message: "No subscribed series returned" })

    return result.rows
}

export default async function handler(req, res) {
    const user = getUserOrRedirect(req, res)
    res.setHeader("Content-Type", "application/json")

    const client = await db.connect()
    try {
        if (req.method === "GET") {
            const subscribedSeriesList = await getSubscribedSeries(client, user.id, res)

            if (subscribedSeriesList.length < 1) return
            res.status(200).json({
                subscribedSeriesList: subscribedSeriesList.map((series) => {
                    return {
                        id: series.series_id,
                        name: series.name,
                    }
                }),
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } finally {
        await client.end()
        await client.release()
    }
}
