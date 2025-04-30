feedPage = 1;
const tab = {
    strDrink:[],
    strCategory:[],
};


let cpt = 0;
let l = 0;
let start = 0;
function newArticle(response) {
console.log("reponse",response.strDrink)
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

 
const send = (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log('element clicked');

    let newDrinks = document.querySelector('#strDrink').value;
    let newCategory = document.querySelector('#strCategory').value;
   // let newInstructions = document.querySelector('#strInstructions').value;
    let newIngredient1 = document.querySelector('#strIngredient1').value;

    if (newDrinks,newCategory,/*newInstructions*/ strIngredient1) {
        const wrapper = document.querySelector('#lastPosts');
        wrapper.prepend(newArticle({"strDrink":newDrinks, "strCategory" :newCategory /*, "strInstructions" :newInstructions*/ , "strIngredient1":newIngredient1 }))
        console.log("newDrinks : ", newDrinks);
    
    }
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

    for (cpt = 0; cpt < feedPage; cpt++) {

        const wrapper = document.querySelector('#lastPosts')
        const loader = document.createElement('p')
        loader.innerText = 'Chargement...'
        wrapper.prepend(loader)

        try {
            fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
                .then(response => response.json())
                .then(response => {
                    // console.log(response)
                    loader.remove()

                    wrapper.prepend(newArticle(response.drinks[0]))
                    tab.strDrink.push(response.drinks[0].strDrink)
                    tab.strCategory.push(response.drinks[0].strCategory)
                })
        }
        catch (e) {
            loader.innerText = 'impossible a charger'
            loader.style.color = 'red'
            break;
        }
        await wait(3000)
        console.log("après mon délai")
    }

}// console.log("erreur de chargement")


document.querySelector('#raf').addEventListener('click', function () {
    let allChildrens = document.querySelectorAll(".feedBox");
    console.log(allChildrens);
    for (let i = 0; i < allChildrens.length; i++) {
        allChildrens[i].remove();
        main();
    }
});

function toggleInfo(element) {
    element.classList.toggle("open");
}

main();




const  pas_regarder= {
    strGlass:[],
    strInstructions	:[],
    strIngredient1:[],
    strIngredient2:[],
    strIngredient3:[],
    strIngredient4:[],
    strIngredient5:[],
    strIngredient6:[],
    strIngredient7:[],
    strIngredient8:[],
    strIngredient9:[],
    strIngredient10:[],
    strIngredient11:[],
    strIngredient12:[],
    strIngredient13:[],
    strIngredient14:[],
    strIngredient15:[],
    strIngredient1:[],
    strIngredient2:[],
    strIngredient3:[],
    strIngredient4:[],
    strIngredient5:[],
    strIngredient6:[],
    strIngredient7:[],
    strIngredient8:[],
    strIngredient9:[],
    strIngredient10:[],
    strIngredient11:[],
    strIngredient12:[],
    strIngredient13:[],
    strIngredient14:[],
    strIngredient15:[],
    strMeasure1	:[],
    strMeasure2	:[],
    strMeasure3	:[],
    strMeasure4	:[],
    strMeasure5	:[],
    strMeasure6	:[],
    strMeasure7	:[],
    strMeasure8	:[],
    strMeasure9	:[],
    strMeasure10:[],
    strMeasure11:[],
    strMeasure12:[],
    strMeasure13:[],
    strMeasure14:[],	
    strMeasure15:[],
}