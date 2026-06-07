const API_URL = "http://127.0.0.1:8000";

// LOAD NOTES
async function loadNotes() {
    const res = await fetch(`${API_URL}/notes`);
    const notes = await res.json();

    const list = document.getElementById("notesList");
    const emptyState = document.getElementById("emptyState");

    list.innerHTML = "";

    if (notes.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    notes.forEach((note, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "note-wrapper";

        const noteDiv = document.createElement("div");
        noteDiv.className = "note-item";
        noteDiv.innerText = note.title + " - " + note.content;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑️";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = () => deleteNote(note.id);

        wrapper.appendChild(noteDiv);
        wrapper.appendChild(deleteBtn);

        list.appendChild(wrapper);
    });
}

// DELETE NOTE
async function deleteNote(id) {
    // await fetch(`${API_URL}/notes/${id}`, {
    //     method: "DELETE"
    // });

    // loadNotes();
    
    console.log("Deleting:", id);

    fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE"
    }).then(() => loadNotes());


}

// OPEN MODAL
function openModal() {
    document.getElementById("overlay").classList.remove("hidden");
}

// CLOSE MODAL
function closeModal() {
    document.getElementById("overlay").classList.add("hidden");
}

// SAVE NOTE
async function saveNote() {
    const title = document.getElementById("modalTitle").value;
    const content = document.getElementById("modalContent").innerHTML;

    if (!title || !content) return;

    await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content })
    });

    document.getElementById("modalTitle").value = "";
    document.getElementById("modalContent").value = "";
    document.getElementById("modalContent").innerHTML = ""

    closeModal();
    loadNotes();
}

// FORMAT TEXT (basic)
function formatText(type) {
    document.execCommand(type);

    const btnMap = {
        bold: "boldBtn",
        italic: "italicBtn",
        underline: "underlineBtn"
    };

    const btn = document.getElementById(btnMap[type]);
    btn.classList.toggle("active");
}
// INITIAL LOAD
loadNotes();