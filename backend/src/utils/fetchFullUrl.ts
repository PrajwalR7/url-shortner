import { Url } from "../db/models.js"

export const fetchFullUrl = async (shortUrl: string) => {
    console.log('shorturl - ', shortUrl)
    const findResult = await Url.findOne({
        shortUrl: { $eq: shortUrl }
    }).exec()
    if (findResult && findResult.fullUrl) {
        Url.updateOne({
            shortUrl: { $eq: shortUrl }
        }, {
            clicks: findResult.clicks + 1
        }).exec()
        .then(res => {
            if (res.acknowledged) {
                console.log('Updated clicks')
            }
        })
        .catch(err => {
            console.log('err while updating clicks', err)
        })
        return findResult.fullUrl
    }
}