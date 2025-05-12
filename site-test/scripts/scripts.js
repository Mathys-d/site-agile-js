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
    let newIngredient1 = document.querySelector('#ingrd').value;

    if (newDrinks,newCategory,/*newInstructions*/ ingrd) {
        const wrapper = document.querySelector('#lastPosts');
        wrapper.prepend(newArticle({"strDrink":newDrinks, "strCategory" :newCategory /*, "strInstructions" :newInstructions*/ , "ingrd":newIngredient1 }))
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
        await wait(500)
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

function toggleForm() {
    let ouvrir = document.getElementById("monFormulaireDrksID");
    if (ouvrir.style.display === "block") {
        ouvrir.style.display = "none";
    } else {
        ouvrir.style.display = "block";
      }    
    console.log("adfadzdza")
}

main();


function ajout(element){

    let formulaire = window.document.formulairedrks;
       
    let bloc1 = document.createElement("span");
    let bloc2 = document.createElement("span");
    let bloc3 = document.createElement("span");


    let champ1 = document.createElement("input");
    champ1.name = "champs1";
    champ1.type = "text";
    champ1.id = "ingrd";

    let champ2 = document.createElement("input");
    champ2.name = "champs2";
    champ2.type = "number";
    champ2.id = "dose";
    
    let champ3 = document.createElement("input");
    champ3.type ="list" 
    champ3.list="champs3" 
    champ3.id ="liste" 
    champ3.name ="champs3"


    let sup = document.createElement("input");
    sup.value = "X";
    sup.type = "button";
    sup.id = "btn";  


    
    sup.onclick = function onclick(event)
    {suppression(this);};

    bloc2.appendChild(champ2);
    bloc3.appendChild(champ3);
    bloc1.appendChild(champ1);

    element.after(bloc1);
    element.after(bloc3);
    element.after(bloc2);
    element.after(sup); 

    

    let br = document.createElement("br");
    element.after(br);
}


function suppression(element){
    let formulaire = window.document.formulairedrks;
    formulaire.removeChild(element.nextSibling);
    formulaire.removeChild(element.nextSibling);
    formulaire.removeChild(element.nextSibling);
    formulaire.removeChild(element);
}