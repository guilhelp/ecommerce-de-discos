const PORT = 3000

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
dotenv.config()


const app = express()

const userRouter = require("./routes/user.routes")
const cartRouter = require("./routes/cart.routes")
const productRouter = require("./routes/product.routes")
const authRouter = require("./routes/auth.routes")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
	origin: "*",
	methods: ["HEAD", "GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],

}))

app.use("/users", userRouter)
app.use("/cart", cartRouter)
app.use("/products", productRouter)
app.use(authRouter)

app.listen(PORT, () => {
	console.log(process.env.SECRET_KEY)
	console.log(`Server listening at http://localhost:${PORT}`)
})
