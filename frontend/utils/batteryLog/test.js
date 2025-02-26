{
    let _tests;
    let _loadedTests;

    let _currentTestId;

    function loadTests() {
        _tests = {};
        _loadedTests = {};

        return fetch(`/BatteryTestingAPI/battery/tests/?battery-id=${getBattery().id}`, {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(res => res.tests.forEach(test => _tests[test.startTime] = test));
    }

    function getTests() {
        return Object.values(_tests);
    }

    function selectTest(testId) {
        _currentTestId = testId;
    }

    function loadTest() {
        const testId = _currentTestId;

        if(isTestLoaded())
            return _loadedTests[testId];

        return fetch(`/BatteryTestingAPI/test/?test-id=${testId}`, {method:"GET", mode:"cors", headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(test => {
            _loadedTests[testId] = test;
        });
    }

    function getTest() {
        return _loadedTests[_currentTestId] ?? _tests[_currentTestId];
    }

    function isTestLoaded() {
        return !!_loadedTests[_currentTestId];
    }
}