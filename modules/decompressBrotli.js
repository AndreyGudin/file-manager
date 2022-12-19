import { createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { join, parse } from "path";

import { printCurrentWorkingDirectory, createPath } from "./utils.js";

export const decompressBrotli = async (pathToFile, pathToDest, currentPath) => {
  try {
    const ARCHIVE = createPath(pathToFile, currentPath);
    const fileName = parse(ARCHIVE);
    const filePath = join(
      createPath(pathToDest, currentPath),
      `${fileName.name}`
    );
    const debzip = createBrotliDecompress();
    const rstream = createReadStream(ARCHIVE);
    const wstream = createWriteStream(filePath);
    rstream.pipe(debzip).pipe(wstream);
    console.log("Success");
    printCurrentWorkingDirectory(currentPath);
  } catch (error) {
    console.log("Invalid input");
  }
};
