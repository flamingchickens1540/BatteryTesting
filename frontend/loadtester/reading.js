import { requestSerialMessage } from "./serialPort";

// Cooldown between reads
export const READING_INTERVAL_MILLIS = 10;

// Current promised readings
let nextReading;

/**
 * @returns {Promise<{voltage : number, current : number, time : number}>} the promise for the next readings
 */
export function getNextReading() {
    return nextReading;
}

/**
 * Starts the process for reading values
 */
export async function startReading() {
    const currentReading = document.querySelector("#readings .current");
    const voltageReading = document.querySelector("#readings .voltage");
    const powerReading = document.querySelector("#readings .power");

    while(true) {
        await new Promise(res => setTimeout(res, READING_INTERVAL_MILLIS));

        const readings = await (nextReading = readLatest());

        currentReading.innerText = readings.current;
        voltageReading.innerText = readings.voltage;
        powerReading.innerText = Number(readings.current * readings.voltage).toLocaleString(2);
    }
}

/**
 * get readings from the load tester
 * @returns readings from the load tester
 */
async function readLatest() {
    const currentPromise = requestSerialMessage("measure:current");
    const voltagePromise = requestSerialMessage("measure:voltage");

    const current = Number(await currentPromise);
    const voltage = Number(await voltagePromise);
    const time = Date.now();

    return {
        current,
        voltage,
        time
    };
}