workspace.addEventListener("input", (e) => {
    const block = e.target.closest(".var-block");
    if (!block) return;

    if (block.dataset.type === "intVar" && e.target.classList.contains("var-name")) {
        const sel = window.getSelection();
        const focusNode = sel.focusNode;
        const focusOffset = sel.focusOffset;

        let text = e.target.innerText.replace(/[^a-zA-Z0-9_]/g,'');

        e.target.innerText = text;

        if (!e.target.firstChild) {
            e.target.appendChild(document.createTextNode(''));
        }
        let offset = Math.min(focusOffset, text.length);

        sel.removeAllRanges();
        const range = document.createRange();
        range.setStart(e.target.firstChild, offset);
        range.collapse(true);
        sel.addRange(range);
    }

    if (block.dataset.type === "assignInt" && e.target.classList.contains("value")) {
        const sel = window.getSelection();
        const focusNode = sel.focusNode;
        const focusOffset = sel.focusOffset;

        let value = e.target.innerText.replace(/[^0-9-]/g, "");
        e.target.innerText = value;

        if (!e.target.firstChild) {
            e.target.appendChild(document.createTextNode(''));
        }
        let offset = Math.min(focusOffset, value.length);

        sel.removeAllRanges();
        const range = document.createRange();
        range.setStart(e.target.firstChild, offset);
        range.collapse(true);
        sel.addRange(range);
    }
});

workspace.addEventListener("keydown", (e) => {
    if (e.target.classList.contains("value") && e.key === "Enter") {
        e.preventDefault();
    }
});