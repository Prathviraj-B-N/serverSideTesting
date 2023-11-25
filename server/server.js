const cors = require("cors");
const express = require("express");
const request = require("supertest");
const logger = require("./logger");

const app = express();
const port = 4002;

app.use(express.json());
app.use(cors());

function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

app.get("/api/", (req, res) => {
  res.json({ txt: "Hello World!" });
});

app.post("/api/calculate", (req, res) => {
  logger.log("info", "Calculator backend hit");
  const str = req.body.str;
  let operatorIndex = -1;
  let result = NaN;

  if (str.includes("+")) {
    operatorIndex = str.indexOf("+");
    let operands = str.split("+").map(parseFloat);
    result = operands.reduce((acc, curr) => acc + curr);
  } else if (str.includes("-")) {
    operatorIndex = str.indexOf("-");
    let operands = str.split("-").map(parseFloat);
    result = operands.reduce((acc, curr) => acc - curr);
  } else if (str.includes("*")) {
    operatorIndex = str.indexOf("*");
    let operands = str.split("*").map(parseFloat);
    result = operands.reduce((acc, curr) => acc * curr);
  } else if (str.includes("/")) {
    operatorIndex = str.indexOf("/");
    let operands = str.split("/").map(parseFloat);
    if (operands[1] !== 0) {
      result = operands.reduce((acc, curr) => acc / curr);
    }
  } else if (str.includes("^")) {
    operatorIndex = str.indexOf("^");
    let base = parseFloat(str.slice(0, operatorIndex));
    let exponent = parseFloat(str.slice(operatorIndex + 1));
    result = Math.pow(base, exponent);
  } else if (str.includes("ln")) {
    operatorIndex = str.indexOf("ln");
    let operand = parseFloat(str.slice(operatorIndex + 2));
    if (operand > 0) {
      result = Math.log(operand);
    }
  } else if (str.includes("!")) {
    operatorIndex = str.indexOf("!");
    let operand = parseFloat(str.slice(0, operatorIndex));
    if (Number.isInteger(operand) && operand >= 0) {
      result = factorial(operand);
    }
  } else if (str.includes("√")) {
    operatorIndex = str.indexOf("√");
    let operand = parseFloat(str.slice(operatorIndex + 1));
    if (operand >= 0) {
      result = Math.sqrt(operand);
    }
  }

  if (operatorIndex === -1) {
    logger.log("warn", "Operator not found");
    res.json({ result: "Operator not found" });
  } else if (isNaN(result)) {
    logger.log("warn", "Invalid expression");
    res.json({ result: "Invalid expression" });
  } else {
    let leftPart = str.slice(0, operatorIndex);
    let rightPart = str.slice(operatorIndex + 1);
    logger.log(
      "info",
      "calculated " +
        leftPart +
        " " +
        str.slice(operatorIndex, operatorIndex + 1) +
        " " +
        rightPart +
        " and result is " +
        result
    );
    res.json({ result: result.toString() });
    // res.send(result.toString());
  }
});

app.listen(port, () => {
  logger.log("info", `Calculator BackEnd listening on port ${port}`);
});
