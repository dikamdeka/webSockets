var socket;
var text;
var para;
var dropBox;

function setup(){
	// createCanvas(600,600);	
	// background(100);
	noCanvas();
	
	// opens a connection to the node server
	socket = io.connect('http://localhost:3000');

	// recieves a msg named 'mouse' from server
	socket.on('mouse', drawMsg);
	text = select('#textbox');
	text.changed(sendMe);

	// receives an image file from server
	socket.on('image', drawImg);


	dropBox = select('#dropzone');
	dropBox.dragOver(highlight);
	dropBox.dragLeave(unhighlight);	
	dropBox.drop(gotFile, unhighlight) ;

	// recieves a msg named 'message' from the node server
	socket.on('message', displayMsg);
}

// draws the image received from server

function drawImg(file){
	createImg(file.i);
}

// receives the file and sends it to the server
function gotFile(file){

	// createImg(file.data);
	var img = {
		i: file.data
	};
	socket.emit('image', img);


}


// highlights the dropzone
function highlight(){
	dropBox.removeClass('unhighlight');
	dropBox.addClass('highlight');
	
}

// unhighlights the dropzone
function unhighlight(){
	dropBox.removeClass('highlight');
	dropBox.addClass('unhighlight');
}


// displays the msg named 'message' to the document
function displayMsg(uText){
	var t = uText.userMsg;
	para = createP('');
	para.html(t);
	para.style('color', 'cyan');
}
 

// sends the msg typed in the text box to the server
function sendMe(){
	var para1 = createP('');
	para1.html(text.value());
	para1.style('color', 'orange');
	var msg = {
		userMsg: text.value()
	};
	socket.emit('message', msg);

	text.value('');
}


// draws to canvas the msg received named 'mouse' from server
function drawMsg(data){
	fill(255,200,100);
	ellipse(data.x, data.y, 20, 20);
}

function draw(){
	
	
	// ellipse(mouseX, mouseY, 20, 20);
	if(mouseIsPressed){
		
	}
}

function mouseDragged(){
	console.log('Sending ' + mouseX + ',' + mouseY);

	var data = {
		x: mouseX,
		y: mouseY
	}

// sends msg named 'mouse' to the server
	socket.emit('mouse', data);

	fill(255);
	ellipse(mouseX, mouseY, 20, 20);
}

function mousePressed(){
	// ellipse(mouseX, mouseY, 20, 20);
	// clear();
	// background(0);

}

// clears the canvas on key press
function keyPressed(){
	background(0);

}

// https://goo.gl/forms/iryXDyUejXfW5RIq2
