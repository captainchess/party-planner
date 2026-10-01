/**
 * @typedef Party
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {date string} date
 * @property {string} location
 */

// === Constants ===

const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2608";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===

let parties = [];
let selectedParty;

async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    render();
  } catch (e) {
    console.log(e);
    alert(e);
  }
}

async function getParty(id) {
  try {
    const response = await fetch(`${API}/${id}`);
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (e) {
    console.log(e);
    alert(e);
  }
}

// === Components ===

function PartyListItem(party) {
  const $party = document.createElement("li");
  $party.innerHTML = `
        <a href="#selected">${party.name}</a>`;

  $party.addEventListener("click", () => getParty(party.id));

  return $party;
}

function PartiesList() {
  const $list = document.createElement("ul");

  const $parties = parties.map(PartyListItem);

  $list.replaceChildren(...$parties);
  return $list;
}

function PartyDescription() {
  
}

function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Party Planner</h1>
        <main>
            <section>
                <h2>Upcoming Parties</h2>
                <Upcoming></Upcoming>
            </section
            <section>
                <h2>Party Details</h2>
                <Description></Description>
            </section>
        </main>
    `;

  $app.querySelector("Upcoming").replaceWith(PartiesList());
  $app.querySelector("Description").replaceWith(PartyDescription());
}

async function init() {
  await getParties();
  render();
}

init();
