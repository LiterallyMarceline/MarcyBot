import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { getDiceChoices } from './dice.js';
import { capitalize, InstallGlobalCommands } from './utils.js';

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}
// gets the dice choices from dice.js
function createDiceChoices() {
  const choices = getDiceChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: choice,
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
};

// roll dice command
const ROLL_COMMAND = {
  name: 'roll',
  description: 'Roll some dice',
  options: [
    {
      type: 3,
      name: 'dice',
      description: 'Pick your dice',
      required: true,
      choices: createDiceChoices(),
    },
    {
      type: 4,
      name: 'amount',
      description: 'Pick your dice',
      required: true,
      min_value: 1,
      max_value: 200,
    },
  ],
  type: 1,
};


const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND, ROLL_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);