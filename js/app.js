const mainContainer = document.querySelector('.main-grid-container')
const modalContainer = document.querySelector('.overlay')


fetch('https://randomuser.me/api/?results=12&nat=au,es,fi,fr,nz,us')
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        generateCard(data)
        generateModal(data)
    })    

function generateCard(data) {
    for (let i=0; i<data.results.length; i++) {
        const card = document.createElement('div')
        card.classList.add('card-container')
        card.innerHTML = `
            <img class="thumbnail" src="${data.results[i].picture.large}">
            <div class="employee-info">
                <h3 class="name">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                <p>${data.results[i].email}</p>
                <p>${data.results[i].location.city}</p>
            </div>
        `
        mainContainer.appendChild(card)
    }
}

/* 
Modal functionality: 
    click on card, pop up modal with expanded information on that employee
    have a left/right arrow for switching between employees
        moving right grabs next siblings information to display 
        moving left grabs last siblings information to display
    have a close modal button/window click to close? 
*/

function generateModal(data) {
    for (let i=0; i<data.results.length; i++) {
        const modal = document.createElement('div')
        modal.classList.add('modal-window')
        modal.innerHTML = `
            <p class="modal-close">X</p>
            <div class="main-modal-info">
                <img class="modal-img" src="${data.results[i].picture.large}">
                <h3 class="name">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                <p>${data.results[i].email}</p>
                <p>${data.results[i].location.city}</p>
            </div>
            <div class="additional-modal-info">
                <p>${data.results[i].cell}</p>
                <p>${data.results[i].location.street.number} ${data.results[i].location.street.name} ${data.results[i].location.city}, ${data.results[i].location.country}</p>
                <p>Birthday: ${data.results[i].dob.date}</p>
            </div>
        `
        modalContainer.appendChild(modal)
    }
    
}

$(".card-container").click(() => {
    const index = $(this).index()
    console.log(index)
})