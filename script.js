document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".button button");

    let input = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.dataset.value;

            if (value === "=") {
                try {
                    input = evaluateLogic(input); // Evaluasi logika
                    display.value = input;
                } catch (error) {
                    display.value = "Error";
                }
            } else if (value === "C") {
                input = "";
                display.value = "";
            } else if (value === "del") {
                input = input.slice(0, -1);
                display.value = input;
            } else {
                input += value;
                display.value = input;
            }
        });
    });

    // Fungsi untuk evaluasi ekspresi logika
    function evaluateLogic(expression) {
        // Konversi ekspresi ke JavaScript logika
        expression = expression
            .replace(/v/g, "||") // OR
            .replace(/\^/g, "&&") // AND
            .replace(/~/g, "!") // NOT
            .replace(/→/g, "<=") // Implikasi
            .replace(/↔/g, "===")// Ekuivalensi
            .replace(/⊕/g, "!=")//Eksklusif OR
            .replace(/~/g, "!");//NOT

        // Evaluasi ekspresi
        return eval(convertToBoolean(expression)) ? "1" : "0";
    }

    // Fungsi untuk mengganti "0" dan "1" ke boolean
    function convertToBoolean(expression) {
        return expression
            .replace(/0/g, "false")
            .replace(/1/g, "true");
    }
});