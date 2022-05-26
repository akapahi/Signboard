var messages = [];

function preload() {
  // Get the most recent earthquake in the database
  font = loadFont('dotFont.TTF');
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style('z-index','-1')
	background(240);
	getJSON('/all_user',
	function(err, data) {
  	if (err !== null) {
    		alert('Something went wrong: ' + err);
  	} else {
    		data.forEach((rec) => {
			messages.push(new scrollText(rec.name));
			
		});
		console.log(messages);
  	}
});
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)	
}


function draw() {
	background(240);
	messages.forEach((msg) => {
		msg.update();
		msg.show();
	});
}

class scrollText{
	constructor(text, size = random(16,64), x = random(width), y = random(height)) {
		this.size = size;
		this.text = text;
		this.life = random(100, 500);
		this.position = createVector(x, y);
		this.velocity = createVector(random(0,1),random(-1, 1));
		this.velocity.setMag(random(0.5, 2));
	}

	update() {
		this.position.sub(this.velocity);
		let bounding_box = font.textBounds(this.text, this.position.x, this.position.y, this.size);

		if (this.position.x > width) this.position.x = 0;
		if (this.position.x < 0 - bounding_box.w) this.position.x = width;
		if (this.position.y > height + bounding_box.w) this.position.y = 0;
		if (this.position.y < 0 ) this.position.y = height;
	}

	show() {
		push();
		strokeWeight(2);
		translate(this.position.x, this.position.y);
		rotate(this.velocity.heading());
		textSize(this.size);
		textFont(font);
		text(this.text, 0, 0);
		pop();
	}
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};