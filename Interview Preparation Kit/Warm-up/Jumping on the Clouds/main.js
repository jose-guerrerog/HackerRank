"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'jumpingOnClouds' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY c as parameter.
 */
const memoJumps = new Array(105);

function numberJumps(c, n) {
  if (n <= 0) {
    return 0;
  }
  if (c[n] === 1) {
    return Number.POSITIVE_INFINITY;
  }
  if (memoJumps[n]) {
    return memoJumps[n];
  }
  memoJumps[n] = 1 + Math.min(numberJumps(c, n - 1), numberJumps(c, n - 2));
  return memoJumps[n];
}

function jumpingOnClouds(c) {
  // Write your code here
  const n = c.length;
  return numberJumps(c, n - 1);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const c = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((cTemp) => parseInt(cTemp, 10));

  const result = jumpingOnClouds(c);

  ws.write(result + "\n");

  ws.end();
}
