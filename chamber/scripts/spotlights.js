async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    return data;
}

async function filterMembers(members) {
    members = (await members).members;
    members = Array.from(members);
    let gold_silver = members.filter((m) => m.membership >= 2)
    return gold_silver
}

async function getThreeRand(members) {
    const members_len = (await members).length;
    const gen_rand = function () {
        return Math.trunc((Math.random() * members_len) + 1) - 1
    };
    let nums = [];
    while (nums.length < 3) {
        const n = gen_rand();
        if (!(nums.includes(n)))
            nums.push(n);
    }
    return nums;
}

function createCard(memberInfo) {
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
    let excludes = [3, 4, 5];
    for (let entry of entries) {
        if (!excludes.includes(i))
            setDivText(entry, values[i]);
        card.append(entry);
        i++;
    }

    return card;
}

async function displayMembers(members, indexes) {
    const spotlightContainer = document.querySelector('#spotlights');
    let displayMembers = await members;
    let nums = await indexes;
    let nums_len = nums.length
    for (let i = 0; i < nums_len; i++) {
        const card = createCard(displayMembers[nums[i]]);
        spotlightContainer.append(card);
    }
}

let members = getMembers();
let goldSilverMembers = filterMembers(members);
let nums = getThreeRand(goldSilverMembers);
displayMembers(goldSilverMembers, nums);
