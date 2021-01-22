const fs = require('fs');

let playerCount = 4;
let players = new Array(playerCount);
let startingHand = 3;
let winningScore = 20;
let maxActiveTasks = 4;
let maxActionPerTurn = 3;

// class TaskManager {
//   constructor() {
//     this.tasks = [];
//   }
//   addTaks
// }

class Player {
  constructor(name, board, firstDraw) {
    this.playerName = name;
    this.board = board;
    this.playerHand = firstDraw;
  }
  drawCard(deck) {
    this.playerHand.push(deck.drawCard());
  }
  exchangeForComponent(cardsList) {
    //need to take the index in our hand and exchange it for components
    //need to add those to the board
  }

  printState() {
    console.log(this.playerName)
    console.log(this.board)
    console.log(this.playerHand)
  }
}

class Board {
  constructor() {
    this.rewardPoints = 0;
    this.cpu_level = 1;
    this.ram_count = 1;
    this.harddrive_count = 1;
    this.activeTasks = [];
    this.hand = [];
    this.ramLevelPrice = [2,3,4];
    this.cpuLevelPrice = [2,3,4];
    this.hddLevelPrice = [2,3,4];
  }

  upgradeRam(cardsList) {
    //get total of all the cards
    //look at current level of ram and if the level is good then remove cards and upgrade ram
    //if it is not then put cards back in hand
    let totalCount = 0;
    for(let i = 0; i < cardsList.length; i++) {
      totalCount += this.hand.indexOf(cardsList[i]);
    }
    if(totalCount >= ramLevelPrice[this.ram_count]) {
      addRam()
      //discard cards
      for(let i = 0; i < cardsList.length; i++) {
        this.hand = this.hand.splice(this.hand.indexOf(cardsList[i]), 1);
      }
    } else {
      return "not enough money to upgrade. You provided:", totalCount, "Need:",ramLevelPrice[this.ram_count]
    }
  }

  upgradeHDD(cardsList) {
    //get total of all the cards
    //look at current level of ram and if the level is good then remove cards and upgrade ram
    //if it is not then put cards back in hand
    let totalCount = 0;
    for(let i = 0; i < cardsList.length; i++) {
      totalCount += this.hand.indexOf(cardsList[i]);
    }
    if(totalCount >= hddLevelPrice[this.harddrive_count]) {
      this.addHardDrive()
      //discard cards
      for(let i = 0; i < cardsList.length; i++) {
        this.hand = this.hand.splice(this.hand.indexOf(cardsList[i]), 1);
      }
    } else {
      return "not enough money to upgrade. You provided:", totalCount, "Need:",hddLevelPrice[this.harddrive_count]
    }
  }

  upgradeCPU(cardsList) {
    //get total of all the cards
    //look at current level of ram and if the level is good then remove cards and upgrade ram
    //if it is not then put cards back in hand
    let totalCount = 0;
    for(let i = 0; i < cardsList.length; i++) {
      totalCount += this.hand.indexOf(cardsList[i]);
    }
    if(totalCount >= cpuLevelPrice[this.cpu_count]) {
      addRam()
      //still need to return the cards to the deck
      for(let i = 0; i < cardsList.length; i++) {
        this.hand = this.hand.splice(this.hand.indexOf(cardsList[i]), 1);
      }
    } else {
      return "not enough money to upgrade. You provided:", totalCount, "Need:",cpuLevelPrice[this.cpu_count]
    }
  }

  upgradeCPU () {
    this.cpu_level = Math.max(this.cpu_level++, 3)
  }
  addRam () {
    this.ram_count = Math.max(this.ram_count++, 4)
  }
  addHardDrive () {
    this.harddrive_count = Math.max(this.harddrive_count++, 3)
  }

  maxAllowedTask () {
    //currently the cpu level directly correlates to how many tasks
    return this.cpu_level;
  }

  addNewTask(cardNum) {

    if(this.activeTasks.length >= maxActiveTasks) {
      console.log('cpu at maximum capacity. Cannot take this task');
      return;
    }
    if(this.activeTasks.length > maxAllowedTask) {
      console.log('your cpu does not have the capacity to run these many tasks yet, try upgrading your cpu. Your cpu is currently at', this.cpu_level);
    }
    //todo
    //giving a number or
    let task = this.hand.splice( cardNum, 1)
    this.activeTasks.push(task);
  }

