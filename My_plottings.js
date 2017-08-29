const k = 500;
var plots =[];
var points = [[],[],[],[],[]];
const pltsQ = 5;
const labels = ["Torque","Relative angular velocity","Angular Position (DEGREE)","Relative angular momentum (Iw)","Relative rotational energy (Iw2)"];
var values = [t_chart, v_chart, theta_chart,Momentum_chart, Energy_Chart ];
var v,A;
var Myplots = function(p) {
	// Global variables

	// Load the image before the sketch is run
	p.preload = function() {
		// star = p.loadImage("data/star.png");
	};

	// Initial setup
	p.setup = function() {
		// Create the canvas
		h = 300*pltsQ;
		w = 1200;	
		var canvas = p.createCanvas(w, h+30*pltsQ);


	for(var i=0; i < pltsQ; i++){
		points[i] = [];
		// Setup for the second plot
		plots[i] = new GPlot(p);
		plots[i].setPos(0, i*h/pltsQ);
		plots[i].setDim(w, h/pltsQ-30);
		// plot2.getXAxis().getAxisLabel().setText("steps");
		plots[i].getYAxis().getAxisLabel().setText(labels[i]);
		plots[i].setPoints(points[i]);
		// Setup the mouse actions
		plots[i].activateCentering();
	}
		plots[0].getTitle().setText("values vs time(steps)");
		// Leave empty the points for the second plot. We will fill them in draw()
};

	// Execute the sketch
	p.draw = function() {
		values = [t_chart, v, theta_chart*180/PI,Momentum_chart, Energy_Chart ];
		points = [[],[],[],[],[]];
		// Clean the canvas
		// Reset the points if the user pressed the space bar
		// if (p.keyIsPressed && p.key === ' ') {
		// 	plot2.setPoints([]);
		// }
		p.background(255);
		var zaman = time_chart;
		if (discs[0].vel === 0){
            v = 0;
        }else{
           v =  v_chart/discs[0].vel;
        };


			if (zaman < 1){
				for(var i=0; i < pltsQ; i++){
				plots[i].setPoints([]);
			}
		 } else {
			for(var i=0; i < pltsQ; i++){
				points[i] = plots[i].getPoints();
			}
			};
			if (plots[0].getPoints().length > k){
				for(var i=0; i < pltsQ; i++){
				points[i] = subset(points[i], 1);
			}
		};
		for(var i=0; i < pltsQ; i++){
			A = values[i];
			print(A);
			points[i].push(new GPoint(zaman, A));
			plots[i].setPoints(points[i]);
			// Draw the plot
			plots[i].beginDraw();
			plots[i].drawBackground();
			plots[i].drawBox();
			plots[i].drawXAxis();
			plots[i].drawYAxis();
			plots[i].drawTitle();
			plots[i].drawGridLines(GPlot.BOTH);
			plots[i].drawLines();
			// plot[i].drawPoints(star);
			plots[i].endDraw();
	};
		// Add a new point to the second plot if the mouse moves significantly






	};
};
