const fs = require("fs");
const path = require("path");

try {
    const inputPath = path.join(__dirname, "input.json");
    const outputPath = path.join(__dirname, "output.json");

    console.log("📂 Looking for:", inputPath);

    if (!fs.existsSync(inputPath)) {
        console.error("❌ input.json not found!");
        process.exit(1);
    }

    const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
    console.log("✅ input.json loaded");

    function decodeValue(base, value) {
        return parseInt(value, parseInt(base, 10));
    }

    let output = { testCases: [] };

    input.testCases.forEach((testCase, index) => {
        const { n, k } = testCase.keys;
        let roots = [];

        for (let key in testCase.roots) {
            const base = testCase.roots[key].base;
            const value = testCase.roots[key].value;
            const decoded = decodeValue(base, value);
            console.log(`TestCase ${index + 1}: Decoded key=${key}, base=${base}, value=${value} → ${decoded}`);

            roots.push({ x: parseInt(key, 10), y: decoded });
        }

        output.testCases.push({ keys: { n, k }, roots });
    });

    fs.writeFileSync(outputPath, JSON.stringify(output, null, 4), "utf8");
    console.log("✅ All test cases decoded and saved to:", outputPath);

} catch (err) {
    console.error("❌ Error:", err.message);
}