  cycleUpPhase() {
    //loop through all the active tasks counts and decrement all of them, if one of them are done then remove them from the list and update the points
    for(let i = 0; i < this.activeTasks; i++) {
      this.activeTasks[i].cycles--;
      if(this.activeTasks[i].cycles === 0) {
        //done this task will be removed
        //first add any winning points
        this.rewardPoints += this.activeTasks[i].rewardCost;
        this.activeTasks = this.activeTasks.slice(i);
        console.log('A task was completed the new task and new score for the player',this.rewardPoints);
      }
    }
  }
}

class TaskMonitor {
  constructor(card) {
    this.card = new Card(card);
    this.cycles = card.cycles;
  }
}

class Deck {
  constructor() {
    this.deck = [];
  }
  addCard(card) {
    this.deck.push(card);
  }
  shuffleDeck() {
    for (var i = this.deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.deck[i];
        this.deck[i] = this.deck[j];
        this.deck[j] = temp;
    }
  }
  drawCard () {
    return this.deck.shift();
  }
  drawInitialHand(num) {
    return this.deck.splice(0, num);
  }

}

class Card {
  constructor(name, cycles, rewardPoints, rewardCost, level) {
    this.name = name,
    this.cycles = cycles,
    this.rewardPoints = rewardPoints,
    this.rewardCost = rewardCost,
    this.level = level
  }
}

console.log('Starting game');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Getting deck of cards');

//game configs
let rawdata = fs.readFileSync('cards.json');
let cards = JSON.parse(rawdata);

let deck = new Deck();
for(let i = 0;i<cards.length;i++) {
  deck.addCard(
    new Card(
      null,
      cards[i].cycles,
      cards[i].reward_points,
      cards[i].reward_cost,
      cards[i].level
    )
  )
}
deck.shuffleDeck();
//deck is setup and ready to play
console.log('deck is ready')





for(let i=0; i<playerCount; i++){
  //make these many players with boards
  console.log('making player ', i);
  players[i] = new Player('player '+i, new Board, deck.drawInitialHand(startingHand));
}
console.log('players are ready')

function nextPlayer(currentPlayer) {
  return ++currentPlayer%playerCount;
}

function printGameScreen() {
  console.log('Active Player: ',activePlayer);
}

function printPlayer(PlayerNum) {
  players[PlayerNum].printState();
}

let activePlayer = 0;
let playerActionCount = 0;
//run the game loop
function startRound() {
  printGameScreen();
  printPlayer(activePlayer)
  rl.question("Command: ", function(answer) {

    //draw phase
    //play hand phase
    //buy components
    //play action

    //if final person has reached then do the cycle update round

    //check to see if anyone has reached the winning amount


    //need to cycle between players

    if (/^[d]/.test(answer)) {
      console.log('someone pressed the d')
      players[activePlayer].drawCard(deck);
      playerActionCount++;
    }

    if (/^[x]/.test(answer)) {
      console.log('someone pressed x')
      let pred = answer.split(' ');
      let temp = pred[1];
      let cardsList = temp.split(",");
      var result = cardsList.map(function (x) {
        return parseInt(x, 10);
      });
      //need to draw that many cards for this player
      //error handling make sure not allowed take more than allowed

      players[activePlayer].board.exchangeForComponent(result);
      playerActionCount++;
    }

    if (/^[t]/.test(answer)) {
      let pred = answer.split(' ');
      let cardNum = pred[1];
      players[activePlayer].board.addNewTask(cardNum);
      playerActionCount++
    }

    if (answer == "help" || answer == "h") {
      console.log('>d //to draw a card');
      console.log('>x 1,2,3 //to exchange cards for components, the number in csv will be the number of the card in your hand');
      console.log('>t n // to add a card from your hand to the tasks');
    }

    if (answer == "exit"){
      rl.close();
    } else {
      if(playerActionCount == maxActionPerTurn) {
        activePlayer = nextPlayer(activePlayer);
        playerActionCount = 0;
      }



      startRound();
    }
  });
}
console.log('starting the game loop===>')
startRound()


