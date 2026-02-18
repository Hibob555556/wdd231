const CONTAINER = document.querySelector('#missions');
const SORT_SELECT = document.querySelector("#agencySort");

const ORGS = ["isro", "roscosmos", "jaxa", "esa", "nasa", "spacex", "cnsa"];

async function getMissions() {
    try {
        const res = await fetch("/wdd231/space-missions-archive/data/missions.json");
        if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
        return await res.json();
    } catch (err) {
        console.error("Failed to load missions.json:", err);
        return null;
    }
}


function makeMissionCard(orgKey, missionName, mission) {
    // create card and set class
    const card = document.createElement("article");
    card.classList.add("mission-card", "background-1", "foreground-1");

    // create card
    let mName = document.createElement("h3");
    mName.textContent = missionName;

    let oKey = document.createElement("p");
    oKey.classList.add("org")
    oKey.innerHTML = `<strong>Agency:</strong> ${orgKey.toUpperCase()}`

    let mDest = document.createElement("p");
    mDest.innerHTML = `<strong>Destination:</strong> ${mission.destination ?? "Unknown"}`

    let mPurpose = document.createElement("p");
    mPurpose.innerHTML = `<strong>Purpose:</strong> ${mission.purpose ?? "N/A"}`;

    let dates = document.createElement("ul");
    dates.classList.add("dates");
    dates.classList.add("no-style-list");

    let launch = document.createElement("li");
    let arrival = document.createElement("li");
    let landing = document.createElement("li");
    let end = document.createElement("li");

    launch.innerHTML = `<strong>Launch:</strong> ${mission.launch ?? "N/A"}`;
    arrival.innerHTML = `<strong>Arrival:</strong> ${mission.arrival ?? "N/A"}`;
    landing.innerHTML = `<strong>Landing:</strong> ${mission.landing ?? "N/A"}`;
    end.innerHTML = `<strong>End:</strong> ${mission.end ?? "N/A"}`;

    dates.append(launch, arrival, landing, end);

    let desc = document.createElement("p");
    desc.classList.add("desc");
    desc.textContent = mission.description ?? ""

    let img = document.createElement("img");
    img.classList.add("mission-img", "mt-15");
    img.setAttribute("src", mission.image);
    img.setAttribute("alt", `${missionName} mission image`);
    img.setAttribute("loading", "lazy");

    card.append(mName, oKey, mDest, mPurpose, dates, desc, img);
    return card;
}

function getAgencyOrder(data, sortMode) {
    const available = Object.keys(data?.missions ?? {});
    const custom = ORGS.filter((k) => available.includes(k));
    const extras = available.filter((k) => !custom.includes(k));

    let list = [...custom, ...extras];

    if (sortMode === "az") {
        list.sort((a, b) => a.localeCompare(b));
    } else if (sortMode === "za") {
        list.sort((a, b) => b.localeCompare(a));
    }

    return list;
}

function renderMissions(data, sortMode = "custom") {
    if (!data?.missions) return;
    CONTAINER.innerHTML = "";

    const agencyOrder = getAgencyOrder(data, sortMode);

    for (const orgKey of agencyOrder) {
        const orgMissions = data.missions[orgKey];
        if (!orgMissions) continue;

        const orgContainer = document.createElement("section");
        orgContainer.classList.add("wide-section", "wide-span");

        const header = document.createElement("h2");
        header.textContent = orgKey.toUpperCase();
        orgContainer.appendChild(header);

        for (const [missionName, mission] of Object.entries(orgMissions)) {
            orgContainer.appendChild(makeMissionCard(orgKey, missionName, mission));
        }

        CONTAINER.appendChild(orgContainer);
    }
}

function setupSortingUI() {
    if (!SORT_SELECT) return;

    SORT_SELECT.addEventListener("change", (e) => {
        const mode = e.target.value;
        renderMissions(cachedData, mode);
    });
}

(async function init() {
    cachedData = await getMissions();
    setupSortingUI();
    renderMissions(cachedData, SORT_SELECT?.value ?? "custom");
})();