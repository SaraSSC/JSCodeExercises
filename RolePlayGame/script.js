// Attributes and variables
let age = 32;
let xp = 0;
let gold = 50;
let health = 100;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

//Methods
let button1 = document.querySelector("#button1");
let button2 = document.querySelector("#button2");
let button3 = document.querySelector("#button3");

let text = document.querySelector("#text");
let xpText = document.querySelector("#xpText");
let goldText = document.querySelector("#goldText");
let healthText = document.querySelector("#healthText");
let monsterStats = document.querySelector("#monsterStats");
let monsterName = document.querySelector("#monsterName");

let monsterHealthText = document.querySelector("#monsterHealth");

//Objects
const weapons = [
    {
        name : "stick",
        power : 5
    },
    {
        name : "dagger",
        power : 30
    },
    {
        name : "claw hammer",
        power : 50
    },
    {
        name : "sword",
        power : 100
    }
];
const locations = [
    {
        name : "town square",
        "button text" : ["Go to store", "Go to cave", "Fight the dragon"],
        "button functions" : [goStore, goCave, fightDragon],
        text : "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name : "store",
        "button text" : ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions" : [buyHealth, buyWeapon, goTown],
        text : "You enter the store."
    },
    {
        name : "cave",
        "button text" : ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions" : [fightSlime, fightBeast, goTown],
        text : "You enter the cave. You see some monsters."
    }
];

//Functions
function goStore(){
    console.log("Going to the store.");
    update(locations[1]);
   
}

function goCave(){
    console.log("Going to the cave.");
    update(locations[2]);
}

function fightDragon(){
    console.log("Fighting the dragon.");
}

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function buyHealth(){
   

    if (gold >=10){
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You don't have enough gold to buy health.";
    }
}

function buyWeapon(){}

function goTown(){
   update(locations[0]);
}

function update(location){
    button1.innerText = location["button text"][0];
    button1.onclick = location["button functions"][0];

    button2.innerText = location["button text"][1];
    button2.onclick = location["button functions"][1];

    button3.innerText = location["button text"][2];
    button3.onclick = location["button functions"][2];
    
    text.innerText = location.text;
}

function fightSlime(){};

function fightBeast(){};