import { Url } from "../db/models.js"

export const fetchFullUrl = async (shortUrl: string) => {
    console.log('shorturl - ', shortUrl)
    const findResult = await Url.findOne({
        shortUrl: { $eq: shortUrl }
    }).exec()
    if (findResult && findResult.fullUrl) {
        return findResult.fullUrl
    }
}