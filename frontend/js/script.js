const API_URL = "http://localhost:3000"

const menu = document.getElementById("menu")
const menuButton = document.getElementById("menu-button")
const menuClose = menu.querySelector(".sidebar__close-button")

const cart = document.getElementById("cart")
const cartButton = document.getElementById("cart-button")
const cartClose = cart.querySelector(".sidebar__close-button")

const cartContent = cart.querySelector(".sidebar__content ul")

const header = document.getElementById("header")

const auth = document.documentElement.dataset.auth

const loading = document.getElementById("loading")

menuButton.addEventListener("click", toggleMenu)
menuClose.addEventListener("click", toggleMenu)

cartButton.addEventListener("click", toggleCart)
cartClose.addEventListener("click", toggleCart)

let cartData

function toggleMenu() {
	menu.classList.toggle("sidebar--active")
}

function toggleCart() {
	cart.classList.toggle("sidebar--active")
}

async function fetchDiscs() {
	const res = await fetch(`${API_URL}/products`)
	if (!res.ok) throw new Error("Fetch error")

	const discs = await res.json()

	return discs
}

async function fetchUser() {
	if (!getToken()) throw new Error("No token")

	const res = await fetch(`${API_URL}/auth`, {
		headers: {
			Authorization: "Bearer " + getToken(),
		},
	})

	if (!res.ok) throw new Error("Fetch error")

	return await res.json()
}

async function fetchCart() {
	if (!getToken()) return
	cartData = null

	try {
		const res = await fetch(`${API_URL}/cart`, {
			headers: {
				Authorization: "Bearer " + getToken(),
			},
		})

		if (!res.ok) {
			const { error } = await res.json()
			if (error) {
				throw new Error(error)
			} else {
				throw new Error("Fetch error")
			}
		}

		cartData = await res.json()
	} catch (error) {
		console.error(error)
	}

	renderCart(cartData ?? [])
}

async function updateCart(e, productId) {
	if (!productId) return

	try {
		if (!getToken()) throw new Error("No token")

		const quantity = e.target.value

		const res = await fetch(`${API_URL}/cart/${productId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + getToken(),
			},
			body: JSON.stringify({
				quantidade: quantity,
			}),
		})

		if (!res.ok) {
			const { error } = await res.json()
			if (error) {
				throw new Error(error)
			} else {
				throw new Error("Fetch error")
			}
		}

		const cartProduct = document.querySelector(`.cart__product[data-disc-id='${productId}']`)
		const price = cartProduct.querySelector(".cart__product-price")

		price.textContent =
			"R$ " +
			(
				quantity * cartData.find(({ produto }) => produto.productId === productId).produto.preco
			).toFixed(2)
	} catch (error) {
		console.error(error)
		alert("Erro ao atualizar produto: " + error.message)
	}
}

async function removeCart(productId) {
	if (!productId) return

	try {
		if (!getToken()) throw new Error("No token")
		if (!confirm("Deseja remover este produto?")) return

		const res = await fetch(`${API_URL}/cart`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + getToken(),
			},
			body: JSON.stringify({
				productId,
			}),
		})

		if (!res.ok) {
			const { error } = await res.json()
			if (error) {
				throw new Error(error)
			} else {
				throw new Error("Fetch error")
			}
		}

		fetchCart()
	} catch (error) {
		console.error(error)
		alert("Erro ao remover produto: " + error.message)
	}
}

function renderCart(cart) {
	cartContent.innerHTML = null
	cart.forEach(({ quantidade, produto }, index) => {
		const productCard = `
		<li class="cart__product" data-disc-id="${produto.productId}">
			<img src="./assets/images/discs/${produto.productId}.png" alt="" class="cart__product-image" />
			<div class="cart__product-info">
				<h2 class="cart__product-name">${produto.nome}</h2>
				<div class="cart__product-quantity">
					<select name="" id="" class="select" onChange="updateCart(event, ${produto.productId})">
						<option value="1" ${quantidade === 1 ? "selected" : ""}>1</option>
						<option value="2" ${quantidade === 2 ? "selected" : ""}>2</option>
						<option value="3" ${quantidade === 3 ? "selected" : ""}>3</option>
						<option value="4" ${quantidade === 4 ? "selected" : ""}>4</option>
						<option value="5" ${quantidade === 5 ? "selected" : ""}>5</option>
						<option value="6" ${quantidade === 6 ? "selected" : ""}>6</option>
						<option value="7" ${quantidade === 7 ? "selected" : ""}>7</option>
						<option value="8" ${quantidade === 8 ? "selected" : ""}>8</option>
						<option value="9" ${quantidade === 9 ? "selected" : ""}>9</option>
						<option value="10" ${quantidade === 10 ? "selected" : ""}>10</option>
					</select>
					<p class="cart__product-price">R$ ${(quantidade * produto.preco).toFixed(2)}</p>
				</div>
			</div>
			<button class="icon-button" onclick="removeCart(${produto.productId})">
				<svg
					class="icon-24"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="512"
					height="512"
				>
					<path
						d="m16.535,8.172l-3.828,3.828,3.828,3.828-.707.707-3.828-3.828-3.828,3.828-.707-.707,3.828-3.828-3.828-3.828.707-.707,3.828,3.828,3.828-3.828.707.707Zm7.465,3.828c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-1,0c0-6.065-4.935-11-11-11S1,5.935,1,12s4.935,11,11,11,11-4.935,11-11Z"
					/>
				</svg>
			</button>
		</li>
		`

		cartContent.innerHTML += productCard
	})
}

function setToken(token) {
	const date = new Date()
	date.setTime(date.getTime() + 60 * 60 * 1000) // 1 hour
	let expires = "expires=" + date.toUTCString()
	document.cookie = "ecommerce.token=" + token + ";" + expires + ";path=/"
}

function getToken() {
	const tokenKey = "ecommerce.token="
	const cookiesString = decodeURIComponent(document.cookie)
	const cookieIndex = cookiesString.indexOf(tokenKey)
	if (cookieIndex < 0) return
	const cookieLimit = cookiesString.indexOf(";", cookieIndex)
	return cookiesString
		.substring(cookieIndex + tokenKey.length, cookieLimit < 0 ? undefined : cookieLimit)
		.trim()
}

function deleteToken() {
	document.cookie = "ecommerce.token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

fetchUser()
	.then((user) => {
		header.classList.add("auth")
		if (auth) {
			if (auth == "true") {
				loading.classList.remove("loading--active")
			} else {
				window.location.href = "./index.html"
			}
		} else {
			console.log("removeu")
			loading.classList.remove("loading--active")
		}
	})
	.catch(() => {
		if (auth) {
			if (auth == "false") {
				loading.classList.remove("loading--active")
			} else {
				window.location.href = "./index.html"
			}
		} else {
			loading.classList.remove("loading--active")
		}
	})

fetchCart()
