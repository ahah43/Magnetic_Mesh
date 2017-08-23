var Myplots = function(p) {
	// Global variables
	var plot2, plot1, plot3, i, index;
	var points2 = [];
	var points1 = [];
	var points3 = [];

	// Load the image before the sketch is run
	p.preload = function() {
		// star = p.loadImage("data/star.png");
	};

	// Initial setup
	p.setup = function() {
		// Create the canvas
		h = 900;
		w = 1200;
		var canvas = p.createCanvas(w, h+100);


		
		// Leave empty the points for the second plot. We will fill them in draw()
		var points2 = [];
		// Setup for the second plot
		plot2 = new GPlot(p);
		plot2.setPos(0, 0);
		plot2.setDim(w, h/3-30);
		// plot2.getXAxis().getAxisLabel().setText("steps");
		plot2.getYAxis().getAxisLabel().setText("Torque");
		plot2.getTitle().setText("values vs time(steps)");
		plot2.setPoints(points2);
		// Setup the mouse actions
		plot2.activateCentering();

		// Leave empty the points for the second plot. We will fill them in draw()
		var points1 = [];
		// Setup for the second plot
		plot1 = new GPlot(p);
		plot1.setPos(0, h/3);
		plot1.setDim(w, h/3-30);
		// plot1.getXAxis().getAxisLabel().setText("steps");
		plot1.getYAxis().getAxisLabel().setText("Angulr Velocity");
		// plot1.getTitle().setText("Torque vs time");
		plot1.setPoints(points1);
		// Setup the mouse actions
		plot1.activateCentering();


		// Leave empty the points for the second plot. We will fill them in draw()
		var points3 = [];
		// Setup for the second plot
		plot3 = new GPlot(p);
		plot3.setPos(0, 2*h/3);
		plot3.setDim(w, h/3-30);
		plot3.getXAxis().getAxisLabel().setText("steps");
		plot3.getYAxis().getAxisLabel().setText("Angular Position");
		// plot3.getTitle().setText("Torque vs time");
		plot3.setPoints(points3);
		// Setup the mouse actions
		plot3.activateCentering();




	};

	// Execute the sketch
	p.draw = function() {
		// Clean the canvas
		// Reset the points if the user pressed the space bar
		// if (p.keyIsPressed && p.key === ' ') {
		// 	plot2.setPoints([]);
		// }
		p.background(255);
		var k = 500
		var zaman = int(time_chart.elt.textContent);
		points2 = [];
		points1 = [];
		points3 = [];

		if (zaman <1){
			plot2.setPoints([]);
			plot1.setPoints([]);
			plot3.setPoints([]);
		} else {
			points2 = plot2.getPoints();
			points1 = plot1.getPoints();
			points3 = plot3.getPoints();
		};
		
		if (plot2.getPoints().length > k){
			points2 = subset(points2, 1);
			points1 = subset(points1, 1);
			points3 = subset(points3, 1);
			
		};
		// Add a new point to the second plot if the mouse moves significantly

  
        
		

		var torque = float(t_chart.elt.textContent);
		// console.log(t);
		points2.push(new GPoint(zaman, torque));
		plot2.setPoints(points2);
		// Draw the second plot
		plot2.beginDraw();
		plot2.drawBackground();
		plot2.drawBox();
		plot2.drawXAxis();
		plot2.drawYAxis();
		plot2.drawTitle();
		plot2.drawGridLines(GPlot.BOTH);
		plot2.drawLines();
		// plot2.drawPoints(star);
		plot2.endDraw();

		
		var V = float(v_chart.elt.textContent);
		// console.log(t);
		points1.push(new GPoint(zaman, V));
		plot1.setPoints(points1);
		// Draw the second plot
		plot1.beginDraw();
		plot1.drawBackground();
		plot1.drawBox();
		plot1.drawXAxis();
		plot1.drawYAxis();
		plot1.drawTitle();
		plot1.drawGridLines(GPlot.BOTH);
		plot1.drawLines();
		plot1.endDraw();

		
		var A = float(theta_chart.elt.textContent);
		// console.log(t);
		points3.push(new GPoint(zaman, A));
		plot3.setPoints(points3);
		// Draw the second plot
		plot3.beginDraw();
		plot3.drawBackground();
		plot3.drawBox();
		plot3.drawXAxis();
		plot3.drawYAxis();
		plot3.drawTitle();
		plot3.drawGridLines(GPlot.BOTH);
		plot3.drawLines();
		plot3.endDraw();

	};
};
