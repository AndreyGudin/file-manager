import { rm } from "node:fs/promises";

import { printCurrentWorkingDirectory, createPath } from "./utils.js";

export const deleteFile = async (pathToFile, currentPath) => {
  try {
    const newPath = createPath(pathToFile, currentPath);
    await rm(newPath);
    console.log("Success!");
    printCurrentWorkingDirectory(currentPath);
  } catch (error) {
    console.log("Invalid input");
  }
};
