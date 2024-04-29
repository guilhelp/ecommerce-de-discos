const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
dotenv.config()
const userRouter = require("./routes/user.routes")
const cartRouter = require("./routes/cart.routes")
const productRouter = require("./routes/product.routes")
const authRouter = require("./routes/auth.routes")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization")
	next()
})

app.use("/users", userRouter)
app.use("/cart", cartRouter)
app.use("/products", productRouter)
app.use(authRouter)

app.listen(port, () => {
	console.log(process.env.SECRET_KEY)
	console.log(`Server listening at http://localhost:${port}`)
})
