// Variabelen
let score = 0;
let siuuTimeout;

const startScherm = document.getElementById('startscherm');
const speelScherm = document.getElementById('speelscherm');
const startKnop = document.getElementById('startBtn');

const afbeelding = document.getElementById("ronaldoImg");
const terugkoppeling = document.getElementById("feedback");
const scoreWeergave = document.getElementById("score");
const siuuGeluid = new Audio("goal-crowd-roaring_F_minor.wav");//eigen onderzoek CHATGPT
const siuuExtraGeluid = new Audio("Cristiano-Ronaldo-Siuuu-Sound-Effect.mp3");

const siuuBericht = document.getElementById("siuuu-message");

const knoppen = ["sterk", "zwak", "kopbal"];

// Startspel functie
function startSpel() {
  startScherm.classList.add('hidden');
  speelScherm.classList.remove('hidden');
}

// Resetfunctie voor siuu-bericht
//CHAT GPT
//prompt:
function resetSiuu() {
  siuuBericht.style.animation = '';
  siuuBericht.style.pointerEvents = 'none';
  terugkoppeling.textContent = '';
  score = 0;
  scoreWeergave.textContent = score;
}

// Algemene klik-handler zonder variabele voor src
function klikHandler(event) {
  const knopId = event.target.id;

  if (knopId === "sterk") {
    afbeelding.src = "rechts.png";
  } else if (knopId === "zwak") {
    afbeelding.src = "links.png";
  } else if (knopId === "kopbal") {
    afbeelding.src = "koppengoed.png";
  } else {
    afbeelding.src = "1op1-removebg-preview.png";
  }

  const kans = Math.random();

  if (kans < 0.5) {
    score++;
    scoreWeergave.textContent = score;
    afbeelding.src = "juichen.png";
    terugkoppeling.textContent = "GOAL!!!⚽";
    siuuGeluid.play();

    if (score === 3) {
      siuuBericht.style.animation = 'siuuu-pop 3s ease forwards';
      siuuBericht.style.pointerEvents = 'auto';
      siuuExtraGeluid.play();

      clearTimeout(siuuTimeout);
      siuuTimeout = setTimeout(resetSiuu, 1500);
    } else {
      siuuBericht.style.animation = '';
      siuuBericht.style.pointerEvents = 'none';
    }
  } else {
    terugkoppeling.textContent = "MIS! Op deze manier haal je het nooit, KOM OP!";
  }
}

// Eventlisteners koppelen
startKnop.addEventListener('click', startSpel);

knoppen.forEach(function(id) {
  const knop = document.getElementById(id);
  if (knop) {
    knop.addEventListener("click", klikHandler);
  }
});
