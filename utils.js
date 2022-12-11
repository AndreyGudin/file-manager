import { join, isAbsolute } from "path";
import { readdir, open } from "node:fs/promises";
import url from "url";

const printCurrentWorkingDirectory = (path) =>console.log(`You are currently in ${path}`);

const folderUp = (dir) => {
  const newPath = url.fileURLToPath(new URL("..", `file://${dir}`));
  printCurrentWorkingDirectory(newPath);
  return newPath;
};

const createPath = (path, currentPath) => {
  const pathChanged = join(currentPath, path);
  const newPath = isAbsolute(path)
    ? url.fileURLToPath(new URL("", `file://${path}`))
    : url.fileURLToPath(new URL("", `file://${pathChanged}`));
  return newPath;
}

const changeDirectory = (path, currentPath) => {
  const newPath = createPath(path, currentPath);
  printCurrentWorkingDirectory(newPath);
  return newPath;
};

const listFilesInDirectory = async (path) => {
  try {
    console.log("path ", path);
    const files = await readdir(path, { withFileTypes: true });
    const result = [];
    for (const file of files) {
      let type = file.isFile() ? "file" : "directory";
      result.push({ name: file.name, type });
    }
    console.table(result);
  } catch (error) {
    console.log("FS operation failed");
  }
};

const readFileAndPrint = async (path, currentPath) => {
  try {
    const newPath = createPath(path, currentPath);
    const file = await open(newPath);
    let data = "";
    const stream = file.createReadStream();
    stream.on("data", (chunk) => (data += chunk));
    stream.on("end", () => console.log(data));
  } catch (error) {
    console.log("FS operation failed");
  }
}

export {printCurrentWorkingDirectory, folderUp, changeDirectory, listFilesInDirectory, readFileAndPrint}
