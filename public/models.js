class Map extends PIXI.Container {
    constructor(game, length, size) {
        super()
        this.game = game
        this.length = length
        this.size = size
        this.grid = [];
        for (let j = 0; j < length; j++) {
            this.grid[j] = []
            for (let i = 0; i < length; i++) {
                let square = new PIXI.Graphics();
                square.lineStyle(1, 0x2c383a, 1);
                square.drawRect(0,0, size, size);
                square.position.x = size * i;
                square.position.y = size * j;
                this.grid[j][i] = square
                this.addChild(square);
            }
        }
        
    }
}

class Particle {
    constructor(position) {
        this.position = position
        this.velocity = new Vector(0,0)
        this.acceleration = new Vector(0,0)
        this.friction = 0
    }

    get speed() {
        return (this.velocity.x ** 2 +  this.velocity.y ** 2) ** 0.5
    }

    applyForce(vector) {
        this.acceleration.add(vector);
    }

    applyFriction(delta) {
        let normal = this.velocity.copy().mult(new Vector(-1,-1))
        normal.setMag(this.friction * delta)
        this.applyForce(normal)
    }
}

class Entity extends Particle {
    constructor(game, sprite, position) {
        super(position)
        this.game = game
        sprite.x = this.position.x
        sprite.y = this.position.y
        this.sprite = sprite
    }

    get bearing() {
        let mouse = this.game.mouseposition
        let center = this.position
        return mouse.sub(center).getAngle()
    }

    updateSprite() {
        this.sprite.x = this.position.x
        this.sprite.y = this.position.y
    }
}

class Bullet extends Entity {
    constructor(game, sprite, speed, delta, position) {
        super(game, sprite, position)
        this.position = new Vector(sprite.x, sprite.y)
        this.sprite.rotation = (this.bearing + 90) / 180 * Math.PI
        let angle = (this.bearing) / 180 * Math.PI
        this.velocity = new AngleVector(angle, speed*delta)
        this.friction = 0.01
    }

    update(delta) {
        this.applyFriction(delta)
        
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity, delta)
        this.acceleration.mult(new Vector(0, 0))
        // this.velocity.mult(new Vector(0, 0))

        this.updateSprite()
    }
}

class Player extends Entity {
    constructor(game, sprite, position) {
        super(game, sprite, position)
        this.friction = 0.02
    }

    update(delta) {
        // rotation
        this.sprite.rotation = (this.bearing + 90) / 180 * Math.PI 

        // movement
        this.applyFriction(delta)
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity, delta)
        this.acceleration.mult(new Vector(0,0))

        this.updateSprite()
    }

    boost(magnitude=0.6, delta=1) {
        let angle = (this.bearing) / 180 * Math.PI
        let direction = new AngleVector(angle, magnitude*delta)
        this.applyForce(direction)
    }

    shoot(speed=55, delta=1) {
        let graphics = new PIXI.Graphics()

        graphics.beginFill(0x00FF00)
        graphics.drawPolygon([
            0,-30,
            -5,0,
            5,0
        ])

        graphics.endFill()
        graphics.x = this.position.x
        graphics.y = this.position.y

        this.game.map.addChild(graphics)
        this.game.bullets.push(new Bullet(this.game, graphics, speed, delta))
    }
}

class Polygon extends PIXI.Graphics{
    constructor(points) {
        super()
        this.points = points
        this.convexHull = this.getConvexHull()
        this.triangles = this.getTriangles(this.convexHull)
        // Creates Graphics
        graphics.beginFill(0x00FFFF)
        this.drawPolygon(this.getListPositionValues())
        graphics.endFill()
    }

    getListPositionValues() {
        let values = []
        for (let point of this.points) {
            values.push(point.x)
            values.push(point.y)
        }
        return values
    }

    getTriangles() {
        return null
    }

    getConvexHull() {
        let currentPoint = this.findLeftMostPoint(this.points)
        let connections = []
        let originLine = Math.PI/2
        let count = 0
        while (True) {
            // print('Current Point:',currentPoint)
            connections.push(currentPoint)
            currentPoint,minAngle = this.getNextPoint(currentPoint,this.points,originLine)
            originLine -= minAngle
            if (currentPoint == connections[0] || count > 5) {
                break
            } else {
                count += 1
            }
        }
        return connections
    }

    getNextPoint(currentPoint,points,originLine) {
        let minAngle = null
        let minAnglePoint = null
        for (let point of points) {
		    if (point == currentPoint) {
                continue
            }
		    let angle = this.getAngleToPoint(currentPoint,point,originLine)
		    if (minAngle == null) {
			    minAnglePoint = point
			    minAngle = angle
            } else if (angle < minAngle) {
			    minAnglePoint = point
                minAngle = angle
            }
        }
        return [minAnglePoint,minAngle]
    }

    getAngleToPoint(currentPoint,checkPoint,originLine) {
        let X = checkPoint.x - currentPoint.x
        let Y = checkPoint.y - currentPoint.y
        let angle = Math.atan2(Y,X)
        angle = (originLine - angle)
        return angle
    }

    findLeftMostPoint(points) {
        let leftMost = points[0]
        for (let point of points) {
            if (point.x < leftMost.x) leftMost = point
        }
        return leftMost
    }
}
