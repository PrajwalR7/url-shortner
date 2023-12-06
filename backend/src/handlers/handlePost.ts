import { Request, Response } from 'express'
import crypto from 'crypto'
import { Url } from '../db/models.js'
import { FRONTEND_URL, SERVER_DOMAIN } from '../const.js'

interface UrlRequestBody {
    fullUrl: string
    shortUrl?: string
}

export const handlePost = async (req: Request, res: Response) => {
    console.log('Post handler')
    try {
        let { fullUrl, shortUrl } = req.body as UrlRequestBody
        if (!shortUrl) {
            shortUrl = crypto.randomBytes(5).toString('base64')
        }
        shortUrl = `${SERVER_DOMAIN}/${shortUrl}`
        await Url.init()
        const response = await Url.create({
            fullUrl,
            shortUrl
        })
        return res.status(200).json({
            shortUrl
        })
    } catch (e) {
        return res.redirect(`${FRONTEND_URL}/internal-error`)
    }
}