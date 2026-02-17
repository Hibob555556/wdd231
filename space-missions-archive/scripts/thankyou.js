const FIRST_NAME_CONTAINER = document.querySelector('#user-first-name');
const SIGNED_UP_FOR = document.querySelector('#signed-up-for');

const QUERY_STRING = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRING);

const FIRST_NAME = URL_PARAMS.get('first-name');
const EMAIL = URL_PARAMS.get('email');
const WEEKLY_UPDATE = URL_PARAMS.get('weekly-update');
const THIS_DAY = URL_PARAMS.get('this-day-in-history');
const HIGHLIGHT = URL_PARAMS.get('daily-highlight');

FIRST_NAME_CONTAINER.textContent = `${FIRST_NAME}!`;

let received = [];
if (WEEKLY_UPDATE === 'on')
    received.push(" Weekly Updates");
if (THIS_DAY === 'on')
    received.push(" Events on This Day In History")
if (HIGHLIGHT === 'on')
    received.push(" Daily Highlights")

let text = "";
if (received.length > 2) {
    let original = received[2];
    let newText = ` and ${original}`;
    received[2] = newText;
    text = received.toString();
} else {
    text = received.toString().replace(',', ' and');
}

text += ` in your inbox for ${EMAIL}`;

SIGNED_UP_FOR.textContent = text;
