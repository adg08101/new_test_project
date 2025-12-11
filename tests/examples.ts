const args = process.argv.slice(2);
console.log("Command line arguments:", args);

const n_fibonacci = parseInt(args[0]);
const n_factorial = parseInt(args[1]);
const n_fib_series = parseInt(args[2]);
const word = args[3];
const numberArray = args[4];

const fibonacci = (n: number): number => {
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

const factorial = (n: number): number => {
  return n === 0 ? 1 : n * factorial(n - 1);
};

const fibonacciSequence = (n: number): number => {
  if (n <= 1) return 1;

  let start: number = 0;
  let fibonacci: number[] = [];
  let position: number = start + 1;

  fibonacci.push(start);
  fibonacci.push(start + 1);

  while (start < n) {
    fibonacci.push(fibonacci[position] + fibonacci[position - 1]);
    position++;
    start++;
  }

  return fibonacci[n];
};

function reverseWord(word: string): string[] {
  let wordReversed: string = "";

  for (let i = word.length - 1; i >= 0; i--) {
    wordReversed += word[i];
  }

  return [word, wordReversed];
}

function palindromeWord(word: string): boolean {
  return word.toLowerCase() == reverseWord(word)[1].toLowerCase();
}

const palindromeWordWithWhileAndArrow = (word: string): boolean => {
  if (word.length <= 1) return true;

  let start: number = 0;
  let end: number = word.length - 1;

  while (start < end) {
    if (word[start].toLowerCase() !== word[end].toLowerCase()) return false;
    start++;
    end--;
  }

  return true;
};

function countVowels(word: string) {
  const vowels = "aeiou";
  let counter: number = 0;

  for (let char of word) {
    if (vowels.includes(char.toLowerCase())) counter++;
  }

  return counter;
}

const summarize = (numbers: string): number => {
  let sum: number = 0;
  let numbersArray = numbers.split(" ").map(Number);

  for (const num of numbersArray) {
    sum += num;
  }

  return sum;
};

function isPrime(n: number): boolean {
  if (n <= 1 || (n % 2 === 0 && n !== 2)) return false;

  for (let i = 3; i < Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }

  return true;
}

const getPrimesTo = (n: number, pos?: number): number[] => {
  let primes: number[] = [];

  for (let i = 0; i < n || primes.length < pos!; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  return primes;
};

console.log(fibonacci(n_fibonacci));
console.log(factorial(n_factorial));
console.log(fibonacciSequence(n_fib_series));
console.log(reverseWord(word));
console.log(palindromeWord(word));
console.log(palindromeWordWithWhileAndArrow(word));
console.log(countVowels(word));
console.log(summarize(numberArray));
console.log(isPrime(n_factorial));
console.log(getPrimesTo(n_factorial, n_fib_series));
console.log(getPrimesTo(n_factorial, n_fib_series)[Number(n_fib_series) - 1]);
