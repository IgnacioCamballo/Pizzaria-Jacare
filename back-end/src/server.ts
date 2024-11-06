import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"

import { corsConfig } from "./config/cors"
import {connectDB} from "./config/db"
import productRoutes from "./routes/productRoutes"

dotenv.config()

connectDB()

const app = express()
app.use(cors(corsConfig))

// Logging
app.use(morgan("dev"))
 
// Leer datos de form
app.use(express.json())

// Routes
app.use("/api/products", productRoutes)


export default app