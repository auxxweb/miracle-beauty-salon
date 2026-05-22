/**
 * Optional helper: validates scripts/service-menu.tsv (local reference only).
 * Live pricing is served from Google Sheets — not bundled in the app.
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tsvPath = join(__dirname, "service-menu.tsv");
const raw = readFileSync(tsvPath, "utf8").trim();
const lines = raw ? raw.split(/\r?\n/) : [];

const items = lines.map((line) => {
  const [serviceName, avgTime, cost, costUnit, category, audience] = line.split("\t");
  return { serviceName, avgTime, cost, costUnit, category, audience };
});

const categories = [...new Set(items.map((i) => i.category))];

console.log("TSV rows:", items.length);
console.log("Categories:", categories.length);
console.log("Copy this data into your Google Sheet Services tab — the website does not bundle preset prices.");
