# WebPPL Powers a Robot

## Wiring

- 3A is hooked to arduino digital pin 3;
- 4A is hooked to arduino digital pin 5;
- 1A is hooked to arduino digital pin 10;
- 2A is hooked to arduino digital pin 9;
- 3,4EN and 1,2EN hooked directly to arduino 5V output pin;
- hbridge pin labels from: ![Diagram](/images/h_bridge_diagram.png) [documentation here](http://www.ti.com/lit/ds/symlink/sn754410.pdf) (Section 6, page 3)
- loosely following this wiring diagram:
https://github.com/rwaldron/johnny-five/blob/master/docs/motor-hbridge.md

- Left trigger and echo both hooked to 12.
- Right trigger and echo both hooked to 7.

## Installation

1. Install Arduino

2. Upload the firmware to the robot:

	use PingFirmata
	http://johnny-five.io/api/proximity/#pingfirmata
	Source code: 
	https://gist.githubusercontent.com/rwaldron/0519fcd5c48bfe43b827/raw/f17fb09b92ed04722953823d9416649ff380c35b/PingFirmata.ino

3. Install node and npm

4. Run npm install
	
	* this currently doesn't install socket.io-client, webppl, or sleep, so you'll have to do that separately. (TO DO: update package)

5. Run `node index.js` in one terminal

6. Run `webppl robot.wppl --require robot` in another terminal to enter autonomous mode for 100 iterations

7. Open a browser to 127.0.0.1:3000 for a remote control

8. ???

9. Profit