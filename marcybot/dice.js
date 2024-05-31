// creates choices for types of dice, and lists how many sides they have
const diceChoices = {
  d4: {
    sides:4,
  },
  d6: {
    sides:6,
  },
  d8: {
    sides:8,
  },
  d12: {
    sides:12,
  },
  d20: {
    sides:20,
  },
  d100: {
    sides:100,
  },
}
// dice function
function rollDice(sides) {
    // picks number that is <=0 and >1, multiplies it by the number of sides the dice has, rounds down to nearest integer, and adds 1
    return Math.floor(Math.random()*sides)+1;
}
function formatResults(rolls) {
  // checks there is more than 1 dice roll
  return rolls.totalStr === rolls.diceResults
  // if there is only 1, just returns the roll once
  ? rolls.diceResults
  // if there are multiple, returns all the rolls and adds them together
  : rolls.diceResults + '\n' + rolls.totalStr + ' = ' + rolls.total
}
// roll results function
export function rollResults(info) {
  // makes 1 variable to keep track of all the results
  const rolls = {
    // makes the 2 strings
    totalStr:'',
    diceResults:'',
    // keeps track of the total
    total:0,
  }
  // makes all these variables = the attributes of the variable put in the function
  const {userId, amount, diceType} = info;
  // loop rolls dice however many times it is requested to
  for(let rolled = 0; rolled < amount; rolled++) {
    // runs rollDice function (using the amount of sides the dice requested have) once per loop and then sets other variables 
    const roll = rollDice(diceChoices[diceType].sides)
    // logic for the first roll
    if(rolled === 0) {
      rolls.diceResults = roll;
      rolls.totalStr = roll;
      rolls.total = roll;
    // logic for adding punctuation for every other roll after first
    } else {
      rolls.totalStr += ' + ' + roll;
      rolls.diceResults += ', ' + roll;
      rolls.total += roll;
    }
  }
  // formats the results into the final message
  const resultStr = `<@${userId}> rolls ${amount} ${diceType}. Result(s):\n${formatResults(rolls)}`;
  // returns the message
  return resultStr;
}
// function for commands.js
export function getDiceChoices() {
  // exports the diceChoices object
  return Object.keys(diceChoices);
}
// d20 function (deprecated)
export function rollD20() {
  // rolls a 20-sided dice
  const result = rollDice(20);
  // makes output variable
  let output;
  // sets output based on result
  if (result === 1) {
      output = 'nat1! Critical Failure!';
  }
  if (result < 10) {
      output = result + '! Bad Luck!';
  }
  if (10 <= result && result < 20) {
      output = result + '! Feelin Lucky!';
  }
  if (result === 20) {
      output = 'nat20! Critical Success!';
  }
  // returns output
  return output;
};

