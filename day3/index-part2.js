const fs = require('fs');

let engine;
let sum = 0;

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

try {
  const data = fs.readFileSync('./day3/input.txt', 'utf8');
  engine = data.toString().split('\n');
} catch (err) {
  console.error(err.message);
}

function getNumbersFromString(engineRowString) {
  const regex = /\d+/g;
  let array;
  let foundNumbers = [];

  while ((array = regex.exec(engineRowString)) !== null) {
    foundNumbers.push([array[0], regex.lastIndex - array[0].toString().length]);
  }

  return foundNumbers;
}

const engineRows = engine.length;
const engineColumns = engine[0].split('').length;

const stars = [];

engine.forEach((el, row) => {
  const numbersFound = getNumbersFromString(el);

  if (numbersFound.length !== 0) {
    numbersFound.forEach((element) => {
      const [partNumber, column] = element;
      const neighbourPositions = getNeighbours([row, column], partNumber);

      neighbourPositions.forEach((el) => {
        const [row, column] = el;

        if (engine[row][column] === '*') {
          const starIndex = stars.findIndex(
            (star) => star.row === row && star.column === column
          );

          if (starIndex === -1) {
            stars.push({ row, column, values: [partNumber] });
          } else {
            stars[starIndex] = {
              ...stars[starIndex],
              values: [...stars[starIndex].values, partNumber],
            };
          }
        }
      });
    });
  }
});

const totalSum = stars.reduce(
  (acc, cur) =>
    cur.values.length === 2
      ? Number(cur.values[0]) * Number(cur.values[1]) + acc
      : acc,
  0
);

console.log(totalSum);
