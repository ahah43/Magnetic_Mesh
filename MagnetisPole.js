function MagnetisPole(polarity,location) {
	this.polarity = polarity;
	this.location = location;
	this.Force_state = createVector();
	this.size = 20;//abs(this.polarity) /10;
	this.torqueShare = 0; // for use with disc
	
	

	this.force = function(mg2){	
		// console.log(((this.polarity * mg2.polarity) / (this.location.dist(mg2.location))**2));
		return (this.polarity * mg2.polarity) / (this.location.dist(mg2.location))**2;
	}
	this.forcecomponents = function(mg2){
		var f = this.force(mg2);
		if(f == 0){return createVector(0,0,0)};
		var p2 = mg2.location;
		var p1 = this.location;
		if(f > 0){
			var p1 = mg2.location;
			var p2 = this.location;
		}
		var r = p5.Vector.sub(p2,p1);
		// var theta = p5.Vector.angleBetween(r,createVector(1,0,0));
		var theta = atan2(r.y,r.x);
		return createVector(cos(theta), sin(theta),0).mult(abs(f));
		
	}
	this.resultant = function(magnets){
		var R = createVector();

		for (var i =0; i<magnets.length;i++){
			// if (! this.same(magnets[i])){
				R.add(this.forcecomponents(magnets[i]));
			// }
			}

		// return R;
		this.Force_state = R;
	}

	this.same = function(m){
		return ((this.polarity == m.polarity) && (this.location.equals(m.location)));
	}
	
	this.display = function() {
		
				noStroke();
				if (this.polarity > 0) {
					fill(0,0,255);
				}
					else if (this.polarity < 0){
						fill(255,0,255);
					} else {
						fill(255,255,0)
					}
				ellipse(this.location.x, this.location.y, 2*this.size,2*this.size)
			  }
	this.drawArrow = function(){
		//console.log(! this.Force_state.equals(createVector()));
		if (this.torqueShare > 0){
			stroke(0,255,0);
		} else {
			stroke(255,0,0);
		}
		if (! this.Force_state.equals(createVector())){
		
		strokeWeight(this.size/3);
		var sc = 10;
		line(this.location.x, this.location.y, (this.location.x + sc*this.Force_state.x), (this.location.y+sc*this.Force_state.y));
		
		}
	}		  
}
