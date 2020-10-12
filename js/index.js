const monstersURL = "http://localhost:3000/monsters";
document.addEventListener("DOMContentLoaded", ()=> { 
    console.log("loaded up!")
    let pageNum = 1
    getMonsters();

    nextPage = document.getElementById("forward")
    nextPage.addEventListener("click", (e) => {
    pageNum++;
    getMonsters(pageNum);
    })

    previousPage = document.getElementById("back")
    previousPage.addEventListener("click", (e) => {
    pageNum--;
    getMonsters(pageNum);
    })

    createMonster();
})
    
function getMonsters(a) {
    const monstContainer = document.getElementById("monster-container")
    monstContainer.innerHTML = ""
    fetch(monstersURL+"/?_limit=50"+`&_page=${a}`) 
    .then (res => res.json())
    .then (monsters => {
        monsters.forEach(monster => {
            renderMonsters(monster) 
        })
    })
}
    
    
function renderMonsters(monster) {

    const monstContainer = document.getElementById("monster-container")

    let monstCard = document.createElement("div")
    
    let monstName = document.createElement("h2")
    monstName.innerText = monster.name 
    
    let monstAge = document.createElement("h4")
    monstAge.innerText = monster.age 
    
    let monstDescription = document.createElement("p")
    monstDescription = monster.description 
    
    monstCard.append(monstName, monstAge, monstDescription)
    monstContainer.append(monstCard) 

}

function createMonster() {
    const form = document.createElement("form")

    const name = document.createElement("input")
    name.type = "text"
    name.placeholder = "Name"
    name.id = "name"

    const age = document.createElement("input")
    age.type = "text"
    age.placeholder = "Age"
    age.id = "age"

    const description = document.createElement("input")
    description.type = "text"
    description.placeholder = "Description"
    description.id = "description"

    const submit = document.createElement("button")
    submit.innerText = "Submit"
    

    form.append(name, age, description, submit)
    const container = document.getElementById("create-monster")
    container.append(form)

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let formName = document.getElementById("name").value
        let formAge = document.getElementById("age").value
        let formDesc = document.getElementById("description").value

        return fetch(monstersURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: formName,
                age: formAge,
                description: formDesc
            }),
        })
    })
}
