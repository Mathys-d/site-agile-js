feedPage = 15
const tab = {
    strDrink: [],
    strCategory	: []
}
let l=0;
function newArticle(post) {

    const article = document.createElement('article')
    article.innerHTML = `
    <div class="joke">
    <p>${post.strDrink}</p>
    <p>${post.strCategory	}</p> 
    </div>`
    return article
}
//    <p>${l}</p>  connaitre le nb de pages 





async function main() {

    for (i = 0; i < feedPage; i++) {

        const wrapper = document.querySelector('#lastPosts')
        const loader = document.createElement('p')
        loader.innerText = 'Chargement...'
        wrapper.append(loader)

        try {
            const r = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            console.log(r)

            if (!r.ok) {
                throw new Error('erreur serveur ');
            }

            const post = await r.json()
            loader.remove()
            wrapper.prepend(newArticle(post))
            tab.setup.push(post.strDrink)
            tab.delivery.push(post.strCategory	)
            console.log(tab)
            l++;
        }

        catch (e) {
            loader.innerText = 'impossible a charger'
            loader.style.color = 'red'
            console.log("dfahadudahn")
            return
        }

    }
}

main()

document.querySelector('button').addEventListener('click', function() {
    // Your JavaScript code here
    main()
  });