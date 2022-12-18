import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";

import { printCurrentWorkingDirectory, createPath } from "./utils.js";

export const calculateHash = async (pathToFile, currentPath) => {
  const FILE = createPath(pathToFile, currentPath);
  const stream = createReadStream(FILE);
  const hash = createHash("sha256");
  stream.on("readable", () => {
    const data = stream.read();
    if (data) hash.update(data);
    else {
      console.log(`${hash.digest("hex")}`);
      printCurrentWorkingDirectory(currentPath);
    }
  });
};