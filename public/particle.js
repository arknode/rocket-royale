class Particle {
    constructor(width,length) {
        this.position = new Vector(0,0)
        this.velocity = new Vector(0,0)
        this.acceleration = new Vector(0,0)
        this.bondingBox = this.getBoundingBox(width,length)
    }

    applyForce(vector) {
        this.acceleration.add(vector);
    }

    getBoundingBox(x,y,width,length) {

    }
}