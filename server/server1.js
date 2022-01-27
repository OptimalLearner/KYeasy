const http = require('http');
const express = require('express');
const appMain = express()
const app1 = require('./bot/index');
const app2 = require('./src/app')

appMain.use(express());
appMain.use(express({ limit: '50mb' }));
appMain.use(express.urlencoded({ limit: '50mb' }));


//const PORT=process.env.PORT || 5000;

appMain.use('/', app1.webApp)
appMain.use('/', app2.app)
const PORT = 3000
const server = http.createServer(appMain);
let io = require('socket.io')(server);
// server.listen(PORT);

module.exports = { appMain }