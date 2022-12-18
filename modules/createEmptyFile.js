import { writeFile } from "node:fs/promises";

import { printCurrentWorkingDirectory, createPath } from "./utils.js";

export const createEmptyFile = async (path, currentPath) => {
  try {
    const newPath = createPath(path, currentPath);
    await writeFile(newPath, "", { flag: "wx" });
    console.log("Success");
    printCurrentWorkingDirectory(currentPath);
  } catch (error) {
    console.log("Invalid input");
  }
};
