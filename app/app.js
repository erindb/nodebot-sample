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

function getPosition(s, k, a) {
		socket.emit('getPositionForMapping');
	    socket.on('done', function(position) {
	    	socket.removeListener('done');
			console.log('robot sent me back "position" ' + position);
		})
	}

function updatePosition(x, y) {
	mapCanvas.clear();
	rect1 = mapCanvas.rect(0,0,600,600).attr({fill: "white"});
	currentX_plot = x + mapHalfWidth;
	currentY_plot = y + mapHalfWidth;
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

updatePosition(currentX, currentY);







