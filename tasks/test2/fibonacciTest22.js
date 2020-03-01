exports.fibonacci = function fib(num) {
    result = num <= 1 ? num : fib(num - 1) + fib(num - 2);
    return result;
}; 
