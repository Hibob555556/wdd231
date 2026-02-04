const urlParameters = new URLSearchParams(window.location.search);

const FIRST_NAME = urlParameters.get('first_name');
const LAST_NAME = urlParameters.get('last_name');
const EMAIL_ADDRESS = urlParameters.get('email_address');
const PHONE_NUMBER = urlParameters.get('phone_number');
const ORG_NAME = urlParameters.get('organization_name');
const TIMESTAMP = urlParameters.get('timestamp');

document.querySelector('#f_name').textContent = FIRST_NAME;
document.querySelector('#l_name').textContent = LAST_NAME;
document.querySelector('#email').textContent = EMAIL_ADDRESS;
document.querySelector('#number').textContent = PHONE_NUMBER;
document.querySelector('#org_name').textContent = ORG_NAME;
document.querySelector('#timestamp').textContent = TIMESTAMP;