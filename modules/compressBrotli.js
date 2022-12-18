import { createBrotliCompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { join, parse } from "path";

import { printCurrentWorkingDirectory, createPath } from "./utils.js";

export const compressBrotli = async (pathToFile, pathToDest, currentPath) => {
  try {
    const FILE = createPath(pathToFile, currentPath);
    const fileName = parse(FILE);
    const archPath = join(
      createPath(pathToDest, currentPath),
      `${fileName.name}${fileName.ext}.br`
    );
    const bzip = createBrotliCompress();
    const rstream = createReadStream(FILE);
    const wstream = createWriteStream(archPath);
    rstream.pipe(bzip).pipe(wstream);
    console.log("Success");
    printCurrentWorkingDirectory(currentPath);
  } catch (error) {
    console.log("Invalid input");
  }
};
