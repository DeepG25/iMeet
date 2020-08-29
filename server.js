const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const routes = express.Router();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'/client')));

routes.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname,'/client/index.html'));
});

app.use(routes);
http.listen(port);

//server side for web sockets
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log("Client Connected");

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
});