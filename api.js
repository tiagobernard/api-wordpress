let listagem = document.querySelector("#lista");

fetch("https://lab82.dev/wp-json/wp/v2/posts/")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ${response.status} : ${response.statusText}`)
        }
        return response.json();
    })
    .then(data => {
        data.forEach((item, index) => {
            let ul = document.createElement('ul')
            let li = document.createElement('li')
            ul.appendChild(li);
            li.innerHTML = `
            <h3>${item.title.rendered}</h3>
            <img src="${item.featured_image.size_full}">
            <p>${item.excerpt.rendered}</p>
            <button id="abrePost${index}">Leia mais</button>`;
            listagem.appendChild(ul);
            ul.className = 'list-group';
            li.className = 'list-group-item';
            //======
            document.querySelector(`#abrePost${index}`).addEventListener("click", () => {
                listagem.style.display = "none"
                let postCompleto = document.querySelector("#postIntegra");
                postCompleto.style.display = "block";
                postCompleto.innerHTML = `
                <h1>${item.title.rendered}</h1>
                <img src="${item.featured_image.size_full}">
                ${item.content.rendered}
                <button id="resetPost">VOLTAR</button>`;
                //========
                document.querySelector("#resetPost").addEventListener("click", () => {
                    postCompleto.style.display = 'none';
                    listagem.style.display = 'block'
                })
            });
        })
    })
    .catch(error => {
        console.error("Ocorreu um erro durante a solicitação: ", error.message)
    })

