const http = require('http');
const express = require('express');
let stream = require('./server/src/ws/stream');
const app = express()
const app1 = require('./server/server1');
const app2 = require('./server/server')

app.use(express());
app.use(express({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// app.use(session({
// 	secret: 'ssshhhhh',
// 	resave: false,
// 	saveUninitialized: true,
// }));

//const PORT=process.env.PORT || 5000;

app.use('/', app1.appMain)
app.use('/', app2.app)
const PORT = 3000
const server = http.createServer(app);
let io = require('socket.io')(server);
io.of('/stream').on('connection', stream);
server.listen(PORT);