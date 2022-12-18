import { join, isAbsolute } from "path";

import url from "url";

const printCurrentWorkingDirectory = (path) =>
  console.log(`You are currently in ${path}`);

const createPath = (path, currentPath) => {
  const pathChanged = join(currentPath, path);
  const newPath = isAbsolute(path)
    ? url.fileURLToPath(new URL("", `file://${path}`))
    : url.fileURLToPath(new URL("", `file://${pathChanged}`));
  return newPath;
};

export { printCurrentWorkingDirectory, createPath };
