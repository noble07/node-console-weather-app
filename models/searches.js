const fs = require('fs')
const axios = require('axios')

class Searches {
  constructor() {
    this.history = []
    this.dbPath = './db/database.json'
    this.readDB()
  }

  get capitalizedHistory() {
    //Capitalizar cada palabra
    return this.history.map(search => {
      let words = search.split(' ')

      words = words.map(word => word[0].toUpperCase() + word.substring(1))

      return words.join(' ')
    })
  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    }
  }

  get paramsOpenWeather() {
    return {
      'appid': process.env.OPENWEATHER_KEY,
      'units': 'metric',
      'lang': 'es'
    }
  }

  async city(place = '') {
    try {
      //Petición HTTP
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox
      })

      const resp = await instance.get()
      return resp.data.features.map(place => ({
        id: place.id,
        name: place.place_name ,
        lng: place.center[0],
        lat: place.center[1]
      }))

    } catch (error) {
      return [] 
    }
  }

  async weatherByPlace(lat, lon) {
    try {
      
      //TODO: Instace de axios.create()
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          ...this.paramsOpenWeather,
          lat,
          lon
        }
      })

      const resp = await instance.get()
      const {weather, main: {temp, temp_min, temp_max}} = resp.data

      return {
        desc: weather[0].description,
        min: temp_min,
        max: temp_max,
        temp
      }

    } catch (err) {
      console.log(err)
    }
  }

  addHistory(place = '') {
    if (this.history.includes(place.toLocaleLowerCase())) return

    this.history = this.history.splice(0, 5)

    this.history.unshift(place.toLocaleLowerCase())

    this.saveDB()
  }

  saveDB() {
    const payload = {
      history: this.history
    }

    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  readDB() {
    if(!fs.existsSync(this.dbPath)) return

    const info = fs.readFileSync(this.dbPath, {encoding: 'utf8'})
    const data = JSON.parse(info)

    this.history = data.history
  }
}

module.exports = Searches