//#1
let cell = "|_";
let raw = 0;
let result = cell;
while (raw < 9) {
    console.log(result);
    result += cell;
    raw++;
}

//#2
let whiteCube = "\u2B1C";
let blackCube = "\u2B1B";
let previous = blackCube;
let next;
let chessboard = "";
let chessRaw = "";

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        next = previous == blackCube ? whiteCube : blackCube;
        chessRaw += next;
        previous = next;
    }
    chessboard += `\n` + chessRaw;
    chessRaw = "";
    previous = previous == blackCube ? whiteCube : blackCube;
}
console.log(chessboard);