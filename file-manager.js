import { argv } from "node:process";
import { stdin, exit } from "process";


const fileManager = () =>{
  const username = argv[2].split("=")[1];
  console.log(`Welcome to the File Manager ${username}!`);
  stdin.on("data",(data) => {

    const command = data.toString().trim();

    if (command === "exit") {
      console.log(command);
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      exit();
    }
    
  })
}

fileManager();
