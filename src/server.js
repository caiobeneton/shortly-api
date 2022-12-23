import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import signRoutes from "./routes/sign.routes.js"
import urlRoutes from "./routes/url.routes.js"
import userRoutes from "./routes/users.routes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(json())

app.use(signRoutes)
app.use(urlRoutes)
app.use(userRoutes)

app.use((req, res) => {
    res.status(404).send("Rota não encontrada!")
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server running in port ${port}`))