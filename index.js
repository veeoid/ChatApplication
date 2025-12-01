const express = require('express');
const http = require('http');
const {Server} = require('socket.io')
const path = require('path')

PORT = 9000;

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer);

io.on('connection', (socket)=>{
    socket.on('user-message', (message) => {
        console.log(`User Message: ${message}`)
        io.emit('server-message', message)
    })
})

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res)  => {
    return res.sendFile('/public/index.html')
})

httpServer.listen(PORT, () => {console.log(`listening at PORT: ${PORT}`)})

