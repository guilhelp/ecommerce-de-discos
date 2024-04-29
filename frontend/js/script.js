const cartButton = document.getElementById("cart-button")
const cart = document.getElementById("cart")
const closeCartButton = document.getElementById("close-cart")
const cartProducts = document.getElementById("cart-products")
const loading = document.getElementById("loading")

function getCookie(cname) {
	let name = cname + "="
	let decodedCookie = decodeURIComponent(document.cookie)
	let ca = decodedCookie.split(";")
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) == " ") {
			c = c.substring(1)
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length)
		}
	}
	return ""
}

function setCookie(key, value, expire) {
	const date = new Date()
	date.setTime(date.getTime() + expire * 1000)
	let expires = "expires=" + date.toUTCString()
	document.cookie = key + "=" + value + ";" + expires + ";path=/"
}

cartButton.addEventListener("click", toggleCart)
closeCartButton.addEventListener("click", toggleCart)

function toggleCart() {
	cart.classList.toggle("cart--active")
}

async function removeProduct(id) {
	if (!id) return
	if (!confirm("Deseja remover este produto?")) return

	const res = await fetch("http://localhost:3000/cart", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + getCookie("ecommerce.token"),
		},
		body: JSON.stringify({
			productId: id,
		}),
	})

	if (!res.ok) {
		alert("Erro ao remover produto")
		return
	}

	fetchCart()
}

async function updateProduct(e, id) {
	if (!id) return

	const quantity = e.target.value

	const res = await fetch(`http://localhost:3000/cart/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + getCookie("ecommerce.token"),
		},
		body: JSON.stringify({
			quantidade: quantity,
		}),
	})

	if (!res.ok) {
		alert("Erro ao atualizar produto")
		return
	}
}

async function fetchCart() {
	cartProducts.innerHTML = ""
	try {
		const res = await fetch("http://localhost:3000/cart", {
			headers: {
				Authorization: "Bearer " + getCookie("ecommerce.token"),
			},
		})

		if (!res.ok) throw new Error()

		const discs = await res.json()

		discs.forEach((disc) => {
			const product = `
			<li class="cart__product" data-disc-id="${disc.produto.productId}">
				<img src="public/images/discs/${disc.produto.productId}.png" alt="" class="cart__product-image" />
				<div class="cart__product-info">
					<h2 class="cart__product-name">${disc.produto.nome}</h2>
					<div class="cart__product-quantity">
						<input type="number" value="${disc.quantidade}" min="1" max="100" onchange="updateProduct(event, ${
				disc.produto.productId
			})" />
						<p class="cart__product-price">R$ ${(disc.produto.preco * disc.quantidade).toFixed(2)}</p>
					</div>
				</div>
				<button class="cart__product-remove" aria-label="Remover produto" title="Remover produto" onclick="removeProduct(${
					disc.produto.productId
				})">
					<i class="bx bx-trash"></i>
				</button>
			</li>
			`

			cartProducts.innerHTML += product
		})
	} catch (error) {
		console.error("ERROR: ", error)
	}
}

fetchCart()
