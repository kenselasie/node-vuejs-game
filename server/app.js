const express = require('express')
const { Socket } = require('dgram')
const http = require('http').Server(express)
const socketio = require('socket.io')(http)


var postion = {
    x: 200,
    y: 200
}

// When an client connects to the server
socketio.on('connection', connectedSocket => {
    connectedSocket.emit('position', postion)
    connectedSocket.on('move', data => {
        switch(data) {
            case 'left':
                postion.x -= 5;
                socketio.emit('position', postion)
                break
            case 'right':
                postion.x += 5;
                socketio.emit('position', postion)
                break
            case 'up':
                postion.y -= 5;
                socketio.emit('position', postion)
                break
            case 'down':
                postion.y += 5;
                socketio.emit('position', postion)
                break
            case 'top-left':
                postion.y -= 5;
                postion.x -= 5;
                socketio.emit('position', postion)
                break
        }
    })
})

http.listen(3000, () => {
    console.log('Listening at port 3000')
})