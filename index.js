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
        a: new five.Motor( // right wheel motor
            // [3, 5]
            {
                pins: {
                  pwm: 5,
                  dir: 3
                },
                invertPWM: true
            }
        ),
        b: new five.Motor( // left wheel motor
            //[9, 10]
            {
                pins: {
                  pwm: 10,
                  dir: 9
                },
                invertPWM: true
            }
        )
    };

    commands = null;
    speed = 255;

    io.on('connection', function (socket) {
        socket.on('stop', function (data) {
            console.log('robot recieved stop signal')
            motors.a.stop();
            motors.b.stop();
            socket.emit('done', data);
        });

        socket.on('start', function (data) {
            console.log(data);
            console.log('robot recieved start signal')
            speed = 150;
            motors.a.fwd(speed);
            motors.b.fwd(speed);
            socket.emit('done', data);
        });

        socket.on('reverse', function (data) {
            console.log('robot recieved reverse signal')
            speed = 120;
            motors.a.rev(speed);
            motors.b.rev(speed);
            socket.emit('done', data);
        });

        socket.on('left', function (data) {
            console.log('robot recieved left signal')
            var aSpeed = 220;
            var bSpeed = 50;
            motors.a.fwd(aSpeed);
            motors.b.rev(bSpeed);
            socket.emit('done', data);
        });

        socket.on('right', function (data) {
            console.log('robot recieved right signal')
            var aSpeed = 50;
            var bSpeed = 220;
            motors.a.rev(aSpeed);
            motors.b.fwd(bSpeed);
            socket.emit('done', data);
        });

        socket.on('reverse-right', function (data) {
            console.log('robot recieved reverse-right signal')
            var aSpeed = 50;
            var bSpeed = 220;
            motors.a.fwd(speed);
            motors.b.rev(speed);
            socket.emit('done', data);
        });
    });
});