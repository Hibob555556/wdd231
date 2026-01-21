// Store interactive elements for reference
const navbutton = document.querySelector('#ham-button');

// store container elements for reference 
const navBar = document.querySelector('#nav-bar');

// toggle show class + accessibility state
navbutton.addEventListener('click', () => {
    const isOpen = navBar.classList.toggle('show');
    navbutton.classList.toggle('show', isOpen);

    // keep ARIA accurate
    navbutton.setAttribute('aria-expanded', String(isOpen));
    navbutton.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
});

const navList = document.querySelector('#nav-bar ul');
const navItems = navList.querySelectorAll('li');

navList.addEventListener('click', (event) => {
    // check that it was an anchor tag that was clicked
    if (event.target.tagName !== 'A') return;

    // clear the current tag off all elements
    navItems.forEach(element => {
        element.classList.remove('current');
    });

    // add the current class to whichever "button" was clicked
    event.target.closest('li').classList.add('current');
});