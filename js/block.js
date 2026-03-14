const workspace = document.querySelector(".workspace");

function GetAllVarNames() {
    var varBlocks = workspace.querySelectorAll(".var-block[data-type='intVar']");
    var names = [];

    for (var i = 0; i < varBlocks.length; i++) {
        var raw = varBlocks[i].querySelector(".var-name").value;
        var parts = raw.split(",");

        for (var j = 0; j < parts.length; j++) {
            var name = parts[j].trim();
            if (name !== "") {
                names.push(name);
            }
        }
    }

    return names;
}

function FillVarSelect(select) {
    var names = GetAllVarNames();
    select.innerHTML = "";

    if (names.length === 0) {
        select.innerHTML = "<option disabled>Нет переменных</option>";
        return;
    }

    for (var i = 0; i < names.length; i++) {
        var opt = document.createElement("option");
        opt.value = names[i];
        opt.textContent = names[i];
        select.appendChild(opt);
    }
}

function AddDeleteButton(block) {
    var delete_btn = document.createElement("button");
    delete_btn.textContent = "✕";
    delete_btn.style.marginLeft = "6px";
    delete_btn.addEventListener("click", function(e) {
        e.stopPropagation();
        block.remove();
    });
    block.appendChild(delete_btn);
}

function CreateVarBlock(x, y) {
    var block = document.createElement("div");
    block.className = "var-block";
    block.dataset.type = "intVar";
    block.style.left = x + "px";
    block.style.top = y + "px";

    block.innerHTML = `
        <span class="label">int</span>
        <input class="var-name" type="text" value="myVar">
    `;

    AddDeleteButton(block);
    return block;
}

function CreateAssignIntBlock(x, y) {
    var block = document.createElement("div");
    block.className = "var-block";
    block.dataset.type = "assignInt";
    block.style.left = x + "px";
    block.style.top = y + "px";

    block.innerHTML = `
        <select class="var-select"></select>
        <span>=</span>
        <input class="value" type="number" value="0" step="1">
    `;

    FillVarSelect(block.querySelector(".var-select"));

    AddDeleteButton(block);
    return block;
}

function CreateArithBlock(x, y) {
    var block = document.createElement("div");
    block.className = "var-block";
    block.dataset.type = "arith";
    block.style.left = x + "px";
    block.style.top = y + "px";

    block.innerHTML = `
        <select class="arith-result"></select>
        <span>=</span>
        <select class="arith-left-type">
            <option value="number">Число</option>
            <option value="var">Переменная</option>
        </select>
        <input class="arith-left-number" type="number" value="0" style="width:50px">
        <select class="arith-left-var" style="display:none"></select>
        <select class="arith-op">
            <option>+</option>
            <option>-</option>
            <option>*</option>
            <option>/</option>
        </select>
        <select class="arith-right-type">
            <option value="number">Число</option>
            <option value="var">Переменная</option>
        </select>
        <input class="arith-right-number" type="number" value="1" style="width:50px">
        <select class="arith-right-var" style="display:none"></select>
    `;

    FillVarSelect(block.querySelector(".arith-result"));
    FillVarSelect(block.querySelector(".arith-left-var"));
    FillVarSelect(block.querySelector(".arith-right-var"));

    block.querySelector(".arith-left-type").addEventListener("change", function() {
        if (this.value === "var") {
            block.querySelector(".arith-left-number").style.display = "none";
            block.querySelector(".arith-left-var").style.display = "inline";
        } else {
            block.querySelector(".arith-left-number").style.display = "inline";
            block.querySelector(".arith-left-var").style.display = "none";
        }
    });

    block.querySelector(".arith-right-type").addEventListener("change", function() {
        if (this.value === "var") {
            block.querySelector(".arith-right-number").style.display = "none";
            block.querySelector(".arith-right-var").style.display = "inline";
        } else {
            block.querySelector(".arith-right-number").style.display = "inline";
            block.querySelector(".arith-right-var").style.display = "none";
        }
    });

    AddDeleteButton(block);
    return block;
}

function CreateConditionBlock(x, y) {
    var block = document.createElement("div");
    block.className = "var-block";
    block.dataset.type = "condition";
    block.style.left = x + "px";
    block.style.top = y + "px";

    block.innerHTML = `
        <span>если</span>
        <select class="cond-left"></select>
        <select class="cond-op">
            <option value="==">==</option>
            <option value="!=">!=</option>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value=">=">&gt;=</option>
            <option value="<=">&lt;=</option>
        </select>
        <select class="cond-right-type">
            <option value="number">Число</option>
            <option value="var">Переменная</option>
        </select>
        <input class="cond-number" type="number" value="0" style="width:50px">
        <select class="cond-right-var" style="display:none"></select>
        <span>→</span>
        <select class="cond-action">
            <option value="print">Вывести</option>
            <option value="assign">Присвоить</option>
        </select>
        <select class="cond-target"></select>
        <input class="cond-assign-value" type="number" value="0" style="width:50px; display:none">
    `;

    FillVarSelect(block.querySelector(".cond-left"));
    FillVarSelect(block.querySelector(".cond-right-var"));
    FillVarSelect(block.querySelector(".cond-target"));

    block.querySelector(".cond-right-type").addEventListener("change", function() {
        if (this.value === "var") {
            block.querySelector(".cond-number").style.display = "none";
            block.querySelector(".cond-right-var").style.display = "inline";
        } else {
            block.querySelector(".cond-number").style.display = "inline";
            block.querySelector(".cond-right-var").style.display = "none";
        }
    });

    block.querySelector(".cond-action").addEventListener("change", function() {
        if (this.value === "assign") {
            block.querySelector(".cond-assign-value").style.display = "inline";
        } else {
            block.querySelector(".cond-assign-value").style.display = "none";
        }
    });

    AddDeleteButton(block);
    return block;
}