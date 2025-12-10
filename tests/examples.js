var args = process.argv.slice(2);
console.log("Command line arguments:", args);
var n_fibonacci = parseInt(args[0]);
var n_factorial = parseInt(args[1]);
var n_fib_series = parseInt(args[2]);
var word = args[3];
var numberArray = args[4];
var fibonacci = function (n) {
    return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};
var factorial = function (n) {
    return n === 0 ? 1 : n * factorial(n - 1);
};
var fibonacciSequence = function (n) {
    if (n <= 1)
        return 1;
    var start = 0;
    var fibonacci = [];
    var position = start + 1;
    fibonacci.push(start);
    fibonacci.push(start + 1);
    while (start < n) {
        fibonacci.push(fibonacci[position] + fibonacci[position - 1]);
        position++;
        start++;
    }
    return fibonacci[n];
};
function reverseWord(word) {
    var wordReversed = "";
    for (var i = word.length - 1; i >= 0; i--) {
        wordReversed += word[i];
    }
    return [word, wordReversed];
}
function palindromeWord(word) {
    return word.toLowerCase() == reverseWord(word)[1].toLowerCase();
}
var palindromeWordWithWhileAndArrow = function (word) {
    if (word.length <= 1)
        return true;
    var start = 0;
    var end = word.length - 1;
    while (start < end) {
        if (word[start].toLowerCase() !== word[end].toLowerCase())
            return false;
        start++;
        end--;
    }
    return true;
};
function countVowels(word) {
    var vowels = "aeiou";
    var counter = 0;
    for (var _i = 0, word_1 = word; _i < word_1.length; _i++) {
        var char = word_1[_i];
        if (vowels.includes(char.toLowerCase()))
            counter++;
    }
    return counter;
}
var summarize = function (numbers) {
    var sum = 0;
    var numbersArray = numbers.split(" ").map(Number);
    for (var _i = 0, numbersArray_1 = numbersArray; _i < numbersArray_1.length; _i++) {
        var num = numbersArray_1[_i];
        sum += num;
    }
    return sum;
};
console.log(fibonacci(n_fibonacci));
console.log(factorial(n_factorial));
console.log(fibonacciSequence(n_fib_series));
console.log(reverseWord(word));
console.log(palindromeWord(word));
console.log(palindromeWordWithWhileAndArrow(word));
console.log(countVowels(word));
console.log(summarize(numberArray));
