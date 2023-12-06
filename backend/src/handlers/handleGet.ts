import { Request, Response } from "express";
import { fetchFullUrl } from "../utils/fetchFullUrl.js";
import { FRONTEND_URL, SERVER_DOMAIN } from "../const.js";

export const handleGet = async (req: Request, res: Response) => {
    console.log('get handler')
    try {
        const pathName = req.path
        console.log(pathName)
        if (pathName === '/') {
            return res.redirect(FRONTEND_URL)
        } else {
            const shortUrl = `${SERVER_DOMAIN}${req.url}`
            const fullUrl = await fetchFullUrl(shortUrl)
            if (!fullUrl) {
                return res.redirect(`${FRONTEND_URL}/invalid`)
            }
            return res.redirect(fullUrl)
        }
    } catch (e) {
        console.log(e)
        return res.redirect(`${FRONTEND_URL}/internal-error`)
    }
}