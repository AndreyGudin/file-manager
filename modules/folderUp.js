import { dirname } from "path";
import url from "url";

import { printCurrentWorkingDirectory } from "./utils.js";

export const folderUp = (dir) => {
  const newPath = dirname(url.fileURLToPath(new URL("", `file://${dir}`)));
  printCurrentWorkingDirectory(newPath);
  return newPath;
};
