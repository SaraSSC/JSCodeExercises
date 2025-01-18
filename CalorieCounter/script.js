/*
 ** Declarations
 */

const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');

let isError = false;
/*
** Functions
*/

function cleanInputString(str){

    // \s = any whitespaces
    // [] use as character class, if for specific character order use \ before do escape
    const regex = /[+-\s]/g; //global
    return str.replace(regex, '');
};

function isInvalidInput(str){
    // [x - y] = range of characters
    // + = one or more
    // \d = any digit
    const regex = /[0-9]+e\d+/i; //case insensitive

    return str.match(regex);
};

function addEntry(){
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);

    let entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length;
    let HTMLString = `<label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label> 
 <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name"/>
 <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
 <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories"/>`;

 targetInputContainer.innerHTML += HTMLString;
    
};
