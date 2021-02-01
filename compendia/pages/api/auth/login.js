const db = require("../../../util/database").instance
import { magic } from "@util/magic"
import jwt from "jsonwebtoken"
import { setTokenCookie } from "@util/cookie"

// Create new user in db using issuer ID and email from Magic metadata
const createNewUser = async (metadata, client) => {
    try {
        const userInsert = `INSERT INTO users (user_id, email) VALUES ($1, $2) RETURNING user_id, email`
        const userInsertParams = [metadata.issuer, metadata.email]
        const userInsertResult = await client.query(userInsert, userInsertParams)
        return userInsertResult
    } catch (error) {
        console.log(error)
    }
}

export default async function login(req, res) {
    try {
        // Get user metadata from Magic Auth
        const didToken = req.headers.authorization.substr(7)
        await magic.token.validate(didToken)
        const metadata = await magic.users.getMetadataByToken(didToken)

        // Search db for existing user with Magic issuer ID, otherwise create one
        const client = await db.connect()
        const user = {}
        try {
            const userQuery = `SELECT user_id, email FROM users WHERE user_id = $1`
            const userQueryParams = [metadata.issuer]
            const userResult = await client.query(userQuery, userQueryParams)

            // Populate user object from either existing user or new user
            if (userResult.rows.length < 1) {
                const newUser = await createNewUser(metadata, client)
                if (newUser.rows.length > 0) {
                    user.id = newUser.rows[0].user_id
                    user.email = newUser.rows[0].email
                } else throw new Error("New user was not added to db")
            } else {
                user.id = userResult.rows[0].user_id
                user.email = userResult.rows[0].email
            }

            // Get collection ID for user and add it to the user object
            const collectionQuery = `SELECT collection_id FROM collections WHERE user_id = $1`
            const collectionQueryParams = [user.id]
            const collectionResult = await client.query(collectionQuery, collectionQueryParams)
            if (collectionResult.rows.length > 0) {
                user.collectionID = collectionResult.rows[0].collection_id
            } else throw new Error("Collection ID was not found for new user")
        } catch (error) {
            console.log(error)
        } finally {
            await client.end()
            await client.release()
        }

        // Create and save cookie to remember user
        let token = jwt.sign(
            {
                id: user.id,
                publicAddress: metadata.publicAddress,
                email: user.email,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // one week
            },
            process.env.JWT_SECRET
        )
        setTokenCookie(res, token)

        res.status(200).end()
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
