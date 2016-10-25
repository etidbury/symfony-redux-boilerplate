/**
 * Created by Edmeister on 05-Jul-16.
 */
module.exports = function (dbpool) {

    var events = require('events');
    var fs = require('fs');

    var modelList = fs.readdirSync(MODEL_URI).filter(function(fileName) {
        return (fileName.indexOf(".js") > -1);
    }).map(function (fileName) {
        return fileName.split('.js')[0];
    });
    console.log("Models ",modelList.join(','));//fordebug: print log
    
    var DBConnection = function (onerror, connsuccess) {

        dbpool.getConnection(function (err, connection) {
            if (err) {
                onerror(err);
                return false;
            }

            connsuccess(connection);
        });

    };

    var self = {};
    for (var i = 0; i < modelList.length; i++) {
        var model = modelList[i];
        self[model] = srcRequire('model/' + model)(DBConnection);
    }

    var express = require('express');
    var app = express();
    self.server = require('http').createServer(app);
    self.socketio = require('socket.io')(self.server);


    self.UserEventBus = new events.EventEmitter;

    var UserSocketClient = srcRequire('model/socket/client/User')(self);

    self.socketio.on('connection', function (socket) {
        socket.emit('connected');
        socket.on('subscribe', function (room) {
            console.log("joining room:" + room);
            socket.join(room);
        });

        socket.on('unsubscribe', function (room) {
            console.log('leaving room', room);
            socket.leave(room);
        });

    });

    return self;

};