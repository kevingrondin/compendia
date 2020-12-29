import { magic } from "../../../util/magic"
import { removeTokenCookie } from "../../../util/cookie"
import jwt from "jsonwebtoken"

export default async function logout(req, res) {
    try {
        let token = req.cookies.token
        let user = jwt.verify(token, process.env.JWT_SECRET)
        await magic.users.logoutByIssuer(user.issuer)
        removeTokenCookie(res)
        res.writeHead(302, { Location: "/login" })
        res.end()
    } catch (error) {
        res.status(401).json({ message: "User is not logged in" })
    }
}
