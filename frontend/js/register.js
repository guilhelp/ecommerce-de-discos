const form = document.getElementById("form")

form.addEventListener("submit", async (e) => {
	e.preventDefault()
	handleRegister()
})

async function handleRegister() {
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
		const res = await fetch(`${API_URL}/register`, {
			method: "POST",
			headers: {
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
		alert("Erro ao se registrar: " + error.message)
	}
}
