const drinkName = document.querySelector("#drink")
const drinkBtn = document.querySelector("#new-drink")
const twitterBtn = document.querySelector("#twitter")
const ingredients = document.querySelector("#ingredients")
const list = document.querySelector("#list2")
const list2 = document.querySelector("#list")
const listElements = document.getElementsByTagName("li")
const lists = document.querySelectorAll("ul")

console.log(lists)

console.log(listElements)

// Get Drink    from API
async function getDrink() {
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const drinkObj = data.drinks[0]
        drinkName.innerText = drinkObj.strDrink;
        const drinkId = drinkObj.idDrink
        console.log(data.drinks[0])
        const arrDrinkObj = Object.entries(drinkObj)
        for (thing in drinkObj) {
            // console.log(`${thing} : ${drinkObj[thing]}`)
            // console.log(drinkObj[thing])
            for (let i = 0; i<15; i++) {
                if (thing === `strIngredient${[i]}` && drinkObj[thing]!== null) {
                    // console.log(`${thing} : ${drinkObj[thing]}`)
                     
                    const ingr = document.createTextNode(`${drinkObj[thing]}`)


                    const li = document.createElement('li')

                    li.appendChild(ingr)
                    
                   //console.log(ingr)
                    

                    list.appendChild(li)
                } else if (thing ===`strMeasure${[i]}` && drinkObj[thing]!== null) {
                    // console.log(drinkObj[thing])
                    const msr = document.createTextNode(`${drinkObj[thing]}`)

                    // console.log(msr)

                    const li2 = document.createElement("li")

                    li2.appendChild(msr)

                    list2.appendChild(li2)
                    //console.log(li2)
                }
            }
        }
    } catch (error) {
        console.log('no drink', error);
    }
}

function deleteLiGetDrink() {
    for (var i = 0; i<2; i++) {
        console.log(lists[i]);
        let elements = lists[i]
        while (elements.firstChild)
        elements.removeChild(elements.firstChild);
    }
    getDrink();
}
// on load
getDrink();


// Getting new drink by using the button

drinkBtn.addEventListener('click', deleteLiGetDrink)

