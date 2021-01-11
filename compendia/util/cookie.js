import { serialize } from "cookie"
import jwt from "jsonwebtoken"

const TOKEN_NAME = "token"
const MAX_AGE = 60 * 60 * 24 * 7 // one week

export function setTokenCookie(res, token) {
    const cookie = serialize(TOKEN_NAME, token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    })
    res.setHeader("Set-Cookie", cookie)
}

export function removeTokenCookie(res) {
    const cookie = serialize(TOKEN_NAME, "", {
        maxAge: -1,
        path: "/",
    })

    res.setHeader("Set-Cookie", cookie)
}

export function getUserOrRedirect(req, res) {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: "User is not logged in" })
    return jwt.verify(token, process.env.JWT_SECRET)
}
