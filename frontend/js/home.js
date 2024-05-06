const featuredSection = document.querySelector("#featured-section .discs-section__grid")
const newsSection = document.querySelector("#news-section .discs-section__grid")
const bestSection = document.querySelector("#best-section .discs-section__grid")

function renderDiscs(discs) {
	discs.forEach(({ productId, nome, preco }, index) => {
		const disc = `
            <a href="./disco.html?id=${productId}">
                <article class="disc">
					<div class="disc__image">
						<div class="disc__vinyl">
							<img src="./assets/images/discs/${productId}.png" alt="" />
						</div>
					</div>
                    <h2>${nome}</h2>
                    <p>R$ ${preco}</p>
                </article>
            </a>
        `

		if (index < 6) {
			featuredSection.innerHTML += disc
		} else if (index >= 12) {
			bestSection.innerHTML += disc
		} else {
			newsSection.innerHTML += disc
		}
	})
}

fetchDiscs()
	.then((discs) => {
		renderDiscs(discs)
	})
	.catch((error) => {
		console.error(error)
		alert("Erro ao buscar discos")
	})
