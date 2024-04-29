const discName = document.getElementById("disc-name")
const discDescription = document.getElementById("disc-description")
const discPrice = document.getElementById("disc-price")
const discImage = document.getElementById("disc-image")

const addToCartButton = document.getElementById("add-to-cart")

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

if (!id) window.location.href = "home.html"

async function fetchDiscs() {
	const res = await fetch("http://localhost:3000/products")
	const discs = await res.json()

	const disc = discs.find((disc) => disc.productId == id)

	discName.innerHTML = disc.nome
	discDescription.innerHTML = disc.descricao
	discImage.src = `public/images/discs/${disc.productId}.png`

	loading.classList.add("disabled")
}

addToCartButton.addEventListener("click", async () => {
	try {
		const res = await fetch("http://localhost:3000/cart", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + getCookie("ecommerce.token"),
			},
			body: JSON.stringify({
				productId: id,
				quantidade: 1,
			}),
		})

		if (!res.ok) throw new Error()

		fetchCart()
	} catch (error) {
		console.error("ERROR", error)
	}
})

fetchDiscs()
