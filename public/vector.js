class Vector {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    add(vector, delta=1) {
        this.x += vector.x * delta;
        this.y += vector.y * delta;
        return this
    }

    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this
    }

    mult(mag) {
        this.x *= mag;
        this.y *= mag;
        return this
    }

    div(mag) {
        this.x /= mag;
        this.y /= mag;
        return this
    }

    normalize() {
        let magnitude = this.getMag()
        this.div(magnitude);
        return this
    }

    setMag(mag) {
        this.mult(mag);
        return this
    }

    getMag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    getAngle() {
        return this.toAngle(Math.atan2(this.y,this.x))
    }

    toRadians(angle) {
        return angle / 180 * Math.PI
    }

    toAngle(radians) {
        return radians * 180 / Math.PI
    }
    
    copy() {
        return new Vector(this.x, this.y)
    }
}

class AngleVector extends Vector {
    constructor(angle,magnitude) {
        let x = Math.cos(angle) * magnitude
        let y = Math.sin(angle) * magnitude
        super(x,y)
    }
}