const inputExample = "(8+1+123)*2"

// Find the next string that needs to be evaluated
const findCalcArray = function(input) {
  const results = {
    calcArray: [],
    inputArray: null
  }
  // Splits the string into numbers and symbols (spaces should've been removed beforehand)
  results.inputArray = input.split(/([\D+])/).filter(Boolean);
  // Delete the brakets if they're no longer needed
  openBraketIndex = results.inputArray.indexOf("(")
  closeBraketIndex = results.inputArray.indexOf(")")
  if (openBraketIndex !== -1 && closeBraketIndex !== -1 && openBraketIndex + 2 === closeBraketIndex) {
    results.inputArray.splice(openBraketIndex,1);
    results.inputArray.splice(closeBraketIndex - 1,1);
  }
  // Check for brakets
  let insideBrakets = false;
  results.inputArray.forEach(function(item, index) {
    if (insideBrakets === false) {
      if (item === "(" && results.calcArray.length === 0) {
        insideBrakets = true;
      }
    } else {
      if (item === ")") {
        insideBrakets = false;
      } else if (results.calcArray.length < 3) {
        results.calcArray.push(item);
      }
    }
  })
  // Check for multiplication and division
  if (results.calcArray.length === 0) {
    results.inputArray.forEach(function(item, index) {
      if (item === "*" || item === "/" && results.calcArray.length === 0) {
        results.calcArray.push(results.inputArray[index-1])
        results.calcArray.push(results.inputArray[index])
        results.calcArray.push(results.inputArray[index+1])
      }
    })
  }
  // Make the first calculation the calcString if there are not brakets, multiplication of division
  if (results.calcArray.length === 0) {
    results.calcArray.push(results.inputArray[0])
    results.calcArray.push(results.inputArray[1])
    results.calcArray.push(results.inputArray[2])
  }
  return results;
}

// Evaluates a simple 3 character string
const calculateCalcArray = function(calcArray) {
  let total = 0;
  if (calcArray[1] === "+") {
    total = Number(calcArray[0]) + Number(calcArray[2]);
  } else if (calcArray[1] === "-") {
    total = Number(calcArray[0]) - Number(calcArray[2]);
  } else if (calcArray[1] === "*") {
    total = Number(calcArray[0]) * Number(calcArray[2]);
  } else if (calcArray[1] === "/") {
    total = Number(calcArray[0]) / Number(calcArray[2]);
  } else {
    console.log("Invalid character present");
  }
  return String(total);
}

const calculate = function(input, index=0){
  input = input.replace(/ /g,"");
  if (Number.isNaN(Number(input)) === false || index > 5) {
    return Number(input);
  };
  calcObject = findCalcArray(input);
  calcArray = calcObject.calcArray
  calcString = String(calcArray).replace(/,/g,"");
  stringTotal = calculateCalcArray(calcArray);
  // Delete the brakets if they're no longer needed
  if (openBraketIndex !== -1 && closeBraketIndex !== -1 && openBraketIndex + 2 === closeBraketIndex) {
    input = input.replace("(","");
    input = input.replace(")","");
  }
  index++;
  return calculate(input.replace(calcString,stringTotal), index);
}
