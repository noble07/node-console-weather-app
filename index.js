require('dotenv').config()

const {
  inquiererMenu,
  pause,
  readInput,
  listPlaces
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
        const searchTerm = await readInput('Ciudad: ')

        // Search places
        const places = await searches.city(searchTerm)

        // Pick a place
        const id = await listPlaces(places)
        if (id === 0) continue

        const {name, lat, lng} = places.find(place => place.id === id)
        
        //Guardar en DB
        searches.addHistory(name)

        // Weather
        const {desc, min, max, temp} = await searches.weatherByPlace(lat, lng)

        //Show results
        console.clear()
        console.log('\nInformación de la ciudad\n'.green)
        console.log('Ciudad:', name.green)
        console.log('Lat:', lat)
        console.log('Lng:', lng)
        console.log('Temperatura:', temp)
        console.log('Mínima:', min)
        console.log('Máxima:', max)
        console.log('Como está el clima:', desc.green)
        break

      case 2:
        searches.capitalizedHistory.forEach((name, index) => {
          console.log(`${((index+1)+'.').green} ${name}`)
        })
        break
    
      default:
        break
    }
    
    if (opt !== 0) await pause()
  } while (opt !== 0);
}

main()