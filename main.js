/*globals require */
var express = require("express");
var app = express();
var server = app.listen(2000);
var io = require('socket.io').listen(server);

app.use("/styles", express.static(__dirname + "/styles"));
app.use("/lib", express.static(__dirname + "/lib"));

app.get("/", function (request, response) {
    'use strict';
    
    response.sendFile(__dirname + "/index.html");

    io.on('connection', function (socket) {
        socket.on('JohnMsg', function (data) {
            var userMsg = {};
            userMsg.name = 'John';
            userMsg.msg = data;
            socket.emit('John', userMsg);
        });
        socket.on('MarshMsg', function (data) {
            var userMsg = {};
            userMsg.name = 'Marsh';
            userMsg.msg = data;
            socket.emit('Marsh', userMsg);
        });
    });
});
