import express from 'express'
import { cors } from './middlewares/cors.js'
import { handleGet } from './handlers/handleGet.js'
import { handlePost } from './handlers/handlePost.js'
import { dbConnect } from './middlewares/dbConnect.js'
import { dbDisconnect } from './middlewares/dbDisconnect.js'

const app = express()
app.use(express.urlencoded({extended: false}), express.json())
app.use(cors)
app.use(dbConnect)

app.get('*', handleGet)

app.post('/', handlePost)

app.use(dbDisconnect)

app.listen(4000, () => {
    console.log('Server listening at port 4000')
})