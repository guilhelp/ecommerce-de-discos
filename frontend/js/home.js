const destaquesContainer = document.querySelector("#destaques .container-card") //6
const preVendaContainer = document.querySelector("#pre-venda .container-card") //6
const melhoresContainer = document.querySelector("#melhores .container-card") //8

async function fetchDiscs() {
	const res = await fetch("http://localhost:3000/products")
	const discs = await res.json()

	discs.forEach((disc, index) => {
		const card = `
        <a class="card-link" href="disco.html?id=${disc.productId}">
            <div class="card">
                <br />
                <div class="card-content">
                    <img src="public/images/discs/disco_madonna.png" alt="" />
                    <p class="disc-title">${disc.nome}</p>
                    <p class="disc-price">R$ ${disc.preco}</p>
                </div>
            </div>
        </a>
        `
		if (index < 6) {
			destaquesContainer.innerHTML += card
		} else if (index >= 12) {
			melhoresContainer.innerHTML += card
		} else {
			preVendaContainer.innerHTML += card
		}
	})

	loading.classList.add("disabled")
}

fetchDiscs()
