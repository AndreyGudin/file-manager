import { EOL, cpus, homedir, userInfo, arch } from "node:os";

export const getOsInfo = (key) => {
  switch (key) {
    case "--EOL":
      console.log("EOL: ", EOL.split(""));
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
};