var inquirer = require('inquirer');
var Table = require('cli-table');
var Abilities = require('./lib/Abilities');
var CharacterFactory = require('./lib/CharacterFactory');
var connect = require('./lib/connect');


// The Game
// ===

function Game() {
    this.party = {};
    this.inventory = {};
    this.endProcess = false;
    this.enemies = [];
}


// Help
// ---
//
// Probably a menu that can be pulled up at any time. Lists all the commands
// that can be run at any given time.

Game.prototype.help = function() {
    console.log('Is this the help menu?');
};


// Executor
// ---
//
// The executor is the running process that ensures the game continues to run.
// It's a looped game state that continues to run until the game state
// determines that something happens, at which point "that something" happens!
// Then the loop will continue until the next "something happens".

Game.prototype.executor = function() {
    this.prompt(' ', function(response) {
        this.processCommand(response);

        if (this.endProcess) {
            return false;
            process.exit(0);
        }

        this.executor(); // continue the loop!
    }.bind(this));
};


// Prompt
// ---
//
// This is the standard game prompt.

Game.prototype.prompt = function(text, callback) {
  var p = {
    type: "list",
    name: "input",
    message: text ? text : 'Something went wrong... missing text for this prompt?',
    choices: ['characters', 'enemy', 'abilities', 'exit']
  };
  inquirer.prompt([p], callback);
};


// Process Command
// ---

Game.prototype.processCommand = function(response) {
    console.log('\n');

    switch (response.input) {
        case 'exit':
            this.endProcess = true;
            break;
        case 'help':
            console.log('Here\'s your help list!');
            break;
        case 'inventory':
            console.log('Here\'s your inventory!');
            break;
        case 'enemy':
            console.log(bestiary.manufacture({type: 'plebe'}));
            break;
        case 'characters':
            console.log(characters.manufacture({type: 'kamina'}));
            break;
        case 'abilities':
            console.log(abilities.factory({slug: 'attack'}));
            break;
        default:
            console.log('No command provided...');
        break;
    }

    console.log('\n');
};


// Run the Game!
// ---

var bestiary;
var characters;
var game = new Game();

setTimeout(function() {
    game.executor();
    abilities = new Abilities().init(connect('jobAbilities'));
    characters = new CharacterFactory().init(connect('characters'));
    bestiary = new CharacterFactory().init(connect('bestiary'));
}, 1000);
