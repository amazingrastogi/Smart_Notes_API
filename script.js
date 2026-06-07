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
        noteDiv.onclick = () => openEditModal(note);

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
    document.querySelector(".add-btn").style.display = "none";

}

// CLOSE MODAL
function closeModal() {
    document.getElementById("overlay").classList.add("hidden");
    document.querySelector(".add-btn").style.display = "block";
}


function openEditModal(note) {
    openModal();

    document.getElementById("modalTitle").value = note.title;
    document.getElementById("modalContent").innerHTML = note.content;

    window.currentEditId = note.id;
}


// SAVE NOTE
aasync function saveNote() {
    const title = document.getElementById("modalTitle").value;
    const content = document.getElementById("modalContent").innerHTML;

    console.log("Saving:", title, content);

    if (!title || !content) return;

    if (window.currentEditId) {
        // ✅ UPDATE existing note
        await fetch(`${API_URL}/notes/${window.currentEditId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content })
        });

        window.currentEditId = null;
    } else {
        // ✅ CREATE new note
        await fetch(`${API_URL}/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content })
        });
    }

    document.getElementById("modalTitle").value = "";
    document.getElementById("modalContent").innerHTML = "";

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