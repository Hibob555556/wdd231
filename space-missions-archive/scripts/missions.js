const CONTAINER = document.querySelector('#missions');
const ORGS = ["isro", "roscosmos", "jaxa", "esa", "nasa", "spacex", "cnsa"];

async function getMissions() {
    try {
        const res = await fetch("/space-missions-archive/data/missions.json");
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
    card.classList.add("mission-card");

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
    img.classList.add("mission-img");
    img.setAttribute("src", mission.image);
    img.setAttribute("alt", `${missionName} mission image`);
    img.setAttribute("loading", "lazy");

    card.append(mName, oKey, mDest, mPurpose, dates, desc, img);
    return card;
}


function renderMissions(data) {
    // sanity checks and content reset
    if (!data?.missions) return;
    CONTAINER.innerHTML = "";

    for (const orgKey of ORGS) {
        // get org missions and confirm there is at least 1
        const orgMissions = data.missions[orgKey];
        if (!orgMissions) continue;

        // create header
        const header = document.createElement("h2");
        header.textContent = orgKey.toUpperCase();
        CONTAINER.appendChild(header);

        // iterate over orgMissions object contents and create a card for each
        for (const [missionName, mission] of Object.entries(orgMissions)) {
            const card = makeMissionCard(orgKey, missionName, mission);
            CONTAINER.appendChild(card);
        }
    }
}



(async function init() {
    const data = await getMissions();
    renderMissions(data);
})();