import { default as mongoose } from "mongoose";
import { Test_Url } from './build/src/db/models.js'
import { randomBytes } from 'crypto';
import { SERVER_DOMAIN } from './build/src/const.js';

async function upsertTestData() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/url_shortner')
        console.log('Connected to DB')
    } catch (e) {
        console.error(e)
    }
    console.log('Upserting Data')
    let successCount = 0
    let errorCount = 0
    let index = 0
    for (; index < 50000; index++) {
        try {
            const shortUrl = randomBytes(7).toString('base64')
            await Test_Url.create({ 
                shortUrl: `${SERVER_DOMAIN}/${shortUrl}`,
                fullUrl: `https://fake${index+1}.com`
            })
            successCount++
        } catch (e) {
            errorCount++
        }
    }
    console.log('Upserting finsihed, uploaded count - ', i+1, 'success - ', successCount, 'error - ', errorCount)
}

async function queryData() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/url_shortner')
        console.log('Connected to DB')
    } catch (e) {
        console.error(e)
    }
    console.log('Querying')
    console.time('query')
    const response = await Test_Url.find({
        shortUrl: { $eq: 'http://localhost:4000/VkV0tQ+ECQ=='}
    }).exec()
    console.log(response)
    console.timeEnd('query')
    return
}

await upsertTestData()
await queryData()