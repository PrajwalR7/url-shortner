import { Schema } from "mongoose";

export const UrlSchema = new Schema({
    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    }
})