import { access, constants } from 'node:fs/promises';

import { printCurrentWorkingDirectory, createPath } from "./utils.js";

export const changeDirectory = async (path, currentPath) => {
  try {
    const newPath = createPath(path, currentPath);
    await access(newPath, constants.F_OK);
    printCurrentWorkingDirectory(newPath);
    return newPath;
  } catch (error) {
    console.log("Invalid input");
    printCurrentWorkingDirectory(currentPath);
    return currentPath;
  }  
  
};