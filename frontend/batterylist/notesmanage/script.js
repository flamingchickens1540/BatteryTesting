import { getBattery, selectBattery } from "../../utils/batteryLog/battery.js";
import { removeNote, createNote } from "../../utils/batteryLog/notesManagement.js";
import { getNotes } from "../../utils/batteryLog/notes.js";
import { showNotes } from "../notes.js";

const battery = getBattery();
let noteId;

document.querySelector("title").innerText = battery.name + " Notes Manage"

document.querySelector("#batteryName").innerText = battery.name + " Battery\nNotes Manage";

function copyNotesList() {
    if(document.querySelector("#notesListScreen"))
        document.querySelector("#notesListScreen").remove();

    document.querySelector("#notesContainer").appendChild(opener.document.querySelector("#notesListScreen").cloneNode(true));

    const noteItems = document.querySelectorAll("#notesListScreen div");
    noteItems.forEach(note => note.addEventListener("click", () => {
        noteItems.forEach(node => node.className = "item");
        note.className = "selected item";

        noteId = note.getAttribute("noteTime");
    }));
}

async function deleteNote() {
    await removeNote(noteId);

    delete getNotes()[noteId];

    await showNotes();
    copyNotesList();
}

async function addNote() {
    const time = Date.now();
    const note = document.querySelector("#addNoteText").value;

    if(note == "")
        return;

    await createNote(battery.id, note, time);

    const tempId = getBattery().id;

    selectBattery(battery.id);

    getNotes()[time] = {
        batteryId : battery.id,
        time,
        note
    };

    selectBattery(tempId);

    await showNotes();
    copyNotesList();

    document.querySelector("#addNoteText").value = "";
}

copyNotesList();

document.querySelector("#removeNote").addEventListener("click", deleteNote);

document.querySelector("#addNoteText").addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}, false);

document.querySelector("#addNote").addEventListener("click", addNote);