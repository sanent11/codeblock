var blocks = document.querySelectorAll(".block");
var dragged = null;

for (var i = 0; i < blocks.length; i++) {
    blocks[i].addEventListener("dragstart", function() {
        dragged = this;
    });
}

workspace.addEventListener("dragover", function(e) {
    e.preventDefault();
});

workspace.addEventListener("drop", function(e) {
    var rect = workspace.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    var type = dragged.dataset.type;
    var newBlock = null;

    if (type === "intVar") {
        newBlock = CreateVarBlock(x, y);
    } else if (type === "assignInt") {
        newBlock = CreateAssignIntBlock(x, y);
    } else if (type === "arifmetic") {
        newBlock = CreateArithBlock(x, y);
    } else if (type === "condition") {
        newBlock = CreateConditionBlock(x, y);
    }

    if (newBlock !== null) {
        workspace.appendChild(newBlock);
    }
});

workspace.addEventListener("mousedown", function(e) {
    var block = e.target.closest(".var-block");
    if (block === null) return;

    var startX = e.clientX;
    var startY = e.clientY;
    var startLeft = parseInt(block.style.left);
    var startTop  = parseInt(block.style.top);

    function onMouseMove(e) {
        var dx = e.clientX - startX;
        var dy = e.clientY - startY;

        var newX = startLeft + dx;
        var newY = startTop  + dy;

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX > workspace.clientWidth  - block.offsetWidth)  newX = workspace.clientWidth  - block.offsetWidth;
        if (newY > workspace.clientHeight - block.offsetHeight) newY = workspace.clientHeight - block.offsetHeight;

        block.style.left = newX + "px";
        block.style.top  = newY + "px";
    }

    function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});

var clearButton = document.querySelector(".clear");

clearButton.addEventListener("click", function() {
    var allBlocks = workspace.querySelectorAll(".var-block");
    for (var i = 0; i < allBlocks.length; i++) {
        allBlocks[i].remove();
    }
});