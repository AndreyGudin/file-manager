import { readdir } from "node:fs/promises";

import { printCurrentWorkingDirectory } from "./utils.js";

export const listFilesInDirectory = async (path) => {
  try {
    const files = await readdir(path, { withFileTypes: true });
    const result = [];
    for (const file of files) {
      let type = file.isFile() ? "file" : "directory";
      result.push({ name: file.name, type });
    }
    console.table(result);
    printCurrentWorkingDirectory(path);
  } catch (error) {
    console.log("Invalid input");
  }
};
