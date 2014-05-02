render.c0.width=window.innerWidth;
render.c0.height=window.innerHeight;
	// old draw around 0,0 used this, and we still use it because we base on 0,0 being centered
	render[0].setTransform(1,0,0,1,window.innerWidth/2,window.innerHeight/2);

resizeMap();
mapCenterDot();
//render.c1.style.background="#011";

render.c2.width=window.innerWidth;
render.c2.height=window.innerHeight;

render.cUI.width=window.innerWidth;
render.cUI.height=window.innerHeight;

function resizeMap(){
	var relWidth=window.innerWidth/4;	var relHeight=window.innerHeight/3;
	if (relWidth>relHeight) relWidth=relHeight;
	render.c1.width=relWidth;		//*4 for ratio, /4 for a 4th of window
	render.c1.height=relHeight*3/4;	//*3 for ratio, /4 for a 4th of window
	render[1].setTransform(1,0,0,1,render.c1.width/2,render.c1.height/2);
}
function mapCenterDot(){
	render[1].setTransform(1,0,0,1,render.c1.width/2,render.c1.height/2); //this is required for center dot

	render[1].beginPath();
	render[1].arc(0,0,1,0,Math.Tau);
	render[1].fillStyle='#F00'; //red
	render[1].fill();

	/*render[1].beginPath();
	render[1].moveTo(0,render.c1.height/2);
	render[1].lineTo(render.c1.width,render.c1.height/2);
	render[1].moveTo(render.c1.width/2,0);
	render[1].lineTo(render.c1.width/2,render.c1.height);
	render[1].fillStyle='#F00'; //red
	render[1].fill();*/

	render[1].beginPath();
	render[1].moveTo(-render.c1.width/2,0); //left center
	render[1].lineTo(render.c1.width/2,0); //right center
	render[1].moveTo(0,-render.c1.height/2); //top center
	render[1].lineTo(0,render.c1.height/2); //bottom center
	render[1].strokeStyle='#400'; //red
	render[1].lineWidth=0.4;
	render[1].stroke();
}

function redrawIdontLike(){
	//render[0].setTransform(1,0,0,1,render.c1.width/2,render.c1.height/2);

	// use the old drawing method here,
	//NOT based on the barycenter because that isn't working wtf
	render[0].clearRect(-window.innerWidth/2,-window.innerHeight/2,window.innerWidth,window.innerHeight);
	forEach(bodies,function(b){
		render[0].beginPath();
		//render[1].arc(b.x-barycenter.x,b.y-barycenter.y,b.radius,0,Math.Tau);
		render[0].arc(b.x-bodies[focusBody].x,b.y-bodies[focusBody].y,b.radius,0,Math.Tau);
		render[0].fillStyle=b.color;
		render[0].fill();
	});

	//MAP

	//render[1].clearRect(-render.c1.width/2,-render.c1.height/2,render.c1.width,render.c1.height);
	render[1].clearRect(0,0,render.c1.width,render.c1.height);
	var scale=estimateScale();
	render[1].setTransform(scale,0,0,scale,render.c1.width/2,render.c1.height/2);

	forEach(bodies,function(b){
		render[1].beginPath();
		var x=(b.x-bodies[focusBody].x)*scale;
		var y=(b.y-bodies[focusBody].y)*scale;
		var radius=b.radius*scale;	if (radius<0.5) radius=0.5;
		render[1].arc(x,y,radius,0,Math.Tau);
		render[1].fillStyle=b.color;
		render[1].fill();
	});

	mapCenterDot();
}

//taken from an edit someone made a long time back
// the idea is to apply this scale to rendering by default to adapt it to show everything
// this needs to be adapted/modified and possibly used for a minimap
function estimateScale(){
	var maxDistance=0;
	forEach(bodies,function(b){
		var D=b.x*b.x+b.y*b.y;
		if (D>maxDistance) maxDistance=D;
	});
	return  0.4875 *  window.innerHeight / Math.sqrt(maxDistance);
	//return 0.4 * render.c1.width/Math.sqrt(maxDistance);/**/

	/*var maxDistance=0;
	forEach(bodies,function(b){
		var d=Math.getDistance(bodies[0],b);
		if (d>maxDistance) maxDistance=d;
	});
	result=render.c1.width/Math.sqrt(maxDistance);
	console.log(result);
	return 1/result*3;*/
}

/*
//RENDERING
var renderSpeed=33;		//how many milliseconds between each frame rendering
var scaleFactor=1;		//multiplied by everything rendered (except on UI canvas) to scale
var fadeColor='255,255,255';	//what color to use on fadeCanvas functions (r,g,b)
var fadeAlpha=0.05;		//how much alpha to use on fadeCanvas functions

var defaultTextColor='black';
var defaultFont='12px sans-serif';
var defaultLineHeight=12;	//must match font size in defaultFont
var defaultTextPadding=2;

//backctx.lineWidth=1.15;	//width of lines drawn
//backctx.lineCap='butt';	//end of lines style: butt,round,square
//backctx.lineJoin='miter';	//how to style joined lines: bevel,round,miter
//backctx.miterLimit=5;		//maximum 'sharpness' distance of joined lines

//backctx.font-family='sans-serif';
//backctx.font-size='10px';

//backctx.line-height='10px';
//backctx.font-weight='normal';		//normal,bold,bolder,lighter,100 to 900 (at 100 increments)



function renderLoop() {
	//
}

function drawUI() {
	//add code here to draw whatever UI currently needed
	//terminal.out(); //redraw last debug message (uncomment if needed)
}
*/
