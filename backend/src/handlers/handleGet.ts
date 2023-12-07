import { Request, Response } from "express";
import { fetchFullUrl } from "../utils/fetchFullUrl.js";
import { FRONTEND_URL, SERVER_DOMAIN } from "../const.js";
import { getFrequentUrls } from "../utils/getFrequentUrls.js";

export const handleGet = async (req: Request, res: Response) => {
    console.log('get handler')
    try {
        const pathName = req.path
        console.log(pathName)
        switch(pathName) {
            case '/': {
                return res.redirect(FRONTEND_URL)
            }
            case '/frequent': {
                const frequentUrls = await getFrequentUrls()
                return res.status(200).json(frequentUrls)
            }
            default: {
                const shortUrl = `${SERVER_DOMAIN}${req.url}`
                const fullUrl = await fetchFullUrl(shortUrl)
                if (!fullUrl) {
                    return res.redirect(`${FRONTEND_URL}/invalid`)
                }
                return res.redirect(fullUrl)
            }
        }
    } catch (e) {
        console.log(e)
        return res.redirect(`${FRONTEND_URL}/internal-error`)
    }
}