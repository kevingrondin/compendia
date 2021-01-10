const db = require("../../../database").instance
import { magic } from "../../../util/magic"
import jwt from "jsonwebtoken"
import { setTokenCookie } from "../../../util/cookie"

// Create new user in db using issuer ID and email from Magic metadata
const createNewUser = async (metadata) => {
    const client = await db.connect()
    try {
        await client.query("INSERT INTO users (user_id, email) VALUES ($1, $2)", [
            metadata.issuer,
            metadata.email,
        ])
    } catch (error) {
        console.log(error)
    } finally {
        client.release()
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
        try {
            const res = await client.query("SELECT user_id, email FROM users WHERE $1 = user_id", [
                metadata.issuer,
            ])
            if (res.rows.length < 1) createNewUser(metadata)
        } catch (error) {
            console.log(error)
        } finally {
            client.release()
        }

        // Create and save cookie to remember user
        let token = jwt.sign(
            {
                id: metadata.issuer,
                publicAddress: metadata.publicAddress,
                email: metadata.email,
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
