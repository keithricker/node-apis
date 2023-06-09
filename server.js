const cors = require('cors')
const bodyParser = require('body-parser');
const express = require('express');
const app = express()
const defaultPort = process.env.PORT || 3000
const protocol = defaultPort === 443 ? 'https' : 'http'
const server = require(protocol).createServer(app)
const serverUrl = require('./utils/serverUrl')

const serverListen = server.listen
server.listen = (port,callback) => {
  const listening = serverListen.call(server, port || defaultPort,callback || function(error) {
    if (error) throw error;
    console.log('App is running on: ' + serverUrl(listening));
  })
  return listening
}

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = { app, server }