import mongoose, { mongo } from "mongoose"
// import { envs } from "../envs.js"
import { Request, Response, NextFunction } from "express"

export const dbConnect = async (req: Request, res: Response, next: NextFunction) => {
    mongoose.connect('mongodb://127.0.0.1:27017/url_shortner')
    .then(() => {
        console.log('MongoDB connection success')
        next()
    })
    .catch((err) => {
        console.log(JSON.stringify(err))
        const erroObj = err as Error
        res.send({
            status: 500,
            message: erroObj.message,
            cause: erroObj.cause
        })
    })
}