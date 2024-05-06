const nameInput = document.getElementById("name-input")
const emailInput = document.getElementById("email-input")
const passwordInput = document.getElementById("password-input")
const birthdateInput = document.getElementById("birthdate-input")
const zipcodeInput = document.getElementById("zipcode-input")
const numberInput = document.getElementById("number-input")
const complementInput = document.getElementById("complement-input")
const form = document.getElementById("form")

const logoutButton = document.getElementById("logout-button")
const deleteAccountButton = document.getElementById("delete-account-button")

form.addEventListener("submit", async (e) => {
	e.preventDefault()
	handleUpdate()
})

logoutButton.addEventListener("click", () => {
	deleteToken()
	window.location.href = "./index.html"
})
deleteAccountButton.addEventListener("click", handleDeleteAccount)

function renderUser(user) {
	nameInput.value = user.nome
	emailInput.value = user.email
	birthdateInput.value = user.data_nascimento
	zipcodeInput.value = user.cep.toString().padStart(8, "0")
	numberInput.value = user.numero
	complementInput.value = user.complemento
}

async function handleUpdate() {
	const formData = new FormData(form)

	const data = {
		nome: formData.get("name"),
		email: formData.get("email"),
		senha: formData.get("password"),
		data_nascimento: formData.get("birthdate"),
		cep: formData.get("zipcode"),
		numero: formData.get("number"),
		complemento: formData.get("complement"),
	}

	try {
		if (!getToken()) throw new Error("No token")

		const res = await fetch(`${API_URL}/users`, {
			method: "PUT",
			headers: {
				Authorization: "Bearer " + getToken(),
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})

		if (!res.ok) {
			const { error } = await res.json()
			if (error) {
				throw new Error(error)
			} else {
				throw new Error("Fetch error")
			}
		}

		const { token } = await res.json()
		setToken(token)
		window.location.href = "./index.html"
	} catch (error) {
		console.error(error)
		alert("Erro ao atualizar usuário: " + error.message)
	}
}

async function handleDeleteAccount() {
	if (!confirm("Tem certeza que deseja deletar sua conta?")) return

	try {
		if (!getToken()) throw new Error("No token")

		const res = await fetch(`${API_URL}/users`, {
			method: "DELETE",
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

		deleteToken()
		window.location.href = "./index.html"
	} catch (error) {
		console.error(error)
		alert("Erro ao deletar usuário" + error.message)
	}
}

fetchUser()
	.then((user) => {
		renderUser(user)
	})
	.catch((error) => {
		console.error(error)
		alert("Erro ao buscar dados do usuário")
	})
