document.addEventListener('DOMContentLoaded', () => {
    let value1 = '';
    let value2 = '';
    let operation = '';
    let resultDisplayed = false;

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            if (resultDisplayed) {
                clear();
                resultDisplayed = false;
            }
            if (operation === '') {
                value1 += button.innerHTML;
                document.getElementById('resultado').value = value1;
            } else {
                value2 += button.innerHTML;
                document.getElementById('resultado').value = value2;
            }
        });
    });

    document.querySelectorAll('.operation').forEach(button => {
        button.addEventListener('click', () => {
            if (button.innerHTML === 'C') {
                clear();
            } else if (button.innerHTML === '=') {
                document.getElementById('resultado').value = calculate();
                resultDisplayed = true;
            } else if (button.innerHTML === '%') {
                document.getElementById('resultado').value = calculatePercentage();
                resultDisplayed = true;
            } else {
                operation = button.innerHTML;
            }
        });
    });

    function calculate() {
        let number1 = parseFloat(value1);
        let number2 = parseFloat(value2);
        switch (operation) {
            case '+': return (number1 + number2).toFixed(2);
            case '-': return (number1 - number2).toFixed(2);
            case '*': return (number1 * number2).toFixed(2);
            case '/': return (number1 / number2).toFixed(2);
            case '^': return Math.pow(number1, number2).toFixed(2);
        }
        return '';
    }

    function calculatePercentage() {
        let number1 = parseFloat(value1);
        return (number1 / 100).toFixed(2);
    }

    function clear() {
        value1 = '';
        value2 = '';
        operation = '';
        document.getElementById('resultado').value = '';
    }
});
