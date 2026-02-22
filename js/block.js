const workspace = document.querySelector(".workspace");

function createVarBlock(x, y) {
    const block = document.createElement("div");
    block.className = "var-block";
    block.dataset.type = "intVar";

    block.style.left = x + "px";
    block.style.top = y + "px"; 

    let valueTemplate = "";

    block.innerHTML = `
        <span class="label">int</span>
        <span class="var-name" contenteditable="true">myVar</span>
        
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
        <span class="value" contenteditable="true">0</span>
    `;

    updateAssignSelect(block);

    return block;
}

function updateAssignSelect(block) {
    const intVarNames = Array.from(workspace.querySelectorAll(".var-block[data-type='intVar'] .var-name")).map(v => v.innerText);
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