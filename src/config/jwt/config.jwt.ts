import * as dotenv from "dotenv"
dotenv.config()

export const secret = process.env.JWT_SECRET_KEY
export const secretClient = process.env.JWT_SECRET_KEY_CLIENT
export const expiresIn = process.env.JWT_EXPIRES_IN