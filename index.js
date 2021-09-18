require('dotenv').config()

const {
  inquiererMenu,
  pause,
  readInput
} = require("./helpers/inquirer");
const Searches = require("./models/searches");

const main = async() => {
  const searches = new Searches()
  let opt

  do {
    opt = await inquiererMenu()
    
    switch (opt) {
      case 1:
        // Show message
        const place = await readInput('Ciudad: ')

        // Search places
        await searches.city(place)
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