const { app, server } = require('./server')
const fetchJson = require('./utils/fetchJson')

const ADDRESS_ENDPOINT = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=<% address %>&benchmark=2020&format=json`

app.get('/',async (req,res,next) => {
  res.send('Welcome to the geo locator api. Request lattitude and Longitude figures from a physical address string by submitting a GET request to /geoccoding-api with the address as the querystring. i.e.: ?address=[url encoded address in the format of street address, city, state abbreviation, zipcode]')
  // res.sendFile(indexFile)
})

app.get('/geocoding-api', async (req,res) => {

  let defaultAddress = encodeURIComponent('4600 Silver Hill Rd, Washington, DC 20233')

  let address = req.query.address
  if (!address) {
    res.json({})
  }
  let addressEndpoint = ADDRESS_ENDPOINT.replace('<% address %>', address)
  const addressResponse = await fetchJson(addressEndpoint)

  if (typeof addressResponse === 'object' && addressResponse.error) {
    res.json(addressResponse)
    return
  }

  if (typeof addressResponse !== 'string') {
    res.json({})
    return
  }

  const response = JSON.parse(addressResponse)

  if (!response.result) {
    res.json({})
    return
  }

  console.log('he!', response.result)
// Latitude is the Y axis, longitude is the X axis.

  let lat = response.result.addressMatches[0].coordinates.y
  let lon = response.result.addressMatches[0].coordinates.x

  res.set('Access-Control-Allow-Origin', "*")

  /* @todo send correct rest response headers */
  /*
  */
  res.json({lat,lon})
  
})
server.listen()