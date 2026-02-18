const FEATURED_META = document.querySelector("#featuredMeta");
const FEATURED_DEST = document.querySelector("#featuredDestination");
const FEATURED_PURPOSE = document.querySelector("#featuredPurpose");
const FEATURED_DESC = document.querySelector("#featuredDescription");
const FEATURED_IMG = document.querySelector("#featuredImage");
const FEATURED_BTN = document.querySelector("#featuredButton");

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

function flattenMissions(data) {
    const missionsByOrg = data?.missions ?? {};
    const items = [];

    for (const [orgKey, orgMissions] of Object.entries(missionsByOrg)) {
        for (const [missionName, mission] of Object.entries(orgMissions)) {
            items.push({ orgKey, missionName, mission });
        }
    }

    return items;
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function renderFeaturedMission(picked) {
    const { orgKey, missionName, mission } = picked;

    FEATURED_META.innerHTML = `<strong>${missionName}</strong> • ${orgKey.toUpperCase()}`;
    FEATURED_DEST.innerHTML = `<strong>Destination:</strong> ${mission.destination ?? "Unknown"}`;
    FEATURED_PURPOSE.innerHTML = `<strong>Purpose:</strong> ${mission.purpose ?? "N/A"}`;

    // Keep it readable on home page (shorten long descriptions)
    const fullDesc = mission.description ?? "";
    const shortDesc =
        fullDesc.length > 320 ? `${fullDesc.slice(0, 320).trim()}…` : fullDesc;

    FEATURED_DESC.textContent = shortDesc;

    // Image
    FEATURED_IMG.src = mission.image;
    FEATURED_IMG.alt = `${missionName} mission image`;

    // Button goes to missions page (simple version)
    FEATURED_BTN.addEventListener("click", () => {
        window.location.href = "/space-missions-archive/missions.html";
    });
}

(async function initFeatured() {
    const data = await getMissions();
    if (!data?.missions) return;

    const all = flattenMissions(data);
    if (all.length === 0) return;

    const picked = pickRandom(all);
    renderFeaturedMission(picked);
})();
