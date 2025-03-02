import { setLoadTestingConfig, getLoadTestingConfig } from "./configs";

const getConfig = function() {
    document.querySelector("#config #value .input").value = getLoadTestingConfig(document.querySelector("#config #path .input").value)
}

const setConfig = function() {
    const path = document.querySelector("#config #path .input").value;
    const value = document.querySelector("#config #value .input").value;

    const currentValue = getLoadTestingConfig(path);
    if(typeof currentValue == "object")
        return;

    setLoadTestingConfig(path, Object.getPrototypeOf(currentValue).constructor(value));
}

document.querySelector("#config #path .get").addEventListener("click", getConfig);
document.querySelector("#config #value .set").addEventListener("click", setConfig);