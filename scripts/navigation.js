// Store interactive elements for reference
const navbutton = document.querySelector('#ham-button');

// store container elements for reference 
const navBar = document.querySelector('#nav-bar');

// toggle show class
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle("show");
    navBar.classList.toggle('show');
});