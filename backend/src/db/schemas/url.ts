import { Schema } from "mongoose";

export const UrlSchema = new Schema({
    fullUrl: {
        unique: true,
        type: String,
        required: true
    },
    shortUrl: {
        unique: true,
        type: String,
        required: true
    },
    clicks: Schema.Types.Number
})