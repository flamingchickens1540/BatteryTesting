{
    // Set the configurations to the load tester
    async function setupConfigs() {
        const mode = getLoadTestingConfig("mode");
        const level = getLoadTestingConfig("high")  ? "HIGH" : "LOW";

        // Set the mode
        const levelPromise = sendSerialMessage(`LEVEL ${level}`);

        // HIGH cannot be set lower than LOW, and LOW can't be set higher HIGH, therefore when to set HIGH to a value lower than the load's LOW, the LOW must be set first.
        const high1Promise = sendSerialMessage(`${mode}:HIGH ${getLoadTestingConfig(`constantModeValues.${mode}.HIGH`)}`);
        const lowPromise = sendSerialMessage(`${mode}:LOW ${getLoadTestingConfig(`constantModeValues.${mode}.LOW`)}`);
        const high2Promise = sendSerialMessage(`${mode}:HIGH ${getLoadTestingConfig(`constantModeValues.${mode}.HIGH`)}`);

        const ldOnPromise = sendSerialMessage(`ldonv ${getLoadTestingConfig("loadTestingSettings.onVoltage")}`);
        const ldOffPromise = sendSerialMessage(`ldoffv ${getLoadTestingConfig("loadTestingSettings.offVoltage")}`);

        const onPromise = sendSerialMessage(`LOAD ON`);

        await levelPromise;
        await high1Promise;
        await lowPromise;
        await high2Promise;
        await ldOnPromise;
        await ldOffPromise;
        await onPromise;
    }

    async function testBattery() {
        document.querySelector("#startTest").disabled = true;
        
        createTest(
            new Date().toUTCString(), 
            Date.now(), 
            (await getNextReading()).voltage
        );

        setupConfigs();

        const timestamps = [];
        while(true) {
            await new Promise(res => setTimeout(res, READING_INTERVAL_MILLIS));

            const readings = await getNextReading();

            if(readings.current <= 0.1) {
                logTest(true);
                return finishBatteryTesting();
            }

            timestamps.push(readings);
        }
    }

    const finishBatteryTesting = function() {
        sendSerialMessage(`LOAD OFF`);
    
        document.querySelector("#startTest").disabled = false;
    }
    
    document.querySelector("#startTest").addEventListener("click", testBattery);
}