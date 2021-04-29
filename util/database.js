const { Pool } = require("pg")

const isProduction = process.env.NODE_ENV === "PRODUCTION"
const connectionString = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
export const db = new Pool({
    connectionString,
    ssl: isProduction,
})
