const findDuplicates = (nums) => {
  //To store the numbers that appeared twice
  let result = [];

  //Itearte each element
  nums.forEach((val, ind, arr) => {
    //Use the value as index
    let temp = Math.abs(arr[ind]) - 1;

    //If the number is already negative
    //That means it has appeared once and this is its second time.
    //So add it in the result
    if (arr[temp] < 0) {
      result.push(temp + 1);
    }

    //Multiply the element at the given index with negative number
    arr[temp] *= -1;
  });

  return result;
};

console.log(findDuplicates([1, 3, 3, 6, 7, 2, 3, 5, 1]));
