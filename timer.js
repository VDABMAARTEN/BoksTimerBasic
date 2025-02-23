"use strict";
import { byId, toon, verberg, setText } from "./util.js"
// var definieren

const display = byId("display");
const startBtn = byId("start");
const stopBtn = byId("stop");
const combo = byId("combo");

let timer = null;
let trainingsDuur = 5;
let trainingsDuurInSeconden = 0;
const secondenOmuitTeVoeren = 3;
// zo gezet omdat hij vanaf het begin al een combinatie kan tonen
let secondenTussenCombinaties = secondenOmuitTeVoeren;
let randomizer = 1;
let timerLoopt = false;

// pagina klaarzetten voor input
toonInputs();

startBtn.onclick = () => {
    trainingsDuur = byId("minutenInput").value;
    start();
    timerLoopt = true;
}

stopBtn.onclick = () => {
    stop();
    timerLoopt = false;
}

function toonInputs() {
    toon("inputDiv");
    toon("info");
    toon("feedback");
    verberg("timerDiv")
}

function toonTimer() {
    verberg("inputDiv");
    verberg("info");
    verberg("feedback");
    toon("timerDiv")
}

function start() {
    toonTimer();
    trainingsDuurInSeconden = trainingsDuur * 60;
    timer = setInterval(update, 1000);
}

function stop() {
    clearInterval(timer);
    toonInputs();
}

function update() {
    if (secondenTussenCombinaties === secondenOmuitTeVoeren) {
        secondenTussenCombinaties = 0;
        nieuweCombinatie();
    }

    let minuten = Math.floor(trainingsDuurInSeconden / 60);
    let seconden = Math.floor(trainingsDuurInSeconden % 60);

    // padding, alles 2 digits en begint met 0
    minuten = String(minuten).padStart(2, "0");
    seconden = String(seconden).padStart(2, "0");

    setText("display", `${minuten} : ${seconden}`);

    trainingsDuurInSeconden--;
    secondenTussenCombinaties++;
}

function nieuweCombinatie() {
    let vorigeCombinatie = 0;
    randomizer = Math.floor(Math.random() * 11);
    while (randomizer === vorigeCombinatie){
        randomizer = Math.floor(Math.random() * 11);
    }
    switch (randomizer) {
        case (1):
            setText("combo", "1-2")
            setText("comboUitleg", "Jab - Cross")
            break;

        case (2):
            setText("combo", "5-2")
            setText("comboUitleg", "Uppercut Links - Cross")
            break;

        case (3):
            setText("combo", "1-4")
            setText("comboUitleg", "Jab - Rechtse Hoek")
            break;

        case (4):
            setText("combo", "2-3")
            setText("comboUitleg", "Cross - Linkse Hoek")
            break;

        case (5):
            setText("combo", "6-3")
            setText("comboUitleg", "Rechtse Uppercut - Linkse Hoek")
            break;

        case (6):
            setText("combo", "1-1-2")
            setText("comboUitleg", "Jab - Jab - Cross")
            break;

        case (7):
            setText("combo", "1-2-5")
            setText("comboUitleg", "Jab - Cross - Linkse Uppercut")
            break;

        case (8):
            setText("combo", "1-2-3")
            setText("comboUitleg", "Jab - Cross - Linkse Uppercut")
            break;

        case (9):
            setText("combo", "5-6-3")
            setText("comboUitleg", "Linkse Uppercut - Rechtse Uppercut - Linkse Hoek")
            break;

        case (10):
            setText("combo", "2-3-6")
            setText("comboUitleg", "Cross - Linkse Hoek - Rechtse Uppercut")
            break;
    }
}