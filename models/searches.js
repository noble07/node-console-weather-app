const axios = require('axios')

class Searches {
  constructor() {
    //TODO: Read DB if exist
  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
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
      console.log(resp.data)

      return [] // Return places that matched with the parameter

    } catch (error) {
      return [] 
    }
  }
}

module.exports = Searches