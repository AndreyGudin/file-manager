import { argv } from "node:process";
import { stdin, exit } from "process";
import { homedir } from "node:os";
import url from "url";

import { printCurrentWorkingDirectory } from "./modules/utils.js";
import { folderUp } from "./modules/folderUp.js";
import { changeDirectory } from "./modules/changeDirectory.js";
import { listFilesInDirectory } from "./modules/listFilesInDirectory.js";
import { readFileAndPrint } from "./modules/readFileAndPrint.js";
import { createEmptyFile } from "./modules/createEmptyFile.js";
import { renameFile } from "./modules/renameFile.js";
import { copyFileTo } from "./modules/copyFileTo.js";
import { moveFile } from "./modules/moveFile.js";
import { deleteFile } from "./modules/deleteFile.js";
import { getOsInfo } from "./modules/getOsInfo.js";
import { calculateHash } from "./modules/calculateHash.js";
import { compressBrotli } from "./modules/compressBrotli.js";
import { decompressBrotli } from "./modules/decompressBrotli.js";

const fileManager = async () => {
  const username = argv[2].split("=")[1];
  const __homepage = url.fileURLToPath(new URL(".", `file://${homedir()}`));
  let currentPath = __homepage;
  console.log(`Welcome to the File Manager ${username}!`);
  console.log(
    "*******************************************************************"
  );
  console.log("\n");
  console.log("Information:");
  console.log("/dir/dir2 or C:\\dir\\dir2 - absolute path");
  console.log("dir/dir2 or dir\\dir2 - relative path");
  console.log(
    "Copy or any operation with destination parameter, use symbol . for current path - Example: cp file.txt ."
  );
  console.log(
    "Чтобы выполнить операцию в текущей папке, используйте знак . : Пример: cp file.txt ."
  );
  console.log("\n");
  console.log(
    "*******************************************************************"
  );
  console.log("\n");
  printCurrentWorkingDirectory(__homepage);
  console.log("Enter command");
  stdin.on("data", async (data) => {
    const command = data.toString().trim().split(" ")[0];
    const param = data.toString().trim().split(" ")[1];
    const param2 = data.toString().trim().split(" ")[2];
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
        if (param) currentPath = await changeDirectory(param, pathCD);
        else console.log("Invalid input");
        break;
      case "ls":
        await listFilesInDirectory(currentPath);
        break;
      case "cat":
        let pathCat = currentPath;
        if (param) await readFileAndPrint(param, pathCat);
        else console.log("Invalid input");
        break;
      case "add":
        let pathAdd = currentPath;
        if (param) await createEmptyFile(param, pathAdd);
        else console.log("Invalid input");
        break;
      case "rn":
        let pathRn = currentPath;
        if (param2) await renameFile(param2, param, pathRn);
        else console.log("Invalid input");
        break;
      case "cp":
        let pathCp = currentPath;
        if (param2) await copyFileTo(param2, param, pathCp);
        else console.log("Invalid input");
        break;
      case "mv":
        let pathMv = currentPath;
        if (param2) await moveFile(param2, param, pathMv);
        else console.log("Invalid input");
        break;
      case "rm":
        let pathRm = currentPath;
        if (param) await deleteFile(param, pathRm);
        else console.log("Invalid input");
        break;
      case "os":
        if (param) getOsInfo(param);
        else console.log("Invalid input");
        break;
      case "hash":
        let pathHash = currentPath;
        if (param) await calculateHash(param, pathHash);
        else console.log("Invalid input");
        break;
      case "compress":
        let pathComp = currentPath;
        if (param2) await compressBrotli(param, param2, pathComp);
        else console.log("Invalid input");
        break;
      case "decompress":
        let pathDeComp = currentPath;
        if (param2) await decompressBrotli(param, param2, pathDeComp);
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
    console.log("Enter command");
  });
};

fileManager();
