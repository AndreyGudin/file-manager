import { open } from "node:fs/promises";

import { printCurrentWorkingDirectory, createPath } from "./utils.js";

export const readFileAndPrint = async (path, currentPath) => {
  try {
    const newPath = createPath(path, currentPath);
    const file = await open(newPath);
    let data = "";
    const stream = file.createReadStream();
    stream.on("data", (chunk) => (data += chunk));
    stream.on("end", () => {
      console.log(data);
      printCurrentWorkingDirectory(currentPath);
    });
  } catch (error) {
    console.log("Invalid input");
  }
};
