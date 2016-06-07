var socket = io();

function moveForward(){
    socket.emit('start');
}

function turnRight(){
    socket.emit('right');
}

function turnLeft(){
    socket.emit('left');
}

function moveReverse(){
    socket.emit('reverse');
}

function reverseRight(){
    socket.emit('reverse-right');
}

function stop(){
    socket.emit('stop');
}

function getLeftDistance(s, k, a) {
	socket.emit('get-left-distance');
		    socket.on('done', function(leftDistance) {
	    	socket.removeListener('done');
	    	// sleep.usleep(seconds*1000000);
			console.log('robot sent me back "left distance" ' + leftDistance);
			// var trampoline = k(s, leftDistance);
			// while (trampoline){
			// 	trampoline = trampoline();
			// }
		})
}

function getRightDistance(s, k, a) {
		socket.emit('get-right-distance');
	    socket.on('done', function(rightDistance) {
	    	socket.removeListener('done');
			console.log('robot sent me back "right distance" ' + rightDistance);
		})
	}

function getPosition() {
		socket.emit('get-position');
	    socket.on('done', function(position) {
	    	socket.removeListener('done');
			console.log('robot sent me back "position" ' + position.x + ',' + position.y);
			updatePosition(position.x, position.y);
		})
	}

function updatePosition(x, y) {
	// mapCanvas.clear();
	rect1 = mapCanvas.rect(0,0,600,600).attr({fill: "white", 'fill-opacity': 0.1});
	currentX_plot = x*3 + mapHalfWidth;
	currentY_plot = y*3 + mapHalfWidth;
	circle = mapCanvas.circle(currentX_plot, currentY_plot, 10).attr({fill: "red"});
}

document.getElementById('forward').onclick = moveForward;
document.getElementById('right').onclick = turnRight;
document.getElementById('left').onclick = turnLeft;
document.getElementById('reverse').onclick = moveReverse;
document.getElementById('reverse-right').onclick = reverseRight;
document.getElementById('getLeftDistance').onclick = getLeftDistance;
document.getElementById('getRightDistance').onclick = getRightDistance;
document.getElementById('getPosition').onclick = getPosition;
document.getElementById('stop').onclick = stop;


mapCanvas = Raphael('map', 600, 600);
mapHalfWidth = 600/2 - 5;
// mapCanvas.image("https://web.stanford.edu/~dco/common/images/bob.jpeg", 100, 100, 100, 100);
var currentX = 0;
var currentY = 0;
currentX_plot = currentX + mapHalfWidth;
currentY_plot = currentY + mapHalfWidth;
var circle = mapCanvas.circle(currentX_plot, currentY_plot, 10).attr({fill: "red"});

rect1 = mapCanvas.rect(0,0,600,600).attr({fill: "white", 'fill-opacity': 1});
updatePosition(currentX, currentY);




    myInterval = setInterval(function() {
      getPosition();
    }, 500);

    setTimeout(function() {
      clearInterval(myInterval);
      mapCanvas.text(200, 200, "Demo Timed Out.").attr({ "font-size": 24 });
    }, (120)*1000 ); // timeout of 120s






