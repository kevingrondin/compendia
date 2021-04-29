import jwt from "jsonwebtoken"
import { setTokenCookie } from "@util/cookie"

export default async function user(req, res) {
    try {
        if (!req.cookies.token) return res.status(200).json({ user: null })
        const token = req.cookies.token
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const newToken = jwt.sign(
            {
                id: user.id,
                publicAddress: user.publicAddress,
                email: user.email,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // one week
            },
            process.env.JWT_SECRET
        )
        user.token = newToken
        setTokenCookie(res, newToken)
        res.status(200).json({ user })
    } catch (error) {
        res.status(200).json({ user: null })
    }
}
