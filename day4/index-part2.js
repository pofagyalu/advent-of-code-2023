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
    id: parseInt(id.slice(4)),
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
    copies: 1,
  });
});

function getMatching(playerNum, winnerNum) {
  return playerNum.reduce(
    (acc, n) => (winnerNum.includes(n) ? (acc = acc + 1) : acc),
    0
  );
}

const result = cards.forEach((card, index) => {
  newCopies = getMatching(card.playerNumbers, card.winningNumbers);

  if (newCopies !== 0) {
    for (let i = 1; i <= newCopies; i++) {
      cards[index + i].copies = cards[index].copies + cards[index + i].copies;
    }
  }
});

const totalCards = cards.reduce((acc, card) => acc + card.copies, 0);

console.log(totalCards);
