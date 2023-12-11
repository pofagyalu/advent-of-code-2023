const fs = require('fs');

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const words = [
  { name: 'one', digit: '1', length: 3 },
  { name: 'two', digit: '2', length: 3 },
  { name: 'three', digit: '3', length: 5 },
  { name: 'four', digit: '4', length: 4 },
  { name: 'five', digit: '5', length: 4 },
  { name: 'six', digit: '6', length: 3 },
  { name: 'seven', digit: '7', length: 5 },
  { name: 'eight', digit: '8', length: 5 },
  { name: 'nine', digit: '9', length: 4 },
];

function lineSum(line) {
  let lineDigits = [];
  let i = 0;
  let sliceSize = 3;

  while (i < line.length) {
    if (numbers.includes(line.at(i))) {
      lineDigits.push(line.at(i));
    }

    if (['o', 't', 'f', 's', 'e', 'n'].includes(line.at(i))) {
      if (line.at(i) === 't' && line.at(i + 1) === 'h') sliceSize = 5;
      if (line.at(i) === 'f') sliceSize = 4;
      if (line.at(i) === 's' && line.at(i + 1) === 'e') sliceSize = 5;
      if (line.at(i) === 'e') sliceSize = 5;
      if (line.at(i) === 'n') sliceSize = 4;

      const partialLine = line.slice(i, i + sliceSize);

      for (let i = 0; i < 9; i++) {
        if (partialLine.includes(words[i].name)) {
          lineDigits.push(words[i].digit);
        }
      }
    }

    i++;
  }

  return Number(`${lineDigits.at(0)}${lineDigits.at(-1)}`);
}

let lines = [];
let totalSum = 0;

try {
  const data = fs.readFileSync('./advent-of-codes/day1/input.txt', 'utf8');
  lines = data.toString().split('\n');
} catch (err) {
  console.error(err);
}

for (let i = 0; i < lines.length; i++) {
  console.log(i + 1, ' sor-->', lineSum(lines.at(i)));
  totalSum += lineSum(lines.at(i));
}

console.log('Total sum-->', totalSum);
