document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`

// use the date object
const today = new Date();
const year = document.querySelector("#currentyear");
year.textContent = `${today.getFullYear()} `;