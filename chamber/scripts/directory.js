const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");

function createDiv() { return document.createElement("div"); }
function setDivText(elem, text) { return elem.textContent = text; }
function createImage(path, alt) {
    const img = document.createElement("img");
    img.setAttribute("src", `images/${path}`);
    img.setAttribute("alt", alt);
    return img;
}
function createLink(link) {
    const container = document.createElement("div");
    const a = document.createElement("a");
    a.setAttribute("href", link);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener")
    a.textContent = link;
    container.append(a);
    return container;
}
function recordMembership(level) {
    let label = document.createElement("div");
    let text = "";
    switch (level) {
        case 1:
            text = "Member";
            break;
        case 2:
            text = "Silver";
            break;
        case 3:
            text = "Gold";
            break;
    }
    label.classList.add("member-level")
    label.textContent = `Member Level: ${text}`;
    return label;
}

function createCard(memberInfo) {
    const name = memberInfo.name;
    const address = memberInfo.address;
    const number = memberInfo.phone;
    const site = memberInfo.website;
    const image = memberInfo.image;
    const membership = memberInfo.membership;

    const card = document.createElement("section");
    const nameEntry = createDiv();
    const addressEntry = createDiv();
    const numberEntry = createDiv();
    const siteEntry = createLink(site);
    const siteImageEntry = createImage(image, memberInfo.alt);
    const membershipEntry = recordMembership(membership);

    const entries = [nameEntry, addressEntry, numberEntry, membershipEntry, siteEntry, siteImageEntry];
    const values = [name, address, number, null, site];

    let i = 0;
    let excludes = [3, 4];
    for (let entry of entries) {
        if (!excludes.includes(i))
            setDivText(entry, values[i]);
        card.append(entry);
        i++;
    }

    return card;
}

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    membersContainer.innerHTML = "";

    data.members.forEach((member) => {
        const card = createCard(member);
        membersContainer.append(card);
    });
}

getMembers();

gridBtn.addEventListener('click', () => {
    // turn off list
    membersContainer.classList.remove('list');

    // turn on grid
    membersContainer.classList.add('grid');
});

listBtn.addEventListener('click', () => {
    // turn off grid
    membersContainer.classList.remove('grid');

    // turn on list
    membersContainer.classList.add('list');
});