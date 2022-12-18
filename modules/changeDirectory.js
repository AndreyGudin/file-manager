import { printCurrentWorkingDirectory, createPath } from "./utils.js";

export const changeDirectory = (path, currentPath) => {
  const newPath = createPath(path, currentPath);
  printCurrentWorkingDirectory(newPath);
  return newPath;
};