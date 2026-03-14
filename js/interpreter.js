var consoleEl = document.querySelector(".console");

function printLine(text, color) {
    if (color === undefined) color = "green";

    var line = document.createElement("div");
    line.textContent = text;
    line.style.color = color;
    consoleEl.appendChild(line);
}

function clearConsole() {
    consoleEl.innerHTML = "";
}

function GetBlocksTopToBottom() {
    var allBlocks = workspace.querySelectorAll(".var-block");
    var result = [];

    for (var i = 0; i < allBlocks.length; i++) {
        result.push(allBlocks[i]);
    }

    for (var i = 0; i < result.length - 1; i++) {
        for (var j = 0; j < result.length - 1 - i; j++) {
            var topA = parseInt(result[j].style.top);
            var topB = parseInt(result[j + 1].style.top);
            if (topA > topB) {
                var temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] = temp;
            }
        }
    }

    return result;
}

function CheckCondition(leftValue, op, rightValue) {
    if (op === "==") return leftValue == rightValue;
    if (op === "!=") return leftValue != rightValue;
    if (op === ">")  return leftValue >  rightValue;
    if (op === "<")  return leftValue <  rightValue;
    if (op === ">=") return leftValue >= rightValue;
    if (op === "<=") return leftValue <= rightValue;
    return false;
}

function RunProgram() {
    clearConsole();

    var variables = {};
    var blocks = GetBlocksTopToBottom();

    for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        var type = block.dataset.type;

        if (type === "intVar") {
            var raw = block.querySelector(".var-name").value;
            var parts = raw.split(",");

            if (parts.length === 0 || raw.trim() === "") {
                printLine("Ошибка: имя переменной пустое", "red");
                return;
            }

            for (var j = 0; j < parts.length; j++) {
                var name = parts[j].trim();
                if (name === "") continue;
                variables[name] = 0;
            }
        }

        else if (type === "assignInt") {
            var name  = block.querySelector(".var-select").value;
            var value = parseInt(block.querySelector(".value").value);

            if (variables[name] === undefined) {
                printLine("Ошибка: переменная «" + name + "» не создана", "red");
                return;
            }

            variables[name] = value;
            printLine(name + " = " + value);
        }

        else if (type === "arith") {
            var resultName = block.querySelector(".arith-result").value;

            if (variables[resultName] === undefined) {
                printLine("Ошибка: переменная «" + resultName + "» не создана", "red");
                return;
            }

            var leftType = block.querySelector(".arith-left-type").value;
            var leftValue;
            var leftLabel;

            if (leftType === "number") {
                leftValue = parseInt(block.querySelector(".arith-left-number").value);
                leftLabel = String(leftValue);
            } else {
                var leftName = block.querySelector(".arith-left-var").value;
                if (variables[leftName] === undefined) {
                    printLine("Ошибка: переменная «" + leftName + "» не создана", "red");
                    return;
                }
                leftValue = variables[leftName];
                leftLabel = leftName;
            }

            var op = block.querySelector(".arith-op").value;

            var rightType = block.querySelector(".arith-right-type").value;
            var rightValue;
            var rightLabel;

            if (rightType === "number") {
                rightValue = parseInt(block.querySelector(".arith-right-number").value);
                rightLabel = String(rightValue);
            } else {
                var rightName = block.querySelector(".arith-right-var").value;
                if (variables[rightName] === undefined) {
                    printLine("Ошибка: переменная «" + rightName + "» не создана", "red");
                    return;
                }
                rightValue = variables[rightName];
                rightLabel = rightName;
            }

            var result;
            if (op === "+") result = leftValue + rightValue;
            if (op === "-") result = leftValue - rightValue;
            if (op === "*") result = leftValue * rightValue;
            if (op === "/") {
                if (rightValue === 0) {
                    printLine("Ошибка: деление на ноль", "red");
                    return;
                }
                result = leftValue / rightValue;
            }

            variables[resultName] = result;
            printLine(resultName + " = " + leftLabel + " " + op + " " + rightLabel + " = " + result);
        }

        else if (type === "condition") {
            var leftName  = block.querySelector(".cond-left").value;
            var op        = block.querySelector(".cond-op").value;
            var rightType = block.querySelector(".cond-right-type").value;
            var action    = block.querySelector(".cond-action").value;
            var target    = block.querySelector(".cond-target").value;

            if (variables[leftName] === undefined) {
                printLine("Ошибка: переменная «" + leftName + "» не создана", "red");
                return;
            }

            var rightValue;
            if (rightType === "number") {
                rightValue = parseInt(block.querySelector(".cond-number").value);
            } else {
                var rightName = block.querySelector(".cond-right-var").value;
                if (variables[rightName] === undefined) {
                    printLine("Ошибка: переменная «" + rightName + "» не создана", "red");
                    return;
                }
                rightValue = variables[rightName];
            }

            var conditionTrue = CheckCondition(variables[leftName], op, rightValue);
            var resultText = conditionTrue ? "истина" : "ложь";
            printLine("если " + leftName + " " + op + " " + rightValue + " → " + resultText);

            if (conditionTrue) {
                if (action === "print") {
                    printLine("  " + target + " = " + variables[target]);
                } else if (action === "assign") {
                    var newValue = parseInt(block.querySelector(".cond-assign-value").value);
                    variables[target] = newValue;
                    printLine("  " + target + " = " + newValue);
                }
            }
        }
    }
}

document.getElementById("btn-run").addEventListener("click", function() {
    RunProgram();
});

document.getElementById("btn-clear").addEventListener("click", function() {
    var allBlocks = workspace.querySelectorAll(".var-block");
    for (var i = 0; i < allBlocks.length; i++) {
        allBlocks[i].remove();
    }
    clearConsole();
});