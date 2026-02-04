const HIDDEN_TIME = document.querySelector('#timestamp');
const DATE = new Date(Date.now()).toISOString();
HIDDEN_TIME.value = DATE;

const SHOW_NP_BUTTON = document.querySelector('#show_np_level');
const SHOW_BRONZE_BUTTON = document.querySelector('#show_bronze_level');
const SHOW_SILVER_BUTTON = document.querySelector('#show_silver_level');
const SHOW_GOLD_BUTTON = document.querySelector('#show_gold_level');
const NP_MODAL = document.querySelector('#member_level_np');
const BRONZE_MODAL = document.querySelector('#member_level_bronze');
const SILVER_MODAL = document.querySelector('#member_level_silver');
const GOLD_MODAL = document.querySelector('#member_level_gold');
const CLOSE_NP = document.querySelector('#close_np');
const CLOSE_BRONZE = document.querySelector('#close_bronze');
const CLOSE_SILVER = document.querySelector('#close_silver');
const CLOSE_GOLD = document.querySelector('#close_gold');

SHOW_NP_BUTTON.addEventListener('click', () => {
    NP_MODAL.showModal();
});
CLOSE_NP.addEventListener('click', () => {
    NP_MODAL.close();
});
SHOW_BRONZE_BUTTON.addEventListener('click', () => {
    BRONZE_MODAL.showModal();
});
CLOSE_BRONZE.addEventListener('click', () => {
    BRONZE_MODAL.close();
});
SHOW_SILVER_BUTTON.addEventListener('click', () => {
    SILVER_MODAL.showModal();
});
CLOSE_SILVER.addEventListener('click', () => {
    SILVER_MODAL.close();
});
SHOW_GOLD_BUTTON.addEventListener('click', () => {
    GOLD_MODAL.showModal();
});
CLOSE_GOLD.addEventListener('click', () => {
    GOLD_MODAL.close();
});