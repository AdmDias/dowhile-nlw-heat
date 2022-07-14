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

export { serverHTTP, io }

