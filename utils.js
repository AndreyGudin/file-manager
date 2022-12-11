import { platform } from "node:os";
import { join } from "path";
import { readdir } from "node:fs/promises";
import url from "url";

const printCurrentWorkingDirectory = (path) =>console.log(`You are currently in ${path}`);

const folderUp = (dir) => {
  const newPath = url.fileURLToPath(new URL("..", `file://${dir}`));
  printCurrentWorkingDirectory(newPath);
  return newPath;
};

const changeDirectory = (path, currentPath) => {
  const platformOS = platform();
  let isAbsolutePath = false;
  if (platformOS === "win32") {
    isAbsolutePath = path.split(":").length > 1 ? true : false;
  } else {
    isAbsolutePath = path.split("")[0] === "/" ? true : false;
  }
  const pathChanged = join(currentPath, path);
  const newPath = isAbsolutePath
    ? url.fileURLToPath(new URL(".", `file://${path}`))
    : url.fileURLToPath(new URL(".", `file://${pathChanged}`));
  printCurrentWorkingDirectory(newPath);
  return newPath;
};

const listFilesInDirectory = async (path) => {
  try {
    const files = await readdir(path, { withFileTypes: true });
    const result = [];
    let i = 0;
    console.log(`Index Name Type`);
    for (const file of files) {
      let type = file.isFile() ? "file" : "directory";
      result.push({ name: file.name, type });
    }
    console.table(result);
  } catch (error) {
    console.log("FS operation failed");
  }
};

export {printCurrentWorkingDirectory, folderUp, changeDirectory, listFilesInDirectory}
