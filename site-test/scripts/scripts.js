feedPage = 10
const tab = {
    strDrink: [],
    strCategory: []
}
let l = 0;
function newArticle(response) {

    const article = document.createElement('article')
    article.innerHTML = `
    <div class="feedBox" onclick="toggleInfo(this)">
        <p>${response.strDrink}</p>
        <p>${response.strCategory}</p> 
        
        <div class="feedBoxPlus">
        ${[...Array(15).keys()].map(i => {
            const ingredient = response[`strIngredient${i + 1}`];
            const measure = response[`strMeasure${i + 1}`];
            return ingredient ? `<p>${measure ? measure + " of " : ""}${ingredient}</p>` : "";
        }).join("")}
        ${response.strGlass ? `<p>Glass: ${response.strGlass}</p>` : ""}
        ${response.strInstructions ? `<p>Instructions: ${response.strInstructions}</p>` : ""}
        </div>
    </div>`;
    return article
}


const wait = (delay = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}

//wait(3000).then(() => console.log("après mon délai"))


async function main() {

    for (let i = 0; i < feedPage; i++) {

        const wrapper = document.querySelector('#lastPosts')
        const loader = document.createElement('p')
        loader.innerText = 'Chargement...'
        wrapper.append(loader)

        try {
            fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
                .then(response => response.json())
                .then(response => {
                   // console.log(response)
                    loader.remove()
                    wrapper.prepend(newArticle(response.drinks[0]))
                    tab.strDrink.push(response.drinks[0].strDrink)
                    tab.strCategory.push(response.drinks[0].strCategory)
                    l++;
                })

        }

        catch (e) {
            loader.innerText = 'impossible a charger'
            loader.style.color = 'red'
            break;
        }

        await wait(750)
        //console.log("après mon délai")
    }
}

main()

document.querySelector('button').addEventListener('click', function () {

    let allChildrens = document.querySelectorAll(".feedBox")
    console.log(allChildrens)
    for (let i = 0; i < allChildrens.length; i++) {
        allChildrens[i].remove()
        main()
    }
});

function toggleInfo (element){
    element.classList.toggle("open")
}
