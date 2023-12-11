const fs = require('fs');

let games = [];

try {
  const data = fs.readFileSync('./day2/input.txt', 'utf8');
  games = data.toString().split('\n');
} catch (err) {
  console.error(err);
}
const trimmedGames = games.map((game) => game.slice(8).split(';'));

const bag = { red: 12, green: 13, blue: 14 };

function parseDraw(draw) {
  const data = draw
    .trim()
    .split(',')
    .map((el) => {
      const piece = el.trim().split(' ');
      const obj = {};
      obj[piece[1]] = piece[0];
      return obj;
    });

  const possible = data.every((el) => {
    for (const [key, value] of Object.entries(el)) {
      if (key === 'red' && value > bag[key]) return false;
      if (key === 'green' && value > bag[key]) return false;
      if (key === 'blue' && value > bag[key]) return false;
      return true;
    }
  });

  return possible;
}

let incGameIndex = 0;
for (let i = 0; i < trimmedGames.length; i++) {
  if (trimmedGames[i].every((draw) => parseDraw(draw))) incGameIndex += i + 1;
}

console.log(incGameIndex);
