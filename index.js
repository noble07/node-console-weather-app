const {
  inquiererMenu,
  pause,
  readInput
} = require("./helpers/inquirer");
const Searchs = require("./models/searchs");

const main = async() => {
  const searches = new Searchs()
  let opt

  do {
    opt = await inquiererMenu()
    
    switch (opt) {
      case 1:
        // Show message
        const place = await readInput('Ciudad: ')
        console.log(place)

        // Search places

        // Pick a place

        // Weather

        //Show results
        console.log('\nInformación de la ciudad\n'.green)
        console.log('Ciudad:', )
        console.log('Lat:', )
        console.log('Lng:', )
        console.log('Temperatura:', )
        console.log('Mínima:', )
        console.log('Máxima:', )
        break;
    
      default:
        break;
    }
    
    if (opt !== 0) await pause()
  } while (opt !== 0);
}

main()