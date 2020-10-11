//Get all monsters(or 50 in this case??)
let page = 1
fetch('http://localhost:3000/monsters/?_limit=20&_page=1')
.then(function(res) {
    return res.json()
})
.then(function(monsters) {
    for(const monster of monsters) {
        addMonster(monster)
    } 
})

//Add new monster to page
function addMonster(monster) {
    const div = document.querySelector('#monster-container')
    
    const h3 = document.createElement('h3')
    h3.innerHTML = monster.name

    const h5 = document.createElement('h5')
    h5.innerHTML = `Age: ${monster.age}`

    const p = document.createElement('p')
    p.innerHTML = `Bio: ${monster.description}`

    div.append(h3, h5, p)
}

//Build create form 
const createDiv = document.querySelector('#create-monster')
const form = document.createElement('FORM')

const name = document.createElement('input')
name.setAttribute('type', 'text')
name.setAttribute('placeholder', 'name...')
name.setAttribute('id', 'new-name')

const age = document.createElement('input')
age.setAttribute('type', 'number')
age.setAttribute('placeholder', 'age...')
age.setAttribute('id', 'new-age')

const description = document.createElement('input')
description.setAttribute('type', 'text')
description.setAttribute('placeholder', 'description...')
description.setAttribute('id', 'new-description')

const submit = document.createElement('button')
submit.setAttribute('type', 'submit')
submit.innerHTML = 'Create Monster'

form.append(name, age, description, submit)
createDiv.append(form)

submit.addEventListener('click', function(e) {
    e.preventDefault()
    const newName = document.getElementById("new-name").value
    const newAge = document.getElementById("new-age").value
    const newDescription = document.getElementById("new-description").value
    createMonster(newName, newAge, newDescription)
    form.reset()
})

function createMonster(name, age, description) {
 //Add new monster to database
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age,
            description: description
        })
    })
    .then(function(res) {
        return res.json()
    })
    .then(function(monster) {
        addMonster(monster) 
    })
}

const backb = document.querySelector('#back')
backb.addEventListener('click', function(e) {
    e.preventDefault()
   if (page > 1) {
        goBackward(page)
   } else {
        alert("You are on page 1.")
   }
})

//The below is not working properly. I get the correct path and it is removing and 
// repopulating monsters, but the get requests are not coming through correctly for other pages.
function goBackward(page) {
    const div = document.querySelector('#monster-container')
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    let newPage = page - 1
    page = page - 1
fetch(`http://localhost:3000/monsters/?_limit=20&_page=${newPage}`)
.then(function(res) {
    return res.json()
})
.then(function(monsters) {
    for(const monster of monsters) {
        addMonster(monster)
    } 
})
}

const forwardb = document.querySelector('#forward')
forwardb.addEventListener('click', function(e) {
    e.preventDefault()
    goForward(page)
 })

function goForward(page) {
    const div = document.querySelector('#monster-container')
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    let newPage = page + 1
    page = page + 1
fetch(`http://localhost:3000/monsters/?_limit=20&_page=${newPage}`)
.then(function(res) {
    return res.json()
})
.then(function(monsters) {
    for(const monster of monsters) {
        addMonster(monster)
    } 
})
}