const fs = require('fs');
let cards = [];
let data;
try {
  data = fs.readFileSync('./day4/input.txt', 'utf8').split('\n');
} catch (err) {
  console.error(err.message);
}

data.forEach((line) => {
  const [id, numbers] = line.split(':');
  const [winningNumbers, playerNumbers] = numbers.split('|');
  cards.push({
    id,
    winningNumbers: winningNumbers
      .trim()
      .split(' ')
      .filter((s) => s)
      .map((el) => parseInt(el)),
    playerNumbers: playerNumbers
      .trim()
      .split(' ')
      .filter((s) => s)
      .map((el) => parseInt(el)),
  });
});

function getMatching(playerNum, winnerNum) {
  return playerNum.reduce(
    (acc, n) => (winnerNum.includes(n) ? (acc === 0 ? 1 : acc * 2) : acc),
    0
  );
}

const result = cards.reduce(
  (acc, card) => acc + getMatching(card.playerNumbers, card.winningNumbers),
  0
);

console.log(result);
