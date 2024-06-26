const form = document.getElementById("form")

form.addEventListener("submit", async (e) => {
	e.preventDefault()
	handleLogin()
})

async function handleLogin() {
	const formData = new FormData(form)

	const data = {
		email: formData.get("email"),
		senha: formData.get("password"),
	}

	try {
		const res = await fetch(`${API_URL}/login`, {
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
		alert("Erro ao se autenticar: " + error.message)
	}
}
