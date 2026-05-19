#!/usr/bin/env node
/**
 * calculator.js
 * Node.js CLI calculator supporting basic arithmetic operations:
 * - addition: add, +
 * - subtraction: subtract, sub, -
 * - multiplication: multiply, mul, *, x
 * - division: divide, div, /
 *
 * Usage (CLI):
 *   node src/calculator.js add 2 3   # 5
 *   node src/calculator.js + 2 3     # 5
 *
 * The file also exports the functions add, subtract, multiply, divide for use
 * in other modules.
 */

// Arithmetic functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

// Export functions for programmatic use
module.exports = { add, subtract, multiply, divide };

// CLI entrypoint
if (require.main === module) {
  const [, , opRaw, aRaw, bRaw] = process.argv;

  const usage = `Usage: node src/calculator.js <operation> <a> <b>\n
Supported operations:\n  add (+)\n  subtract (sub, -)\n  multiply (mul, * , x)\n  divide (div, /)\n
Examples:\n  node src/calculator.js add 2 3\n  node src/calculator.js / 9 3`;

  if (!opRaw || !aRaw || !bRaw) {
    console.error(usage);
    process.exit(1);
  }

  const a = Number(aRaw);
  const b = Number(bRaw);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Both operands must be numbers');
    process.exit(1);
  }

  const op = opRaw.toLowerCase();
  let result;
  try {
    if (op === 'add' || op === '+') {
      result = add(a, b);
    } else if (op === 'subtract' || op === 'sub' || op === '-') {
      result = subtract(a, b);
    } else if (op === 'multiply' || op === 'mul' || op === '*' || op === 'x') {
      result = multiply(a, b);
    } else if (op === 'divide' || op === 'div' || op === '/') {
      result = divide(a, b);
    } else {
      console.error('Unsupported operation:', opRaw);
      console.error(usage);
      process.exit(1);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  // Print result
  console.log(result);
}
