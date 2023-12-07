import { Schema } from "mongoose";

export const UrlTestSchema = new Schema({
    fullUrl: {
        unique: true,
        required: true,
        type: String
    },
    shortUrl: {
        required: true,
        type: String
    }
})