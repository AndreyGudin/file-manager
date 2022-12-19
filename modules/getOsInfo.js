import { EOL, cpus, homedir, userInfo, arch } from "node:os";

export const getOsInfo = (key) => {
  switch (key) {
    case "--EOL":
      console.log("EOL: ", EOL.split(""));
      break;
    case "--cpus":
      const cpusArr = cpus();
      const res = cpusArr.map((cpu, i) => {
        return {
          [`CPU ${i + 1}`]: {
            Model: cpu.model,
            "Clock Rate": `${cpu.speed / 1000} GHz`,
          },
        };
      });
      console.log("CPUS: ", res);
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
