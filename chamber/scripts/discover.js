import data from "../data/discover.mjs";

const container = document.querySelector('#discover');
const learnMoreButton = () => { return document.createElement('button') };

for (let point of data) {
    // create elements
    let discoverContainer = document.createElement('div');
    let name = document.createElement('h2');
    let addr = document.createElement('address');
    let desc = document.createElement('p');
    let fig = document.createElement('figure');
    let img = document.createElement('img');
    let btn = learnMoreButton();

    // set text
    name.textContent = point.name;
    addr.textContent = point.address;
    desc.textContent = point.description;

    // set image attributes
    img.setAttribute('src', point.image);
    img.setAttribute('alt', point.alt);
    fig.appendChild(img);

    // set button attributes
    btn.textContent = 'Learn More';

    // add elements to container
    discoverContainer.appendChild(name);
    discoverContainer.appendChild(fig);
    discoverContainer.appendChild(addr);
    discoverContainer.appendChild(desc);
    discoverContainer.appendChild(btn);

    // prepare discover container for editing
    discoverContainer.classList.add('discover-card');

    // add elements to screen
    container.appendChild(discoverContainer);
}
