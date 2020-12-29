import { magic } from "../../../util/magic"
import jwt from "jsonwebtoken"
import { setTokenCookie } from "../../../util/cookie"
import dbConnect from "../../../database/connection"
import User from "../../../database/models/User"

dbConnect()

const saveNewUserToDB = async (metadata) => {
    let newUser = {
        email: metadata.email,
        issuer: metadata.issuer,
    }
    return await new User(newUser).save()
}

export default async function login(req, res) {
    try {
        const didToken = req.headers.authorization.substr(7)
        await magic.token.validate(didToken)
        const metadata = await magic.users.getMetadataByToken(didToken)

        // If no existing user, create one
        const existingUser = await User.findOne({ issuer: metadata.issuer })
        !existingUser && saveNewUserToDB(metadata)

        let token = jwt.sign(
            {
                issuer: metadata.issuer,
                publicAddress: metadata.publicAddress,
                email: metadata.email,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // one week
            },
            process.env.JWT_SECRET
        )
        setTokenCookie(res, token)

        res.status(200).json({ done: true })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
