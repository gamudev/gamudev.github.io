document.addEventListener('DOMContentLoaded', () => {
    let value1 = '';
    let value2 = '';
    let operation = '';
    let resultDisplayed = false;
    const resultado = document.getElementById('resultado');

    // Función para sanitizar y validar entrada
    function sanitizeInput(input) {
        // Solo permitir números y punto decimal
        return input.replace(/[^0-9.]/g, '');
    }

    // Función para validar número
    function isValidNumber(str) {
        // Validar que sea un número válido (puede tener un punto decimal)
        const numRegex = /^-?\d*\.?\d+$/;
        return numRegex.test(str) && !isNaN(parseFloat(str)) && isFinite(parseFloat(str));
    }

    // Función para validar y agregar número
    function addNumber(digit) {
        // Sanitizar el dígito
        digit = sanitizeInput(digit);
        if (!digit) return; // Si después de sanitizar está vacío, salir

        // Validar que sea un solo carácter válido
        if (digit.length !== 1 || (!/[0-9.]/.test(digit))) {
            return;
        }

        if (resultDisplayed) {
            clear();
            resultDisplayed = false;
        }

        // Validar múltiples puntos decimales
        if (digit === '.') {
            if (operation === '') {
                if (value1.includes('.')) return; // Ya tiene punto decimal
                if (value1 === '') value1 = '0'; // Si está vacío, empezar con 0.
            } else {
                if (value2.includes('.')) return; // Ya tiene punto decimal
                if (value2 === '') value2 = '0'; // Si está vacío, empezar con 0.
            }
        }

        // Validar longitud máxima para prevenir overflow
        const maxLength = 15;
        if (operation === '') {
            if (value1.length >= maxLength) return;
            value1 += digit;
            // Validar que el número sigue siendo válido
            if (!isValidNumber(value1)) {
                value1 = value1.slice(0, -1); // Revertir si no es válido
                return;
            }
            resultado.value = value1;
        } else {
            if (value2.length >= maxLength) return;
            value2 += digit;
            // Validar que el número sigue siendo válido
            if (!isValidNumber(value2)) {
                value2 = value2.slice(0, -1); // Revertir si no es válido
                return;
            }
            resultado.value = value2;
        }
    }

    // Event listeners para botones numéricos
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            // Usar textContent en lugar de innerHTML para seguridad
            const digit = button.textContent || button.innerText || '';
            addNumber(digit.trim());
        });
    });

    // Lista de operaciones válidas para validación
    const validOperations = ['+', '-', '*', '/', '^', '=', '%', 'C'];

    // Event listeners para botones de operación
    document.querySelectorAll('.operation').forEach(button => {
        button.addEventListener('click', () => {
            // Usar textContent en lugar de innerHTML para seguridad
            const op = (button.textContent || button.innerText || '').trim();
            
            // Validar que la operación sea válida
            if (!validOperations.includes(op)) {
                console.warn('Operación no válida:', op);
                return;
            }

            if (op === 'C') {
                clear();
            } else if (op === '=') {
                const result = calculate();
                if (result !== null) {
                    resultado.value = result;
                    resultDisplayed = true;
                }
            } else if (op === '%') {
                const result = calculatePercentage();
                if (result !== null) {
                    resultado.value = result;
                    resultDisplayed = true;
                }
            } else {
                // Si ya hay una operación y un segundo valor, calcular primero
                if (operation !== '' && value1 !== '' && value2 !== '') {
                    const result = calculate();
                    if (result !== null) {
                        value1 = result.toString();
                        value2 = '';
                        resultado.value = value1;
                    } else {
                        return; // Si hay error, no cambiar la operación
                    }
                }
                operation = op;
                resultDisplayed = false;
            }
        });
    });

    function calculate() {
        // Validar que tenemos ambos valores y una operación
        if (value1 === '' || value2 === '' || operation === '') {
            showError('Operación incompleta');
            return null;
        }

        const number1 = parseFloat(value1);
        const number2 = parseFloat(value2);

        // Validar que los números son válidos
        if (isNaN(number1) || isNaN(number2)) {
            showError('Número inválido');
            return null;
        }

        let result;
        try {
            switch (operation) {
                case '+':
                    result = number1 + number2;
                    break;
                case '-':
                    result = number1 - number2;
                    break;
                case '*':
                    result = number1 * number2;
                    break;
                case '/':
                    if (number2 === 0) {
                        showError('No se puede dividir por cero');
                        return null;
                    }
                    result = number1 / number2;
                    break;
                case '^':
                    result = Math.pow(number1, number2);
                    break;
                default:
                    showError('Operación no válida');
                    return null;
            }

            // Validar resultado
            if (!isFinite(result)) {
                showError('Resultado demasiado grande');
                return null;
            }

            if (isNaN(result)) {
                showError('Error en el cálculo');
                return null;
            }

            // Formatear resultado (eliminar ceros innecesarios)
            const formattedResult = parseFloat(result.toFixed(10));
            return formattedResult.toString();

        } catch (error) {
            showError('Error en el cálculo');
            return null;
        }
    }

    function calculatePercentage() {
        if (value1 === '') {
            showError('Ingrese un número');
            return null;
        }

        const number1 = parseFloat(value1);
        if (isNaN(number1)) {
            showError('Número inválido');
            return null;
        }

        const result = number1 / 100;
        value1 = result.toString();
        value2 = '';
        operation = '';
        
        const formattedResult = parseFloat(result.toFixed(10));
        return formattedResult.toString();
    }

    function showError(message) {
        // Sanitizar mensaje de error para prevenir XSS
        const sanitizedMessage = String(message).replace(/[<>]/g, '');
        resultado.value = sanitizedMessage;
        setTimeout(() => {
            if (resultado.value === sanitizedMessage) {
                clear();
            }
        }, 2000);
    }

    function clear() {
        value1 = '';
        value2 = '';
        operation = '';
        resultado.value = '';
        resultDisplayed = false;
    }

    // Soporte para teclado
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        
        // Números y punto decimal
        if ((key >= '0' && key <= '9') || key === '.') {
            e.preventDefault();
            addNumber(key);
        }
        // Operaciones
        else if (key === '+' || key === '-' || key === '*' || key === '/') {
            e.preventDefault();
            const opButton = Array.from(document.querySelectorAll('.operation'))
                .find(btn => btn.innerHTML === key);
            if (opButton) opButton.click();
        }
        // Enter o = para calcular
        else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            const eqButton = Array.from(document.querySelectorAll('.operation'))
                .find(btn => btn.innerHTML === '=');
            if (eqButton) eqButton.click();
        }
        // Escape o Delete para limpiar
        else if (key === 'Escape' || key === 'Delete' || key === 'Backspace') {
            e.preventDefault();
            clear();
        }
        // Porcentaje
        else if (key === '%') {
            e.preventDefault();
            const percentButton = Array.from(document.querySelectorAll('.operation'))
                .find(btn => btn.innerHTML === '%');
            if (percentButton) percentButton.click();
        }
    });
});
