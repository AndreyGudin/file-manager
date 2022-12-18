import { printCurrentWorkingDirectory } from "./utils.js";
import url from "url";

export const folderUp = (dir) => {
  const newPath = url.fileURLToPath(new URL("..", `file://${dir}`));
  printCurrentWorkingDirectory(newPath);
  return newPath;
};
