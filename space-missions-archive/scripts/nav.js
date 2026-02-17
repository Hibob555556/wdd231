const HAMBURGER = document.querySelector('#hamburger');
const HEADER_NAV = document.querySelector('#nav-bar');

// Event listeners
HAMBURGER.addEventListener('click', () => {
    toggleDisplay(HEADER_NAV);
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 700) {
        if (!HEADER_NAV.classList.contains('visible'))
            HEADER_NAV.classList.add('visible');
    } else {
        if (HEADER_NAV.classList.contains('visible'))
            HEADER_NAV.classList.remove('visible');
    }
});

// Display Functions
function toggleDisplay(element) {
    element.classList.toggle('visible');
}
