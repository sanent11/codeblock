const blocks = document.querySelectorAll(".block");
const workspace = document.querySelector(".workspace");

blocks.forEach(block => {
    block.addEventListener("dragstart", (e) => {
        dragged = block.cloneNode(true);
        e.dataTransfer.setData("text/plain", "");
    });
});

workspace.addEventListener("dragover", (e) => {
    e.preventDefault(); 
});

workspace.addEventListener("drop", (e) => {
    e.preventDefault();
    if (dragged) {
        workspace.appendChild(dragged);
        dragged = null;
    }
});