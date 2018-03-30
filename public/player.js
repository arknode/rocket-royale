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

class Player extends Particle{
	constructor(game, sprite) {
        super()
        this.game = game
        this.app = game.app
		this.sprite = sprite
		this.position = new Vector(this.sprite.x, this.sprite.y)
		this.velocity = new Vector(0, 0)
		this.acceleration = new Vector(0, 0)
	}

	update(delta) {
        this.velocity.mult(new Vector(0.98, 0.98)) // Friction
        this.acceleration.mult(new Vector(delta, delta)) // time delta
        this.velocity.add(this.acceleration)
		this.position.add(this.velocity)
        this.acceleration.mult(new Vector(0,0))
		this.sprite.rotation = (this.bearing + 90) / 180 * Math.PI ;
		this.updateSprite()
	}

	updateSprite() {
		this.sprite.x = this.position.x
		this.sprite.y = this.position.y
	}

    applyFriction() {
        
    }

	boost(delta) {
		let angle = (this.bearing) / 180 * Math.PI
		let magnitude = 0.6;
		let direction = new AngleVector(angle, magnitude)
		this.applyForce(direction)
	}

	get bearing() {
        let mouse = this.game.mouseposition
        let center = new Vector(this.app.screen.width/2, this.app.screen.height/2)
		return mouse.sub(center).getAngle()
	}
}