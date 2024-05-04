const express = require("express")
const cartRouter = express.Router()
const withAuth = require("../middleware/withAuth")
const Carrinho = require("../models/carrinho")
const Produtos = require("../models/produtos")

cartRouter.post("/", withAuth, async (req, res) => {
	try {
		const { productId, quantidade } = req.body
		const userId = res.locals.userId

		const product = await Produtos.findByPk(productId)
		if (!product) {
			return res.status(404).json({ message: "Product not found" })
		}

		const alreadyExists = await Carrinho.findOne({
			where: {
				usuarioId: userId,
				produtoId: productId,
			},
		});

		if (alreadyExists) {
			return res.status(400).json({ message: "Product already in cart" });
		}

		const carrinho = await Carrinho.create({
			usuarioId: userId,
			produtoId: productId,
			quantidade: quantidade,
		})

		res.status(201).json({ message: "Product add with success" })
	} catch (error) {
		console.error("Error adding product ", error)
		res.status(500).json({ message: "Error adding product" })
	}
})

cartRouter.put("/:id", withAuth, async (req, res) => {
	try {
		const { id } = req.params
		const { quantidade } = req.body
		const userId = res.locals.userId

		await Carrinho.update(
			{
				quantidade,
			},
			{
				where: {
					usuarioId: userId,
					produtoId: id,
				},
			}
		)

		res.json({ message: "Cart updated" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Error updating cart" })
	}
})

cartRouter.delete("/", withAuth, async (req, res) => {
	try {
		const { productId } = req.body
		const userId = res.locals.userId

		const cartItem = await Carrinho.findOne({
			where: { usuarioId: userId, produtoId: productId },
		})

		if (!cartItem) {
			return res.status(404).json({ message: "Product in the cart not found" })
		}

		await cartItem.destroy()

		res.json({ message: "Product removed from cart successfully" })
	} catch (error) {
		console.error("Error removing product from cart", error)
		res.status(500).json({ message: "Error removing product from cart" })
	}
})

cartRouter.get("/", withAuth, async (req, res) => {
	try {
		const userId = res.locals.userId

		const productsInCart = await Carrinho.findAll({
			where: { usuarioId: userId },
			include: [{ model: Produtos }],
		})

		if (productsInCart.length === 0) {
			return res.status(404).json({ message: "No products in the cart" })
		}

		res.json(productsInCart)
	} catch (error) {
		console.error("Error getting products in cart", error)
		res.status(500).json({ message: "Error getting products in cart" })
	}
})

module.exports = cartRouter
