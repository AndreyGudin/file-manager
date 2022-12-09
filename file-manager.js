import { argv } from "node:process";
import { stdin, exit } from "process";
import { homedir } from "node:os";
import url from "url";

const printCurrentWorkingDirectory = (path) => console.log(`You are currently in ${path}`);

const fileManager = () =>{
  const username = argv[2].split("=")[1];
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const __homepage = url.fileURLToPath(new URL(".", `file://${homedir()}`));
  console.log(`Welcome to the File Manager ${username}!`);
  printCurrentWorkingDirectory(__homepage);
  stdin.on("data",(data) => {
   
    
    const command = data.toString().trim();
    console.log("Enter command");


    if (command === ".exit") {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      exit();
    }
    process.on("SIGINT", () =>{
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    })


    
  })
}

fileManager();
