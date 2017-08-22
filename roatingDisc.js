function roatingDisc() {
  this.discMagnets = [];
  this.MagnetsPositions = [];
  this.discAngle = 0;
  this.center = createVector();
  this.Inertia = 2000000;
  this.ForcedSpeed = 0;
  this.vel = 0;
  this.acc = 0;
  this.moment = 0;





  this.addMagnet = function (m, angle, r) {
    this.discMagnets.push(m);
    this.MagnetsPositions.push([ angle, r]);
  }

  this.DrawDisc = function () {
    fill(0)
    strokeWeight(1)
    stroke(0)
    ellipse(this.center.x, this.center.y, 20,20);
    for (var i = 0; i < this.discMagnets.length; i++) {
      this.discMagnets[i].location.x = this.center.x + (this.MagnetsPositions[i][1] * cos(this.discAngle + this.MagnetsPositions[i][0]));
      this.discMagnets[i].location.y = this.center.y + (this.MagnetsPositions[i][1] * sin(this.discAngle + this.MagnetsPositions[i][0]));
      this.discMagnets[i].display();
      this.discMagnets[i].drawArrow();
      stroke(0);
      strokeWeight(1)
      line(this.discMagnets[i].location.x, this.discMagnets[i].location.y, this.center.x,  this.center.y);
    }
  }
  this.updateposition = function () {
    this.acc = this.moment / this.Inertia;
    this.vel += this.acc;
    // console.log(this.vel);
    var ss = this.discAngle + (this.ForcedSpeed + this.vel);  
    this.acc = 0;
    this.moment = 0;
    this.discAngle = ss - TWO_PI * Math.floor(ss / TWO_PI);
  }

  this.momentCalc = function (magnets) {
    var M = 0;
    if (magnets) {
      for (var i = 0; i < this.discMagnets.length; i++) {
        this.discMagnets[i].resultant(magnets);
        var r = p5.Vector.sub(this.discMagnets[i].location, this.center);
        this.discMagnets[i].torqueShare =  p5.Vector.dot(createVector(0, 0, 1), p5.Vector.cross(r, this.discMagnets[i].Force_state));
        M += this.discMagnets[i].torqueShare;
      }
    }
    M = 1e-8 * round(M * 1e8);
    this.moment = M;
    // console.log(this.moment);
   
  }



}
