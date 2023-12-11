const fs = require('fs');

function getNeighbours(positionArray, stringFormatNumber) {
  const [row, column] = positionArray;
  const digits = stringFormatNumber.length;

  const neighbours = [
    [row, column - 1],
    [row, column + digits],
  ];
  for (let i = -1; i <= digits; i++) {
    neighbours.push([row - 1, column + i]);
    neighbours.push([row + 1, column + i]);
  }

  return neighbours.filter((neighbour) => {
    const [row, col] = neighbour;
    if (row < 0 || row >= engineRows || col < 0 || col >= engineColumns) {
      return false;
    } else {
      return true;
    }
  });
}

const symbols = ['*', '+', '-', '=', '%', '/', '@', '$', '&', '#'];
let engine;
let sum = 0;

try {
  const data = fs.readFileSync('./day3/input.txt', 'utf8');
  engine = data.toString().split('\n');
} catch (err) {
  console.error(err.message);
}

function getNumbersFromString(engineRow) {
  const regex = /\d+/g;
  let array;
  let foundNumbers = [];

  while ((array = regex.exec(engineRow)) !== null) {
    foundNumbers.push([array[0], regex.lastIndex - array[0].toString().length]);
  }

  return foundNumbers;
}

const engineRows = engine.length;
const engineColumns = engine[0].split('').length;

engine.forEach((el, row) => {
  const numbersFound = getNumbersFromString(el);
  if (numbersFound.length !== 0) {
    numbersFound.forEach((element) => {
      const [partNumber, column] = element;
      const neighbourPositions = getNeighbours([row, column], partNumber);

      const symbolAdjacent = neighbourPositions.some((el) => {
        const [row, column] = el;
        if (symbols.includes(engine[row][column])) {
          return true;
        } else {
          return false;
        }
      });

      if (symbolAdjacent) sum += Number(partNumber);
    });
  }
});

console.log(sum);
