import { magic } from "@util/magic"
import { removeTokenCookie } from "@util/cookie"
import jwt from "jsonwebtoken"

export default async function logout(req, res) {
    try {
        if (!req.cookies.token) return res.status(401).json({ message: "User is not logged in" })
        const token = req.cookies.token
        const user = jwt.verify(token, process.env.JWT_SECRET)

        if (user.id) await magic.users.logoutByIssuer(user.id)
        removeTokenCookie(res)
        res.writeHead(302, { Location: "/auth/login" })
        res.end()
    } catch (error) {
        res.status(401).end()
    }
}
