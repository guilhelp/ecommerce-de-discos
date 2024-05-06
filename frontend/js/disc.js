const image = document.getElementById("image")
const title = document.getElementById("title")
const description = document.getElementById("description")
const price = document.getElementById("price")
const quantity = document.getElementById("quantity")

const addToCartButton = document.getElementById("add-to-cart-button")

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

if (!id) window.location.href = "home.html"

addToCartButton.addEventListener("click", addToCart)

function renderDisc(disc) {
	title.innerHTML = disc.nome
	description.innerHTML = disc.descricao
	image.src = `assets/images/discs/${disc.productId}.png`
}

async function addToCart() {
	if (!getToken()) {
		window.location.href = "./login.html"
		return
	}

	try {
		const res = await fetch(`${API_URL}/cart`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + getToken(),
			},
			body: JSON.stringify({
				productId: id,
				quantidade: quantity.value,
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
		cart.classList.add("sidebar--active")
	} catch (error) {
		console.error(error)
		alert("Erro ao adicionar ao carrinho: " + error.message)
	}
}

fetchDiscs()
	.then((discs) => {
		const disc = discs.find((disc) => disc.productId == id)

		renderDisc(disc)
	})
	.catch((error) => {
		console.error(error)
		alert("Erro ao buscar discos")
	})
