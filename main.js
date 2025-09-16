const fs = require("fs");

// Read the decoded JSON file
const data = JSON.parse(fs.readFileSync("output.json", "utf8"));

// Process each test case
data.testCases.forEach((testCase, index) => {
    const n = testCase.keys.n;
    const points = testCase.roots.map(root => [root.x, root.y]);

    console.log(`\n🔧 Test Case ${index + 1}: n = ${n}, Points =`, points);

    if (points.length < 3) {
        console.error("❌ Not enough points to solve for a, b, c");
        return;
    }

    const [p1, p2, p3] = points;

    function equation([x, y]) {
        return [Math.pow(x, n), Math.pow(x, n - 1), 1, y];
    }

    const eq1 = equation(p1);
    const eq2 = equation(p2);
    const eq3 = equation(p3);

    const A = [
        [eq1[0], eq1[1], 1],
        [eq2[0], eq2[1], 1],
        [eq3[0], eq3[1], 1],
    ];
    const B = [eq1[3], eq2[3], eq3[3]];

    function det3(m) {
        return (
            m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
            m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
            m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
        );
    }

    const D = det3(A);
    const Da = det3([
        [B[0], A[0][1], A[0][2]],
        [B[1], A[1][1], A[1][2]],
        [B[2], A[2][1], A[2][2]],
    ]);

    const Db = det3([
        [A[0][0], B[0], A[0][2]],
        [A[1][0], B[1], A[1][2]],
        [A[2][0], B[2], A[2][2]],
    ]);

    const Dc = det3([
        [A[0][0], A[0][1], B[0]],
        [A[1][0], A[1][1], B[1]],
        [A[2][0], A[2][1], B[2]],
    ]);

    const a = Da / D;
    const b = Db / D;
    const c = Dc / D;

    console.log(`✅ Test Case ${index + 1} Final c value: ${c}`);
});

