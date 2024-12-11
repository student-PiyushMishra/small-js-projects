// Function to add a new note
const addAndRenderNotes = () => {
    const addButton = document.querySelector("nav button.add-note");
    const notesArea = document.querySelector(".notes-section");
    
    addButton.addEventListener("click", function () {
        const note = makingANote();
        notesArea.appendChild(note);
        addNoteCmds(note);
    })
}

// Function to create a new note element
const makingANote = (idd = Date.now(), content = '') => {
    const note = document.createElement("div");
    note.className = "sticky-note";
    note.id = `${idd}`;
    note.innerHTML = `
    <div class="cmds">
        <i class="ri-save-2-fill save"></i>
        <i class="ri-edit-box-line edit"></i>
        <i class="ri-delete-bin-6-line delete"></i>
    </div>
    <div class="note">
        <textarea cols="30" rows="10">${content}</textarea>
    </div>
    `;
    return note;
}

// Function to add functionalities (edit, save, delete) to each note
const addNoteCmds = (note) => {
    note.querySelector(".save").addEventListener("click", function () {
        const noteContent = note.querySelector("textarea").value;
        saveNote(note.id, noteContent); // Save to localStorage
        note.querySelector("textarea").disabled = true;
    });

    note.querySelector(".edit").addEventListener("click", function () {
        const textarea = note.querySelector("textarea");
        textarea.disabled = !textarea.disabled;
    });

    note.querySelector(".delete").addEventListener("click", function () {
        deleteNoteFromLocalStorage(note.id); // Delete from localStorage
        note.remove(); // Remove from the page
    });
}

// Save the note in localStorage
const saveNote = (noteId, noteContent) => {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    const existingNoteIndex = notes.findIndex(note => note.id === noteId);
    
    if (existingNoteIndex > -1) {
        notes[existingNoteIndex].content = noteContent;
    } else {
        notes.push({ id: noteId, content: noteContent });
    }

    localStorage.setItem('notes', JSON.stringify(notes));
};

// Delete a note from localStorage
const deleteNoteFromLocalStorage = (noteId) => {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId); // Remove the note from array
    localStorage.setItem('notes', JSON.stringify(notes)); // Update localStorage
};

// Load notes from localStorage on page refresh
const loadNotesFromStorage = () => {
    const notesArea = document.querySelector(".notes-section");
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    savedNotes.forEach((noteData) => {
        const note = makingANote(noteData.id, noteData.content);
        notesArea.appendChild(note);
        addNoteCmds(note);
    });
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
    addAndRenderNotes();
    loadNotesFromStorage();
});