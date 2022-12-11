import { argv } from "node:process";
import { stdin, exit } from "process";
import { homedir, platform } from "node:os";
import { join } from "path";
import { readdir } from "node:fs/promises";
import url from "url";

const printCurrentWorkingDirectory = (path) =>
  console.log(`You are currently in ${path}`);

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
  const newPath = isAbsolutePath ? url.fileURLToPath(new URL(".", `file://${path}`)) : url.fileURLToPath(new URL(".", `file://${pathChanged}`));
  printCurrentWorkingDirectory(newPath);
  return newPath;
};

const listFilesInDirectory = async (path) => {
  try {
    const files = await readdir(path,{withFileTypes: true});
    const result = [];
    let i = 0;
    console.log(`Index Name Type`);
    for (const file of files) {
      let type =file.isFile() ? "file" : "directory";
      result.push({name: file.name, type});
    }
    console.table(result);
  } catch (error) {
    console.log("FS operation failed");
  }
}

const fileManager = () => {
  const username = argv[2].split("=")[1];
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const __homepage = url.fileURLToPath(new URL(".", `file://${homedir()}`));
  console.log(`Welcome to the File Manager ${username}!`);
  printCurrentWorkingDirectory(__homepage);
  console.log("Enter command");
  stdin.on("data", (data) => {
    const command = data.toString().trim().split(" ")[0];
    const param = data.toString().trim().split(" ")[1];
    let currentPath = __homepage;
    console.log("Enter command");

    switch (command) {
      case ".exit":
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        exit();
      case "up":
        let path = currentPath;
        currentPath = folderUp(path);
        break;
      case "cd":
        let pathCD = currentPath;
        if (param) currentPath = changeDirectory(param, pathCD);
        else console.log("Invalid input");
        break;
      case "ls":
        listFilesInDirectory(currentPath);
        break;
      default:
        console.log("Invalid input");
        break;
    }

    process.on("SIGINT", () => {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      exit();
    });
  });
};

fileManager();
