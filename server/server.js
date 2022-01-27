const http=require('http');
const app=require('./index');
const PORT=process.env.PORT || 5000;
// const server=http.createServer(app);
// server.listen(PORT);

module.exports = { app }