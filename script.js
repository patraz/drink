const drinkName = document.querySelector("#drink")
const drinkBtn = document.querySelector("#new-drink")
const ingredients = document.querySelector("#ingredients")
const list = document.querySelector("#list2")
const list2 = document.querySelector("#list")
const listElements = document.getElementsByTagName("li")
const lists = document.querySelectorAll("ul")
const drink = document.getElementById("drink")
const intro = document.getElementById("quote")
const loader = document.getElementById('loader')
const drinkContainer = document.getElementById('drink-container')
let input = document.getElementById("input")
const convertBtn = document.getElementById('convert')
const result = document.getElementById('oz-result')
const photo = document.getElementById('photo')

const imgContainer = document.createElement('img');


console.log(drinkContainer)
console.log(loader)

console.log(input)

// converting oz to ml

function convert() {
    let oz = input.value *  29.57;
    console.log(oz)
    result.innerText = `${oz} ml`
}

// Show loading
function loading() {
    loader.hidden = false;
    drinkContainer.hidden = true;
}

function complete() {
    if (!loader.hidden) {
        drinkContainer.hidden = false;
        loader.hidden = true;
    }
}


console.log(listElements)

// Get Drink  & ingredients  from API
async function getDrink() {
    loading()
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const drinkObj = data.drinks[0]
        drinkName.innerText = drinkObj.strDrink;
        const drinkImg = drinkObj.strDrinkThumb;
        const drinkId = drinkObj.idDrink
        const arrDrinkObj = Object.entries(drinkObj)
        imgContainer.setAttribute('src', '')
        imgContainer.setAttribute('width', '300px')
        imgContainer.setAttribute('src', `${drinkImg}`)
        photo.append(imgContainer)
        for (thing in
             drinkObj) {
            for (let i = 0; i<15; i++) {
                if (thing === `strIngredient${[i]}` && drinkObj[thing]!== null) {                     
                    const ingr = document.createTextNode(`${drinkObj[thing]}`)
                    const li = document.createElement('li')
                    li.appendChild(ingr)
                    list.appendChild(li)
                } else if (thing ===`strMeasure${[i]}` && drinkObj[thing]!== null) {
                    const msr = document.createTextNode(`${drinkObj[thing]}`)
                    const li2 = document.createElement("li")
                    li2.appendChild(msr)
                    list2.appendChild(li2)
                    
                }
            }
        } complete();
    } catch (error) {
        console.log('no drink', error);
    }
}

// delete old ingredients & measurments

function deleteLiGetDrink() {
    for (var i = 0; i<2; i++) {
        console.log(lists[i]);
        let elements = lists[i]
        while (elements.firstChild)
        elements.removeChild(elements.firstChild);
    }
    getDrink();
}



// Getting new drink by using the button
drinkBtn.addEventListener('click', deleteLiGetDrink)
input.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        convert();
    }
})
convertBtn.addEventListener('click', convert)

// on load
getDrink();
