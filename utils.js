import { join, isAbsolute, parse } from "path";
import {
  readdir,
  open,
  writeFile,
  rename,
  copyFile,
  rm,
} from "node:fs/promises";
import { EOL, cpus, homedir, userInfo, arch  } from "node:os";
import { constants, createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { createHash } from "node:crypto";
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
    console.log(error);
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
    const fileName = parse(createPath(pathToDir, currentPath));
    const newPath = join(createPath(pathToNewDir, currentPath),fileName.base);
    const oldPath = createPath(pathToDir, currentPath);
    await copyFile(oldPath, newPath, constants.COPYFILE_EXCL);
    console.log("Success!");
  } catch (error) {
    console.log("FS operation failed");
  }
};

const moveFile = async (pathToNewDir, pathToDir, currentPath) => {
  try {
    await copyFileTo(pathToNewDir, pathToDir, currentPath);
    const oldPath = createPath(pathToDir, currentPath);
    await rm(oldPath);
    console.log("Success!");
  } catch (error) {
    console.log("FS operation failed");
  }
};

const deleteFile = async (pathToFile, currentPath) => {
  try {
    const newPath = createPath(pathToFile, currentPath);
    await rm(newPath);
    console.log("Success!");
  } catch (error) {
    console.log("FS operation failed");
  }
};

const getOsInfo = (key) => {
  switch (key) {
    case "--EOL":
      console.log("EOL: ",EOL.split(""));
      break;
    case "--cpus":
      console.log("CPUS: ", cpus());
      break;
    case "--homedir":
      console.log("Home directory: ", homedir());
      break;
    case "--username":
      console.log("Username: ", userInfo().username);
      break;
    case "--architecture":
      console.log("Architecture: ", arch());
      break;
    default:
      console.log("Invalid input");
      break;
  }
}

const calculateHash = async (pathToFile, currentPath) => {
  const FILE = createPath(pathToFile, currentPath);
  const stream = createReadStream(FILE);
  const hash = createHash("sha256");
  stream.on("readable", () => {
    const data = stream.read();
    if (data) hash.update(data);
    else {
      console.log(`${hash.digest("hex")}`);
    }
  });
};

const compressBrotli = async (pathToFile, pathToDest,currentPath) => {
  try {
    const FILE = createPath(pathToFile, currentPath);
    const fileName = parse(FILE);
    const archPath = join(createPath(pathToDest, currentPath),`${fileName.name}${fileName.ext}.br`);
    const bzip = createBrotliCompress();
    const rstream = createReadStream(FILE);
    const wstream = createWriteStream(archPath);
    rstream.pipe(bzip).pipe(wstream);
    console.log("Success");
  } catch (error) {
    console.log("FS operation failed");
  }

};

const decompressBrotli = async (pathToFile, pathToDest,currentPath) => {
  try {
    const ARCHIVE = createPath(pathToFile, currentPath);
    const fileName = parse(ARCHIVE);
    const filePath = join(createPath(pathToDest, currentPath),`${fileName.name}`);
    const debzip = createBrotliDecompress();
    const rstream = createReadStream(ARCHIVE);
    const wstream = createWriteStream(filePath);
    rstream.pipe(debzip).pipe(wstream);
    console.log("Success");
  } catch (error) {
    console.log("FS operation failed");
  }
  
};

export {
  printCurrentWorkingDirectory,
  folderUp,
  changeDirectory,
  listFilesInDirectory,
  readFileAndPrint,
  createEmptyFile,
  renameFile,
  copyFileTo,
  moveFile,
  deleteFile,
  getOsInfo,
  calculateHash,
  compressBrotli,
  decompressBrotli
};
