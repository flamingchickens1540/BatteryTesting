// Cooldown between reads
const READING_INTERVAL_MILLIS = 10;

{
    // Current promised readings
    let nextReading;

    /**
     * @returns {Promise<{voltage : number, current : number, time : number}>} the promise for the next readings
     */
    function getNextReading() {
        return nextReading;
    }

    /**
     * Starts the process for reading values
     */
    var startReading = async function() {
        const currentReading = document.querySelector("#currentReading");
        const voltageReading = document.querySelector("#voltageReading");
        const powerReading = document.querySelector("#powerReading");

        while(true) {
            await new Promise(res => setTimeout(res, READING_INTERVAL_MILLIS));

            const readings = await (nextReading = readLatest());

            currentReading.innerText = readings.current;
            voltageReading.innerText = readings.voltage;
            powerReading.innerText = readings.current * readings.voltage;
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

        const readings = {
            current,
            voltage,
            time
        };

        return readings;
    }
}