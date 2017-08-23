var discs = [];
var t_chart, v_chart, theta_chart, time_chart;
var time;
var x;
var yCenter;
// Motoor Disc Parameters
var MotorDiscMagnetsNumber = 6;
var MotorDiscSpeed = 0.2;
var MotordiscAngleDegress = 0;
var MotorDiscMagnetsStrength = 1000;
var MotorDiscRadius = 100;
var seperator = '#00ddff'; 
// driven Disc Parameters
var DistanceBetweenDiscsCenters = 300;
var DrivenDiscRadius = 100;
var DrivenDiscMagnetsNumber = 6;
var DrivenDiscAngleDegress = 0;
var DrivenDiscMagnetsStrength = 1000;
var DrivenDiscInertia = 2000000;






function setup() {
	yCenter = 200+ max(DrivenDiscRadius, MotorDiscRadius);
	ourCanvas = createCanvas(1200, 800);

	// the new canvas to contain gui without quicksettings.js reference problems
	makeOurgui();

	t_chart = createP();
	v_chart = createP();
	theta_chart = createP();
	time_chart = createP();
	t_chart.hide();
	v_chart.hide();
	theta_chart.hide();
	time_chart.position(400, 500);
    time_chart.hide();
	initiateSystem();
}



function draw() {
	//console.log(frameRate());
	discs[1].momentCalc(discs[0].discMagnets);
	time_chart.html(time);
	t_chart.html(discs[1].moment);
	v_chart.html(discs[1].vel);
	theta_chart.html((discs[1].discAngle));
	// t_chart.value(discs[1].moment);
	background(255);
	for (var i = 0; i < discs.length; i++) {
		discs[i].updateposition();
		discs[i].DrawDisc();

	}
	time += 1;

}


//function mousePressed() {
//saveFrames("out", "png", 1, 25,);
//}




function initiateSystem() {
	// var MotorMangnetsQ = slide1.value();
	yCenter = 200+ max(DrivenDiscRadius, MotorDiscRadius);
	var p = MotorDiscMagnetsStrength;
	discs[0] = new roatingDisc();
	discs[0].center = createVector(MotorDiscRadius+300, yCenter);
	discs[0].discAngle = MotordiscAngleDegress*PI/180;
	discs[0].ForcedSpeed = MotorDiscSpeed * TWO_PI / 25;

	angle = TWO_PI / MotorDiscMagnetsNumber;
	// translate(discs[0].location.x, discs[0].location.y)
	for (var i = 0; i < MotorDiscMagnetsNumber; i++) {
		var md = new MagnetisPole(p, createVector());
		discs[0].addMagnet(md, i * angle, MotorDiscRadius);
		p *= -1;
	}
	discs[0].DrawDisc();


	var p = DrivenDiscMagnetsStrength;
	discs[1] = new roatingDisc();
	discs[1].Inertia = DrivenDiscInertia;
	discs[1].center = createVector(discs[0].center.x + DistanceBetweenDiscsCenters, yCenter);
	discs[1].discAngle = DrivenDiscAngleDegress*TWO_PI/180;
	discs[1].ForcedSpeed = 0;
	angle = TWO_PI / DrivenDiscMagnetsNumber;
	// translate(discs[0].location.x, discs[0].location.y)
	for (var i = 0; i < DrivenDiscMagnetsNumber; i++) {
		var md = new MagnetisPole(p, createVector());
		discs[1].addMagnet(md, i * angle, DrivenDiscRadius);
		p *= -1;
	}
	discs[1].DrawDisc();

	time = 0
	time_chart.html(time);
	// if (p5Sketch) {
	// 	p5Sketch.remove();
	// };

	runSketch(Myplots)


	// Only call draw when then gui is changed
};



function runSketch(sketch) {
	if (typeof p5Sketch !== 'undefined') {
		p5Sketch.remove();
	}

	p5Sketch = new p5(sketch);
};



function makeOurgui() {
	x = new p5(function (sketch) {
		var ref = [MotorDiscMagnetsNumber, MotorDiscSpeed, MotordiscAngleDegress, MotorDiscMagnetsStrength,MotorDiscRadius,
			DistanceBetweenDiscsCenters, DrivenDiscRadius, DrivenDiscMagnetsNumber,DrivenDiscAngleDegress,
			DrivenDiscMagnetsStrength,DrivenDiscInertia];
		var ref2;

		sketch.setup = function () {
			var g = createGui('System Parameters');
			sliderRange(0, 25, 1);
			g.addGlobals('MotorDiscMagnetsNumber');
			sliderRange(0, 1, 0.01);
			g.addGlobals('MotorDiscSpeed');
			sliderRange(0, 360, 1);
			g.addGlobals('MotordiscAngleDegress');
			sliderRange(0, 5000, 100);
			g.addGlobals('MotorDiscMagnetsStrength');
			sliderRange(0, 600, 5);
			g.addGlobals('MotorDiscRadius');
			// sliderRange(0, 10, 1);
			// g.addGlobals('seperator');
			sliderRange(0, 1000, 1);
			g.addGlobals('DistanceBetweenDiscsCenters');
			sliderRange(0, 600, 1);
			g.addGlobals('DrivenDiscRadius');
			sliderRange(0, 25, 1);
			g.addGlobals('DrivenDiscMagnetsNumber');
			sliderRange(0, 360, 1);
			g.addGlobals('DrivenDiscAngleDegress');
			sliderRange(0, 5000, 100);
			g.addGlobals('DrivenDiscMagnetsStrength');
			sliderRange(0, 20000000, 1000);
			g.addGlobals('DrivenDiscInertia');
			

		};
		sketch.draw = function () {
			ref2 = [MotorDiscMagnetsNumber, MotorDiscSpeed, MotordiscAngleDegress, MotorDiscMagnetsStrength,MotorDiscRadius,
				DistanceBetweenDiscsCenters, DrivenDiscRadius, DrivenDiscMagnetsNumber,DrivenDiscAngleDegress,
				DrivenDiscMagnetsStrength,DrivenDiscInertia];
			for (var i =0; i< ref.length;i++){
				if (ref[i] != ref2[i] ){
					ref = ref2;
					initiateSystem();

				};
			};
		};
	});

}