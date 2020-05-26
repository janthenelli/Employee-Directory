const mainContainer = document.querySelector('.main-grid-container')
const modalContainer = document.querySelector('.overlay')
const modal = document.querySelector('.modal-window')
let employees = []

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        generateCard(data)
        //generateModal(data)
    })    



function generateCard(data) {
    employees = data.results
    let html = ''
    employees.forEach((employee, index) => {
        let name = employee.name
        let email = employee.email
        let city = employee.location.city
        let picture = employee.picture.large
        html += `
        <div class="card-container" data-index="${index}">
            <img class="thumbnail" src="${picture}">
            <div class="employee-info">
                <h3 class="name">${name.first} ${name.last}</h3>
                <p>${email}</p>
                <p>${city}</p>
            </div>
        </div>
        `
    })
    mainContainer.innerHTML = html
}

/* 
Modal functionality: 
    click on card, pop up modal with expanded information on that employee
    have a left/right arrow for switching between employees
        moving right grabs next siblings information to display 
        moving left grabs last siblings information to display
    have a close modal button/window click to close? 
*/

function generateModal(index) {
    let {name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index]
    let date = new Date(dob.date)
    const html = `
        <div class="modal-nav">
            <p class="modal-left"> < </p>
            <p class="modal-right"> > </p>
            <p class="modal-close">X</p>
        </div>
        <div class="main-modal-info">
            <img class="modal-img" src="${picture.large}">
            <h3 class="name">${name.first} ${name.last}</h3>
            <p>${email}</p>
            <p>${city}</p>
        </div>
        <div class="additional-modal-info">
            <p>${phone}</p>
            <p>${street.number} ${street.name} ${city}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `
    modal.innerHTML = html
    modal.setAttribute('data-index', `${index}`)
    if (index == 0) {
        $(".modal-left").css('visibility', 'hidden')
    } else if (index == 11) {
        $(".modal-right").css('visibility', 'hidden')
    } else {
        $(".modal-left").css('visibility', 'visible')
        $(".modal-right").css('visibility', 'visible')
    }
    modalContainer.style.display = 'flex'
}

mainContainer.addEventListener('click', (e) => {
    if (e.target !== mainContainer) {
        const card = e.target.closest('.card-container')
        const index = card.getAttribute('data-index')
        generateModal(index)
    }
})


$(document).on('click', ".modal-close", () => {
    $(".overlay").hide()
})

$(document).on('click', ".modal-left", (e) => {
    const modal = e.target.closest('.modal-window')
    const index = modal.getAttribute('data-index')
    generateModal(index - 1)
})

$(document).on('click', '.modal-right', (e) => {
    const modal = e.target.closest('.modal-window')
    const index = modal.getAttribute('data-index')
    const next = parseInt(index) + 1
    generateModal(next)
})


$(".search-bar").keyup(() => {
    const input = $('.search-bar').val().toLowerCase()
    const cards = document.querySelectorAll('.card-container')
    for (let i=0; i<cards.length; i++) {
        if (!cards[i].children[1].children[0].textContent.toLowerCase().includes(input)) {
            cards[i].classList.add('hide')
        }
        if (input === '') {
            cards[i].classList.remove('hide')
        }
    }
})

