import "dotenv/config"
import express  from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

import { router } from "./routes"

const app = express()
app.use(cors())

const serverHTTP = http.createServer(app)

const io = new Server(serverHTTP, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log(`Usuario conectado no socket ${socket.id}`)
})

app.use(express.json())
app.use(router)

app.get("/github", (req, resp) => {
    resp.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get("/signin/callback", (req, resp) => {
    const { code } = req.query

    return resp.json(code)
})


export { serverHTTP, io }

