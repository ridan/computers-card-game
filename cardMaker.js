var fs = require('fs');
let filename = 'cards';
console.log('Making new cards in filename',filename + '.json')

let levelOneCards = [];
let levelTwoCards = [];
let levelThreeCards = [];

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

for(let i =0;i<20;i++) {
  //cycles 2-3
  //reward points 0
  //reward cost 1-2
  levelOneCards.push({
    "cycles": randomIntFromInterval(2,3),
    "reward_points": 0,
    "reward_cost": randomIntFromInterval(1,2),
    "level": 1,
  })
}
for(let i =0;i<20;i++) {
  //cycles 3-5
  //reward points 1-2
  //reward cost 1-2
  levelTwoCards.push({
    "cycles": randomIntFromInterval(3,5),
    "reward_points": randomIntFromInterval(1,2),
    "reward_cost": randomIntFromInterval(1,2),
    "level": 2,
  })
}
for(let i =0;i<20;i++) {
  //cycles 5-9
  //reward points 2-4
  //reward cost 2-3
  levelThreeCards.push({
    "cycles": randomIntFromInterval(5,9),
    "reward_points": randomIntFromInterval(2,4),
    "reward_cost": randomIntFromInterval(2,3),
    "level": 3,
  })
}

let data = JSON.stringify(levelOneCards.concat(levelTwoCards).concat(levelThreeCards), null, 4);
fs.writeFileSync(filename + '.json', data);
