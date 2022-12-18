import { rename } from "node:fs/promises";
import { join, parse } from "path";
import url from "url";

import { printCurrentWorkingDirectory, createPath } from "./utils.js";

export const renameFile = async (newName, pathToFile, currentPath) => {
  try {
    const oldPath = parse(createPath(pathToFile, currentPath));
    const newPath = join(oldPath.dir, newName);
    const newNameFile = url.fileURLToPath(new URL("", `file://${newPath}`));
    const oldNameFile = createPath(pathToFile, currentPath);
    await rename(oldNameFile, newNameFile);
    console.log("Success!");
    printCurrentWorkingDirectory(currentPath);
  } catch (error) {
    console.log("Invalid input");
  }
};
