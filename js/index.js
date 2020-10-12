console.log('hi')

const url='http://localhost:3000/monsters/?_limit=50';

const backb = document.querySelector('#back')
backb.addEventListener('click', function(e) {
    e.preventDefault()
   if (page > 1) {
        changePage(page--)
   } else {
        alert("You are on page 1.")
   }
})

const forwardb = document.querySelector('#forward')
forwardb.addEventListener('click', function(e) {
    e.preventDefault()
    changePage(page++)
 })

let page = 1

changePage()
function changePage(page){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(monsters => monsters.forEach(monster => createMonsterCard(monster)))
}

function createMonsterCard(monster){
    const div = document.querySelector('#monster-container')

    const h3 = document.createElement('h2')
    h3.innerHTML = monster.name

    const h5 = document.createElement('h4')
    h5.innerHTML = `Age: ${monster.age}`

    const p = document.createElement('p')
    p.innerHTML = `Bio: ${monster.description}`

    div.append(h3, h5, p)
}


const div = document.querySelector('#monster-container')
const form = document.createElement("FORM")

const name = document.createElement('input')
name.type = 'text'
name.placeholder = 'name...'
name.id = 'new-name'

const age = document.createElement('input')
age.type = 'number'
age.placeholder = 'age...'
age.id = 'new-age'

const description = document.createElement('input')
description.type = 'text'
description.placeholder = 'description...'
description.id = 'new-description'

const submit = document.createElement('button')
submit.type = 'submit'
submit.innerHTML = 'Create Monster'

form.append(name, age, description, submit)
div.append(form) 

submit.addEventListener('click', function(e){
    e.preventDefault()
    const newName = document.getElementById("new-name").value
    const newAge = document.getElementById("new-age").value
    const newDescription = document.getElementById("new-description").value
    createMonster(newName, newAge, newDescription)
    form.reset()
})

function createMonster(name, age, description) {
       fetch('http://localhost:3000/monsters', {
           method: 'POST',
           headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"},
           body: JSON.stringify({
               name: name,
               age: age,
               description: description})})
       .then(res => res.json())
       .then(monster => createMonsterCard(monster))
}
