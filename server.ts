import express, { Express, Request, response, Response } from 'express'
import { IncomingMessage } from 'http';
import path from 'path';
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const https = require('https');

dotenv.config()
const app = express()
const port = process.env.PORT
const appid = process.env.APIKEY
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '..', '/src/index.html'))
})
app.post('/', (request: express.Request, response: express.Response) => {
    const query = request.body.query
    const unit = 'metric'
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather'
    const url = `${endpoint}?q=${query}&units=${unit}&appid=${appid}`
    https.get(url, (res: IncomingMessage) => {
        console.log(res.statusCode)
        res.on('data', (data) => {
            const resData = JSON.parse(data)
            console.log(resData)
            if (resData.cod !== 200) {
                response.write(`<h1>Search(city) : ${query}</h1>`)
                response.write(`<h2>${resData.message}</h2>`)
            } else {
                response.write(`<h1>The weather in ${resData.name} </h1>`)
                response.write(`<h2>${resData.weather[0].main} (temp ${resData.main.temp} degrees)</h2>`)
            }
            response.write(`<a href='/'>Back</a>`)
            response.send()
        })
    })

})


app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`)
})

