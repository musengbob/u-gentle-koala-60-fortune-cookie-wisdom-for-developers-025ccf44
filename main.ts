import * as fs from "node:fs";
import * as path from "node:path";

// Competition rule: the entry is a single line of 1-200 code points.
// Why this line works: it opens like a classic fortune-cookie prediction
// ("You will meet a stranger today") and the twist is the most relatable
// developer experience there is — coming back to your own old code and
// not recognising the person who wrote it.

// Fortune-cookie shape: a prediction in the first clause, the punchline
// in the second. Kept to exactly one line on purpose — the entry IS the line,
// so main.ts writes it verbatim with no added punctuation or newline.

const LINE =
  "You will meet a stranger today: it is you, reading code you wrote six months ago.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR && process.env.MAKEFUN_OUTPUT_DIR.trim() !== ""
    ? process.env.MAKEFUN_OUTPUT_DIR
    : path.join(process.cwd(), "output");

fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, LINE, "utf8");

const readBack = fs.readFileSync(outPath, "utf8");
const codePoints = [...readBack].length;

if (readBack !== LINE) {
  console.error("Validation failed: entry.txt is not byte-identical to the line.");
  process.exit(1);
}
if (codePoints < 1 || codePoints > 200) {
  console.error(`Validation failed: ${codePoints} code points, must be 1-200.`);
  process.exit(1);
}
if (readBack.trim().length === 0) {
  console.error("Validation failed: line is only whitespace.");
  process.exit(1);
}

console.log(`Wrote ${codePoints} code points to ${outPath}:`);
console.log(readBack);
console.log("Validation passed: byte-identical, 1-200 code points, not only whitespace.");
