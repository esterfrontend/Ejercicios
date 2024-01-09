const factorial = (number) => {
    if (number === 0 || number === 1) {
      return 1;
    } else {
        let result = 1
        for (let i = 2; i <= number; i++) {
            result *= i;
        }
        return result
    }
}

module.exports = factorial