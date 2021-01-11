import { magic } from "../../../util/magic"
import { removeTokenCookie } from "../../../util/cookie"
import jwt from "jsonwebtoken"

export default async function logout(req, res) {
    try {
        // Get user from cookie
        if (!req.cookies.token) return res.status(401).json({ message: "User is not logged in" })
        let token = req.cookies.token
        let user = jwt.verify(token, process.env.JWT_SECRET)

        // Logout user
        if (user.id) await magic.users.logoutByIssuer(user.id)
        removeTokenCookie(res)
        res.writeHead(302, { Location: "/auth/login" })
        res.end()
    } catch (error) {
        res.status(401).json()
    }
}
