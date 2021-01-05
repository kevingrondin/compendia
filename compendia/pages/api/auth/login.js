import { magic } from "../../../util/magic"
import jwt from "jsonwebtoken"
import { setTokenCookie } from "../../../util/cookie"
import dbConnect from "../../../database/connection"
import User from "../../../database/models/User"
import ComicList from "../../../database/models/ComicList"

dbConnect()

const createNewUser = async (metadata) => {
    await new User({
        _id: metadata.issuer,
        email: metadata.email,
    }).save()

    if (!metadata || !metadata.email || !metadata.issuer)
        throw new Error("Could not create a new account. Please try again later.")

    const starterLists = [
        { name: "Favorites", user: metadata.issuer },
        { name: "Read", user: metadata.issuer },
        { name: "Want", user: metadata.issuer },
    ]
    ComicList.insertMany(starterLists, (error, docs) => {
        if (error) throw new Error("There was an error creating your comic lists.")
    })
}

export default async function login(req, res) {
    try {
        const didToken = req.headers.authorization.substr(7)
        await magic.token.validate(didToken)
        const metadata = await magic.users.getMetadataByToken(didToken)

        const existingUser = await User.findOne({ _id: metadata.issuer })
        if (!existingUser) createNewUser(metadata)

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

        res.status(200).json({ done: true })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
