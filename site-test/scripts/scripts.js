feedPage = 15
const tab = {
    setup: [],
    delivery: []
}
let l=0;
function newArticle(post) {

    const article = document.createElement('article')
    article.innerHTML = `
    <div class="joke">    
    <p>${post.setup}</p>
    <p>${post.delivery}</p> 
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
            const r = await fetch('https://v2.jokeapi.dev/joke/Any?lang=fr')
            console.log(r)

            if (!r.ok) {
                throw new Error('erreur serveur ');
            }

            const post = await r.json()
            loader.remove()
            wrapper.prepend(newArticle(post))
            tab.setup.push(post.setup)
            tab.delivery.push(post.delivery)
            console.log(tab)
            l++;
        }

        catch (e) {
            loader.innerText = 'impossible a charger'
            loader.style.color = 'red'
            return
        }

    }
}

main()

document.querySelector('button').addEventListener('click', function() {
    // Your JavaScript code here
    main()
  });