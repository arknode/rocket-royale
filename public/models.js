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
                square.lineStyle(1, 0x1a2624, 1);
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
    constructor(width,length) {
        this.position = new Vector(0,0)
        this.velocity = new Vector(0,0)
        this.acceleration = new Vector(0,0)
        this.friction = 0
        this.bondingBox = this.getBoundingBox(width,length)
    }

    applyForce(vector) {
        this.acceleration.add(vector);
    }

    getBoundingBox(x,y,width,length) {

    }

    applyFriction() {
        let normal = this.velocity.copy().mult(new Vector(-1,-1))
        normal.setMag(this.friction)
        this.applyForce(normal)
    }

}

class Bullet extends Particle {
    constructor(game, sprite, speed) {
        super()
        this.position = new Vector(sprite.x, sprite.y)
        this.game = game
        this.sprite = sprite
        this.sprite.rotation = (this.bearing + 90) / 180 * Math.PI
        let angle = (this.bearing) / 180 * Math.PI
        this.velocity = new AngleVector(angle, speed)
        this.friction = 0.01
    }

    update(delta) {
        this.applyFriction()
        
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
        // this.velocity.mult(new Vector(delta, delta))
        this.acceleration.mult(new Vector(0, 0))

        this.updateSprite()
    }

    updateSprite() {
        this.sprite.x = this.position.x
        this.sprite.y = this.position.y
    }

    get bearing() {
        let mouse = this.game.mouseposition
        let center = this.position
        return mouse.sub(center).getAngle()
    }
}

class Player extends Particle {
    constructor(game, sprite) {
        super()
        this.position = new Vector(sprite.x, sprite.y)
        this.game = game
        this.app = game.app
        this.sprite = sprite
        this.friction = 0.02
    }

    update(delta) {
        // rotation
        this.sprite.rotation = (this.bearing + 90) / 180 * Math.PI 

        // movement
        this.applyFriction()
        this.acceleration.mult(new Vector(delta, delta)) // time delta
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
        this.acceleration.mult(new Vector(0,0))

        this.updateSprite()
    }

    updateSprite() {
        this.sprite.x = this.position.x
        this.sprite.y = this.position.y
    }

    boost(magnitude=0.6) {
        let angle = (this.bearing) / 180 * Math.PI
        let direction = new AngleVector(angle, magnitude)
        this.applyForce(direction)
    }

    shoot(speed=55) {
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
        this.game.bullets.push(new Bullet(this.game, graphics, speed))
    }

    get bearing() {
        let mouse = this.game.mouseposition
        let center = this.position
        return mouse.sub(center).getAngle()
    }
}