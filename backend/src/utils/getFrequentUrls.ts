import { Url } from "../db/models.js"

export const getFrequentUrls = async () => {
    const response = await Url.find({
        clicks: { $gt: 0 },
    })
    .sort({
        clicks: -1
    })
    .limit(5)
    .exec()

    console.log(response)
    return response
}