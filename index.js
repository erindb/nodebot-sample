var express = require('express');
var app = express();
var io = require('socket.io')(app.listen(3000));
var five = require('johnny-five');

//Setting the path to static assets
app.use(express.static(__dirname + '/app'));

//Serving the static HTML file
app.get('/', function (res) {
    res.sendFile('/index.html')
});

var board = new five.Board({
    repl: false
});

board.on('ready', function () {
    var speed, commands, motors;
    motors = {
        right: new five.Motor( // right wheel motor
            // [3, 5]
            {
                pins: {
                  pwm: 5,
                  dir: 3
                },
                invertPWM: true
            }
        ),
        left: new five.Motor( // left wheel motor
            //[9, 10]
            {
                pins: {
                  pwm: 10,
                  dir: 9
                },
                invertPWM: true
            }
        )
        // 6, 7 are the right sensor
        // 11, 12 are the left sensor
    };

    commands = null;
    speed = 255;

    io.on('connection', function (socket) {
        socket.on('stop', function (data) {
            console.log('robot recieved stop signal')
            motors.right.stop();
            motors.left.stop();
            socket.emit('done', data);
        });

        socket.on('start', function (data) {
            console.log(data);
            console.log('robot recieved start signal')
            speed = 150;
            motors.right.fwd(speed);
            motors.left.fwd(speed);
            socket.emit('done', data);
        });

        socket.on('reverse', function (data) {
            console.log('robot recieved reverse signal')
            speed = 150;
            motors.right.rev(speed);
            motors.left.rev(speed);
            socket.emit('done', data);
        });

        socket.on('left', function (data) {
            console.log('robot recieved left signal')
            var rightSpeed = 150;
            var leftSpeed = 150;
            motors.right.fwd(rightSpeed);
            motors.left.rev(leftSpeed);
            socket.emit('done', data);
        });

        socket.on('right', function (data) {
            console.log('robot recieved right signal')
            var rightSpeed = 150;
            var leftSpeed = 150;
            motors.right.rev(rightSpeed);
            motors.left.fwd(leftSpeed);
            socket.emit('done', data);
        });

        socket.on('reverse-right', function (data) {
            console.log('robot recieved reverse-right signal')
            var rightSpeed = 50;
            var leftSpeed = 220;
            motors.right.fwd(rightSpeed);
            motors.left.rev(leftSpeed);
            socket.emit('done', data);
        });
    });
});