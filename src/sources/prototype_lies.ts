// Helper functions
function isTypeError(err: any): err is TypeError {
    return err.constructor.name === 'TypeError';
}

function failsTypeError({ spawnErr }: { spawnErr: () => void }) {
    try {
        spawnErr();
    } catch (err) {
        return !isTypeError(err);
    }
}

function queryFunctionToStringLie() {
    const scope = window;
    let lied = 0;

    const hasKnownToString = {
        "function Function() { [native code] }": true,
        "function toString() { [native code] }": true,
        "function () { [native code] }": true,
    };

    const nativeProto = Object.getPrototypeOf(Function);
    const apiFunction = scope.Function.toString;

    // Check for known toString representations
    if (!hasKnownToString[scope.Function.prototype.toString.call(apiFunction) as keyof typeof hasKnownToString]) {
        lied++;
    }

    // Try altering prototype.toString to detect inconsistencies
    lied += failsTypeError({
        spawnErr: () => Object.setPrototypeOf(apiFunction, null).toString()
    }) ? 1 : 0;
    Object.setPrototypeOf(apiFunction, nativeProto); // Restore prototype just in case

    // Use TypeError checks
    lied += failsTypeError({
        spawnErr: () => Function.prototype.toString.call(() => {}),
    }) ? 1 : 0;
    
    return lied;
}

// // The main function that can be called externally
// function checkFunctionToStringLie() {
//     const numberOfLies = queryFunctionToStringLie();
//     return numberOfLies;
// }

// Example of usage
// const numberOfLiesDetected = checkFunctionToStringLie();
// console.log(`Number of lies detected for Function.toString: ${numberOfLiesDetected}`);

export default queryFunctionToStringLie;