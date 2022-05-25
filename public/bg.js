function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style('z-index','-1')
	background(240);
	getJSON('/users',
	function(err, data) {
  	if (err !== null) {
    		alert('Something went wrong: ' + err);
  	} else {
    		alert('Your query count: ' + data);
  	}
});
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)	
}


function draw() {
	background(240);
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