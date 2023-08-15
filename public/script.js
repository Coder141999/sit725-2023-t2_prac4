console.log("Script.js loaded!");

// Function to fetch data and populate the cards
const getProjects = () => {
    $.get('/api/projects', (response) => {
        if (response.statusCode == 200) {
            addCards(response.data);
        } else {
            console.error('Failed to fetch data:', response.message);
        }
    });
};

// Function to add cards to the page
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = `
        <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${item.image}">
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
                <p><a href="#">${item.link}</a></p>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
                <p>${item.description}</p>
            </div>
        </div>`;
        
        $("#card-section").append(itemToAppend);
    });
};

// Ready function to call methods when the page loads
$(document).ready(function() {
    $('.materialboxed').materialbox();
    getProjects(); // Fetch and display the cards
});
