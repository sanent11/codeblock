const blocks = document.querySelectorAll(".block");
let dragged = null;

blocks.forEach(block => {
    block.addEventListener("dragstart", () => {
        dragged = block;
    });
});

workspace.addEventListener("dragover", (e) => {
    e.preventDefault();
});

workspace.addEventListener("drop", (e) => {
    e.preventDefault();

    const rect = workspace.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const type = dragged?.dataset?.type;

    if (type === "assignInt") {
        const newBlock = createAssignIntBlock(x, y);
        workspace.appendChild(newBlock);
    }
    else if (type === "intVar") {
        const newBlock = createVarBlock(type, x, y);
        workspace.appendChild(newBlock);
    }
});

workspace.addEventListener("mousedown", (e) => {
    const block = e.target.closest(".var-block");
    if (!block) return;

    if (e.target.classList.contains("value")) return;

    let startX = e.clientX;
    let startY = e.clientY;

    let startLeft = parseInt(block.style.left) || 0;
    let startTop = parseInt(block.style.top) || 0;

    function onMouseMove(e) {
        let dx = e.clientX - startX;
        let dy = e.clientY - startY;

        let newX = startLeft + dx;
        let newY = startTop + dy;

        newX = Math.max(0, Math.min(newX, workspace.clientWidth - block.offsetWidth));
        newY = Math.max(0, Math.min(newY, workspace.clientHeight - block.offsetHeight));

        block.style.left = newX + "px";
        block.style.top = newY + "px";
    }

    function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});

const clearButton = document.querySelector(".clear");

clearButton.addEventListener("click", () => {
    const blocks = workspace.querySelectorAll(".var-block");
    blocks.forEach(block => block.remove());
});