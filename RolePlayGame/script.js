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
    },
    {
        name : "fight",
        "button text" : ["Attack", "Dodge", "Run"],
        "button functions" : [attack, dodge, goTown],
        text : "You are fighting a monster."
    },
    {
        name : "kill monster",
        "button text" : ["Go to town square", "Go to town square", "Go to town square"],
        "button functions" : [goTown, goTown, goTown],
        text : "The monster screams 'Arg!' as it dies. You gain experience points and find gold."
    },
    {
        name : "lose",
        "button text" : ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions" : [restart, restart, restart],
        text : "You have died. &#x2620;",
    },
    {
        name : "win",
        "button text" : ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions" : [restart, restart, restart],
        text : "You defeated the dragon! YOU WON THE GAME! &#x1F389;",
    }
];

const monsters = [
    {
        name : "slime",
        level : 2,
        health : 15
    },
    {
        name : "fanged beast",
        level : 8,
        health : 60
    },
    {
        name : "dragon",
        level : 20,
        health : 300
    }
]

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

function buyWeapon(){
    //the array of weapons is 0 based, so the last index is the length of the array - 1
    if ( currentWeaponIndex < weapons.length - 1){
        if (gold >=30){
            gold -= 30;
            currentWeaponIndex ++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeaponIndex].name;
            text.innerText = `You now have a new weapon. You now have a ${newWeapon}. `;
            inventory.push(newWeapon);
            text.innerText += ` In your inventory you have: ${inventory}`;
            
        } else {
            text.innerText = "You don't have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
    
}

function goTown(){
   update(locations[0]);
}

function update(location){
    monsterStats.style.display = "none";

    button1.innerText = location["button text"][0];
    button1.onclick = location["button functions"][0];

    button2.innerText = location["button text"][1];
    button2.onclick = location["button functions"][1];

    button3.innerText = location["button text"][2];
    button3.onclick = location["button functions"][2];
    
    //changing innerText to innerHTML to allow for the use of HTML entities(like emojis)
    text.innerHTML = location.text;

    
}

function fightSlime(){
    fighting = 0;
    goFight();
};

function fightBeast(){
    fighting = 1;
    goFight();
};

function fightDragon(){
    fighting = 2;
    goFight();
};

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats = document.querySelector("#monsterStats");
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
};

function sellWeapon(){
    if (inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = `You sold your ${currentWeapon} for 15 gold.`;
        text.innerText += ` In your inventory you have: ${inventory}`;
    } else {
        text.innerText = "You can't sell your only weapon!";
    }
};

function attack(){
    text.innerText = `The monster ${monsters[fighting].name} attacks.`;
    text.innerText += `\nYou attack it with your ${weapons[currentWeaponIndex].name}.`;
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    if (health <= 0){
        lose();
    } else if (monsterHealth <= 0){
        if (fighting === 2){
            winGame();

        } else {
            defeatMonster();
        }
    }
};

function dodge(){
    text.innerText = `You dodge the attack from the ${monsters[fighting].name}.`;
};

function lose(){
    update(locations[5]);
};

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
};

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeaponIndex = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    xpText.innerText = xp;
    healthText.innerText = health;
    goTown();
}

function winGame(){
    update(locations[6]);
}