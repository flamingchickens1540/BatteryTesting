import { getBattery, selectBattery } from "../utils/batteryLog/battery.js";
import { getNotes } from "../utils/batteryLog/notes.js";
import { showNotes } from "./notes.js";

window.selectBattery = selectBattery;
window.getBattery = getBattery;
window.getNotes = getNotes;
window.showNotes = showNotes;