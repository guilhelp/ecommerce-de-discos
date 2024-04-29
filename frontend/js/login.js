const loginForm = document.getElementById("login-form")
const registerForm = document.getElementById("register-form")

async function authMiddleware() {
	const res = await fetch("http://localhost:3000/auth", {
		headers: {
			Authorization: "Bearer " + getCookie("ecommerce.token"),
		},
	})
	if (res.ok) {
		window.location.href = "home.html"
	} else {
		loading.classList.add("disabled")
	}
}

authMiddleware()

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault()
	const formData = new FormData(e.target)
	try {
		const res = await fetch("http://localhost:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: formData.get("email"),
				senha: formData.get("senha"),
			}),
		})

		if (!res.ok) throw new Error()

		const json = await res.json()
		setCookie("ecommerce.token", json.token, 60 * 60)
		window.location.href = "home.html"
	} catch (error) {
		console.error("ERROR", error)
	}
})

registerForm.addEventListener("submit", async (e) => {
	e.preventDefault()
	const formData = new FormData(e.target)

	try {
		const res = await fetch("http://localhost:3000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nome: formData.get("nome"),
				email: formData.get("email"),
				senha: formData.get("senha"),
				data_nascimento: formData.get("data-nascimento"),
				cep: formData.get("cep"),
				numero: formData.get("numero"),
				complemento: formData.get("complemento"),
			}),
		})

		if (!res.ok) throw new Error()

		const json = await res.json()
		setCookie("ecommerce.token", json.token, 60 * 60)
		window.location.href = "home.html"
	} catch (error) {
		console.error("ERROR", error)
	}
})

const body = document.querySelector("body"),
	nav = document.querySelector("nav"),
	modeToggle = document.querySelector(".dark-light"),
	searchToggle = document.querySelector(".searchToggle"),
	sidebarOpen = document.querySelector(".sidebarOpen"),
	siderbarClose = document.querySelector(".siderbarClose")
let getMode = localStorage.getItem("mode")
if (getMode && getMode === "dark-mode") {
	body.classList.add("dark")
}
// js code to toggle dark and light mode
modeToggle.addEventListener("click", () => {
	modeToggle.classList.toggle("active")
	body.classList.toggle("dark")
	// js code to keep user selected mode even page refresh or file reopen
	if (!body.classList.contains("dark")) {
		localStorage.setItem("mode", "light-mode")
	} else {
		localStorage.setItem("mode", "dark-mode")
	}
})
// js code to toggle search box
searchToggle.addEventListener("click", () => {
	searchToggle.classList.toggle("active")
})

//   js code to toggle sidebar
sidebarOpen.addEventListener("click", () => {
	nav.classList.add("active")
})
body.addEventListener("click", (e) => {
	let clickedElm = e.target
	if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
		nav.classList.remove("active")
	}
})

const container = document.querySelector(".container"),
	pwShowHide = document.querySelectorAll(".showHidePw"),
	pwFields = document.querySelectorAll(".password"),
	signUp = document.querySelector(".signup-link"),
	login = document.querySelector(".login-link")

//   js code to show/hide password and change icon
pwShowHide.forEach((eyeIcon) => {
	eyeIcon.addEventListener("click", () => {
		pwFields.forEach((pwField) => {
			if (pwField.type === "password") {
				pwField.type = "text"

				pwShowHide.forEach((icon) => {
					icon.classList.replace("uil-eye-slash", "uil-eye")
				})
			} else {
				pwField.type = "password"

				pwShowHide.forEach((icon) => {
					icon.classList.replace("uil-eye", "uil-eye-slash")
				})
			}
		})
	})
})

// js code to appear signup and login form
signUp.addEventListener("click", () => {
	container.classList.add("active")
})
login.addEventListener("click", () => {
	container.classList.remove("active")
})
