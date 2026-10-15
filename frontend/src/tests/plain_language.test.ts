import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

// Banned technical vocabulary in default UI copy per roadmap.md
const BANNED_TERMS = [
  /\bllm\b/i,
  /\brag\b/i,
  /\btoken\b/i,
  /\btokens\b/i,
  /\bqueue\b/i,
  /\bworker\b/i,
  /\bworkers\b/i,
  /\borchestration\b/i,
  /\bstack trace\b/i,
  /\bstatus code\b/i,
];

function getFilesRecursively(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== "tests" && file !== "node_modules" && file !== "dist") {
        getFilesRecursively(fullPath, fileList);
      }
    } else if (
      (file.endsWith(".tsx") || file.endsWith(".ts")) &&
      !file.includes(".test.") &&
      !file.includes("setup.ts") &&
      !file.includes("technical_details.tsx") &&
      !file.includes("mockClient.ts") // mockClient contains internal simulation logic
    ) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

describe("Plain Language UI Copy Quality Gate", () => {
  const srcDir = path.resolve(import.meta.dirname, "../");
  const filesToCheck = getFilesRecursively(srcDir);

  it("should not contain banned engineering jargon in default UI components", () => {
    const violations: { file: string; line: number; term: string; context: string }[] = [];

    for (const filePath of filesToCheck) {
      const content = fs.readFileSync(filePath, "utf-8");
      const lines = content.split("\n");

      lines.forEach((line: string, index: number) => {
        // Skip technical comments, imports, types, and internal technicalDetails props
        if (
          line.trim().startsWith("//") ||
          line.trim().startsWith("/*") ||
          line.trim().startsWith("*") ||
          line.includes("import ") ||
          line.includes("internalRole") ||
          line.includes("technicalDetails") ||
          line.includes("technicalMetadata")
        ) {
          return;
        }

        for (const regex of BANNED_TERMS) {
          if (regex.test(line)) {
            violations.push({
              file: path.relative(srcDir, filePath),
              line: index + 1,
              term: regex.toString(),
              context: line.trim(),
            });
          }
        }
      });
    }

    if (violations.length > 0) {
      const message = violations
        .map((v) => `[${v.file}:${v.line}] Term ${v.term} found in: "${v.context}"`)
        .join("\n");
      expect.fail(
        `Found banned engineering jargon in default UI files:\n${message}\nUse the plain-language glossary from docs/roadmap.md instead.`
      );
    }

    expect(violations.length).toBe(0);
  });
});
