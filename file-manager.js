import { argv } from "node:process";
import { stdin, exit } from "process";
import { homedir } from "node:os";
import url from "url";

import {
  printCurrentWorkingDirectory,
  folderUp,
  changeDirectory,
  listFilesInDirectory,
  readFileAndPrint,
  createEmptyFile
} from "./utils.js";

const fileManager = () => {
  const username = argv[2].split("=")[1];
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const __homepage = url.fileURLToPath(new URL(".", `file://${homedir()}`));
  let currentPath = __homepage;
  console.log(`Welcome to the File Manager ${username}!`);
  printCurrentWorkingDirectory(__homepage);
  console.log("Enter command");
  stdin.on("data", (data) => {
    const command = data.toString().trim().split(" ")[0];
    const param = data.toString().trim().split(" ")[1];
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
      case "cat":
        let pathCat = currentPath;
        if (param) readFileAndPrint(param, pathCat);
        else console.log("Invalid input");
        break;
      case "add":
        let pathAdd = currentPath;
        if (param) createEmptyFile(param, pathAdd);
        else console.log("Invalid input");
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
