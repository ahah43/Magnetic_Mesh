var discs = [];
var t_chart, v_chart, theta_chart, time_chart;
var p5Sketch;
// var discs[1];
function setup() {
	frameRate(20);
	createCanvas(1200, 600);
	// m[0] = new MagnetisPole(+1, createVector(400,300));
	// m.push (new MagnetisPole(-1, createVector(450,300)));
	// m[2] = new MagnetisPole(-1, createVector(350,300));
	var p = 1000;
	var r = 100;
	discs[0] = new roatingDisc();
	discs[0].center = createVector(500, height / 2);
	discs[0].discAngle = 0;
	discs[0].ForcedSpeed = TWO_PI / 120;
	var motorMagnetsQ = 6;

	angle = TWO_PI / motorMagnetsQ;
	// translate(discs[0].location.x, discs[0].location.y)
	for (var i = 0; i < motorMagnetsQ; i++) {
		var md = new MagnetisPole(p, createVector());
		discs[0].addMagnet(md, i * angle, r);
		p *= -1;
	}
	discs[0].DrawDisc();



	var p = 1000;
	discs[1] = new roatingDisc();
	discs[1].center = createVector(800, height / 2);
	discs[1].discAngle = 0;
	discs[1].ForcedSpeed = 0;
	var DrivenrMagnetsQ = 6;
	angle = TWO_PI / DrivenrMagnetsQ;
	// translate(discs[0].location.x, discs[0].location.y)
	for (var i = 0; i < DrivenrMagnetsQ; i++) {
		var md = new MagnetisPole(p, createVector());
		discs[1].addMagnet(md, i * angle, r);
		p *= -1;
	}
	discs[1].DrawDisc();

	time = 0
	// t_chart.value(0);
	t_chart = createP();
	// t_chart.id('T');
	v_chart = createP();
	theta_chart = createP();
	time_chart = createP();

	runSketch(Myplots)



}



function draw() {
    console.log(frameRate());
	discs[1].momentCalc(discs[0].discMagnets);
	time_chart.html(time);
	t_chart.html(discs[1].moment);
	v_chart.html(discs[1].vel);
	theta_chart.html(sin(discs[1].discAngle));
	// t_chart.value(discs[1].moment);
	background(255);
	for (var i = 0; i < discs.length; i++) {
		discs[i].updateposition();
		discs[i].DrawDisc();

	}
	time += 1 ;

}


function runSketch(sketch) {
	if (typeof p5Sketch !== 'undefined') {
		p5Sketch.remove();
	}

	p5Sketch = new p5(sketch);
}