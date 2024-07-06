//#1
let width = prompt("Enter the width of the rectangle", 1);
let length = prompt("Enter the length of the rectangle", 1);
let square = width * length;
let perimeter = (width + length) * 2;

if (width <= 0 || length <= 0 || Number.isNaN(square)) {
  console.log("Please enter a positive number!");
} else {
  console.log(`Square of the rectangle is ${square}`);
  console.log(`Perimeter of the rectangle is ${perimeter}`);
  if (width === length) {
    console.log("It's a square!");
  }
}

//#2
let month = prompt("Enter the number of a month");

if (month == 1 || month == 2 || month == 12) {
  console.log("It's Winter!");
} else if (month == 3 || month == 4 || month == 5) {
  console.log("It's Spring!");
} else if (month == 6 || month == 7 || month == 8) {
  console.log("It's Summer!");
} else if (month == 9 || month == 10 || month == 11) {
  console.log("It's Autumn!");
} else {
  console.log("There isn't month with such number");
}

switch (month) {
  case "1":
  case "2":
  case "12":
    console.log("It's Winter!");
    break;
  case "3":
  case "4":
  case "5":
    console.log("It's Spring!");
    break;
  case "6":
  case "7":
  case "8":
    console.log("It's Summer!");
    break;
  case "9":
  case "10":
  case "11":
    console.log("It's Autumn!");
    break;
  default:
    console.log("There isn't month with such number");
}

//#3

let num = prompt("Enter a number");

if (num && !Number.isNaN(+num)) {
  let evenOrOdd = num % 2 == 0 ? "even" : "odd";
  let integerOrFraction = Number.isInteger(+num) ? "integer" : "fractional";
  let positiveOrNegative =
    num == 0
      ? "is neither a positive nor a negative"
      : num > 0
      ? "positive"
      : "negative";

  console.log(
    `${num} is a ${evenOrOdd}, ${integerOrFraction} and ${positiveOrNegative} number`
  );
} else {
  console.log("No number was entered!");
}
