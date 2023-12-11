const fs = require('fs');
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function lineSum(line) {
  let lineDigits = [];
  for (const char of line) {
    if (numbers.includes(char)) lineDigits.push(char);
  }

  return lineDigits[0] + lineDigits[lineDigits.length - 1];
}

let lines = [];
let totalSum = 0;
try {
  const data = fs.readFileSync('./advent-of-codes/day1/input.txt', 'utf8');
  lines = data.toString().split('\n');
} catch (err) {
  console.error(err);
}
totalSum = lines.reduce((acc, curr) => acc + Number(lineSum(curr)), 0);

console.log(totalSum);
