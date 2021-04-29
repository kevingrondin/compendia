import jwt from "jsonwebtoken"
const db = require("../../../util/database").instance
import { magic } from "@util/magic"
import { setTokenCookie } from "@util/cookie"

async function insertNewUser(client, res, metadata) {
    const insert = `INSERT INTO users (user_id, email) VALUES ($1, $2)
        RETURNING user_id, email`
    const params = [metadata.issuer, metadata.email]
    const result = await client.query(insert, params)

    if (result.rows.length !== 1) res.status(500).json({ message: "Could not create new user" })
    else return result.rows[0]
}

async function getExistingUser(client, res, userID) {
    const query = `SELECT user_id, email FROM users WHERE user_id = $1`
    const params = [userID]
    const result = await client.query(query, params)

    if (result.rows.length !== 1) res.status(404).json({ message: "User not found" })
    else return result.rows[0]
}

async function getOrCreateUser(client, res, metadata) {
    const existingUser = await getExistingUser(client, res, metadata.issuer)
    const user = {}
    if (existingUser?.user_id) {
        user.id = existingUser.user_id
        user.email = existingUser.email
    } else {
        const newUser = await insertNewUser(client, res, metadata)
        user.id = newUser.user_id
        user.email = newUser.email
    }

    return user
}

export default async function login(req, res) {
    const client = await db.connect()
    try {
        const didToken = req.headers.authorization.substr(7)
        await magic.token.validate(didToken)
        const metadata = await magic.users.getMetadataByToken(didToken)

        const user = await getOrCreateUser(client, res, metadata)

        const token = jwt.sign(
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
    } finally {
        await client.end()
        await client.release()
    }
}
