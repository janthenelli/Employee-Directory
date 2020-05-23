const mainContainer = document.querySelector('.main-grid-container')



fetch('https://randomuser.me/api/?results=12&nat=au,es,de,fi,fr,nz,us')
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => generateCard(data))




function generateCard(data) {
    for (let i=0; i<data.results.length; i++) {
        const card = document.createElement('div')
        card.classList.add('card-container')
        mainContainer.appendChild(card)
        card.innerHTML = `
            <img class="thumbnail" src="${data.results[i].picture.large}">
            <div class="employee-info">
                <h3 class="name">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                <p>${data.results[i].email}</p>
                <p>${data.results[i].location.city}</p>
            </div>
        `
    }
    
}