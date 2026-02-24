const workspace = document.querySelector(".workspace");

function createVarBlock(x, y) {
    const block = document.createElement("div");
    block.className = "var-block";
    block.dataset.type = "intVar";

    block.style.left = x + "px";
    block.style.top = y + "px"; 

    block.innerHTML = `
        <span class="label">int</span>
        <input class="var-name" type="text" value="myVar" pattern="[a-zA-Z0-9_]*"></input>
    `;

    return block;
}

function createAssignIntBlock(x, y) {
    const block = document.createElement("div");
    block.className = "var-block";
    block.dataset.type = "assignInt";

    block.style.left = x + "px";
    block.style.top = y + "px";

    block.innerHTML = `
        <select class="var-select">
            <option disabled>Нет переменных</option>
        </select>
        <span>=</span>
        <input class="value" type="number" value="0" step="1"></input>
    `;

    updateAssignSelect(block);

    return block;
}

function updateAssignSelect(block) {
    const intVarNames = Array.from(workspace.querySelectorAll(".var-block[data-type='intVar'] .var-name")).map(v => v.value);
    const select = block.querySelector(".var-select");
    if (!select) return;

    select.innerHTML = "";
    if (intVarNames.length) {
        intVarNames.forEach(name => {
            const opt = document.createElement("option");
            opt.value = name;
            opt.textContent = name;
            select.appendChild(opt);
        });
    } 
    else {
        const opt = document.createElement("option");
        opt.disabled = true;
        opt.textContent = "Нет переменных";
        select.appendChild(opt);
    }
}

function updateAllAssignSelects() {
    const assignBlocks = workspace.querySelectorAll(".var-block[data-type='assignInt']");
    assignBlocks.forEach(block => updateAssignSelect(block));
}