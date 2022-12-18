import { rm } from "node:fs/promises";

import { printCurrentWorkingDirectory, createPath } from "./utils.js";

export const moveFile = async (pathToNewDir, pathToDir, currentPath) => {
  try {
    await copyFileTo(pathToNewDir, pathToDir, currentPath);
    const oldPath = createPath(pathToDir, currentPath);
    await rm(oldPath);
    console.log("Success!");
    printCurrentWorkingDirectory(currentPath);
  } catch (error) {
    console.log("Invalid input");
  }
};
