import { join, isAbsolute, parse } from "path";
import { readdir, open, writeFile, rename, copyFile } from "node:fs/promises";
import { constants } from "node:fs";
import url from "url";

const printCurrentWorkingDirectory = (path) =>
  console.log(`You are currently in ${path}`);

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
};

const changeDirectory = (path, currentPath) => {
  const newPath = createPath(path, currentPath);
  printCurrentWorkingDirectory(newPath);
  return newPath;
};

const listFilesInDirectory = async (path) => {
  try {
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
};

const createEmptyFile = async (path, currentPath) => {
  try {
    const newPath = createPath(path, currentPath);
    await writeFile(newPath, "", { flag: "wx" });
    console.log("Success");
  } catch (error) {
    console.log("FS operation failed");
  }
};

const renameFile = async (newName, pathToFile, currentPath) => {
  try {
    const oldPath = parse(createPath(pathToFile, currentPath));
    const newPath = join(oldPath.dir, newName);
    const newNameFile = url.fileURLToPath(new URL("", `file://${newPath}`));
    const oldNameFile = createPath(pathToFile, currentPath);
    await rename(oldNameFile, newNameFile);
    console.log("Success!");
  } catch (error) {
    console.log("FS operation failed");
  }
};

const copyFileTo = async (pathToNewDir, pathToDir, currentPath) => {
  try {
    const oldPath = createPath(pathToDir, currentPath);
    const newPath = createPath(pathToNewDir, currentPath);
    await copyFile(oldPath, newPath, constants.COPYFILE_EXCL);
    console.log("Success!");
  } catch (error) {
    console.log("FS operation failed");
  }
}

export {
  printCurrentWorkingDirectory,
  folderUp,
  changeDirectory,
  listFilesInDirectory,
  readFileAndPrint,
  createEmptyFile,
  renameFile,
  copyFileTo
};
