const fs = require('fs');

let games = [];

try {
  const data = fs.readFileSync('./advent-of-codes/day2/input.txt', 'utf8');
  games = data.toString().split('\n');
} catch (err) {
  console.error(err);
}
const trimmedGames = games.map((game) => game.slice(8).split(';'));

function drawPower(draw) {
  const data = draw
    .trim()
    .split(',')
    .map((el) => {
      const piece = el.trim().split(' ');
      const obj = {};
      obj[piece[1]] = Number(piece[0]);
      return obj;
    });

  return data;
}

let sumPower = 0;

for (let i = 0; i < trimmedGames.length; i++) {
  const gameBag = { red: 0, green: 0, blue: 0 };

  trimmedGames[i].forEach((draw) => {
    const drawBag = drawPower(draw);

    drawBag.forEach((el) => {
      for (const [key, value] of Object.entries(el)) {
        if (key === 'red' && value > gameBag[key]) gameBag[key] = value;
        if (key === 'green' && value > gameBag[key]) gameBag[key] = value;
        if (key === 'blue' && value > gameBag[key]) gameBag[key] = value;
      }
    });
  });

  sumPower += gameBag.red * gameBag.blue * gameBag.green;
}

console.log(sumPower);
