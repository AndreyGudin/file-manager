import { copyFile } from "node:fs/promises";
import { join, parse } from "path";
import { constants } from "node:fs";

import { printCurrentWorkingDirectory, createPath } from "./utils.js";

export const copyFileTo = async (pathToNewDir, pathToDir, currentPath) => {
  try {
    const fileName = parse(createPath(pathToDir, currentPath));
    const newPath = join(createPath(pathToNewDir, currentPath), fileName.base);
    const oldPath = createPath(pathToDir, currentPath);
    await copyFile(oldPath, newPath, constants.COPYFILE_EXCL);
    console.log("Success!");
    printCurrentWorkingDirectory(currentPath);
  } catch (error) {
    console.log("Invalid input");
  }
};
