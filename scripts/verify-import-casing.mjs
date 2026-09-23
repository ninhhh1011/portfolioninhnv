import fs from "fs";
import path from "path";

const SRC_DIR = "E:/portfolio/src";

function getAllFiles(dir, exts = [".ts", ".tsx", ".js", ".mjs"]) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, exts));
    } else {
      if (exts.includes(path.extname(file))) {
        results.push(filePath);
      }
    }
  }
  return results;
}

const allFiles = getAllFiles(SRC_DIR);
let casingErrors = 0;

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf8");
  const importRegex = /from\s+["'](@\/[^"']+)["']/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    // Resolve @/ to src/
    const relativeToSrc = importPath.replace(/^@\//, "");
    const fullPathWithoutExt = path.join(SRC_DIR, relativeToSrc);

    // Try extensions: .ts, .tsx, /index.ts, /index.tsx
    let exactFound = false;
    let actualDiskName = null;

    for (const ext of ["", ".tsx", ".ts", "/index.tsx", "/index.ts"]) {
      const candidate = fullPathWithoutExt + ext;
      if (fs.existsSync(candidate)) {
        // Now verify case sensitivity of each segment on disk
        const segments = relativeToSrc.split("/").concat(ext ? [path.basename(candidate)] : []);
        // Check actual disk casing
        let currentDir = SRC_DIR;
        let isCorrectCase = true;
        const parts = path.relative(SRC_DIR, candidate).split(path.sep);

        for (const part of parts) {
          const filesInDir = fs.readdirSync(currentDir);
          if (!filesInDir.includes(part)) {
            isCorrectCase = false;
            actualDiskName = filesInDir.find((f) => f.toLowerCase() === part.toLowerCase()) || part;
            break;
          }
          currentDir = path.join(currentDir, part);
        }

        if (isCorrectCase) {
          exactFound = true;
          break;
        } else {
          console.error(`[CASING MISMATCH] in ${file}:`);
          console.error(`  Imported: "${importPath}"`);
          console.error(`  Expected on disk: "${actualDiskName}"`);
          casingErrors++;
          break;
        }
      }
    }

    if (!exactFound && !actualDiskName) {
      console.warn(`[NOT FOUND OR EXTERNAL] in ${file}: "${importPath}"`);
    }
  }
}

console.log(`\nKiểm tra hoàn tất. Tổng số lỗi sai casing: ${casingErrors}`);
