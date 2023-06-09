const fetch = require('cross-fetch')
async function fetchJson(endpoint) {
  try {
    let fetched = await fetch(endpoint);
    let response = await fetched.json()
    if (typeof response === 'object') {
      response = JSON.stringify(response)
    }
    return response
  } catch(err) {
    return { error: err.message }
  }
}
module.exports = fetchJson