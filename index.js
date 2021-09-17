const {
  inquiererMenu,
  pause
} = require("./helpers/inquirer")

const main = async() => {
  let opt

  do {
    opt = await inquiererMenu()
    console.log({opt})
    
    if (opt !== 0) await pause()
  } while (opt !== 0);
}

main()