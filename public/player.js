class Player {
	constructor(game, sprite) {
		this.game = game
		this.sprite = sprite
		this.position = new Vector(this.sprite.x, this.sprite.y)
		this.velocity = new Vector(0, 0)
		this.acceleration = new Vector(0, 0)
	}

	update() {
		this.velocity.add(this.acceleration)
		this.position.add(this.velocity)
		this.acceleration.mult(new Vector(0,0))
		this.sprite.rotation = (this.bearing + 90) / 180 * Math.PI ;
		this.updateSprite()
	}

	applyForce(vector) {
		this.acceleration.add(vector);
	}

	updateSprite() {
		this.sprite.x = this.position.x
		this.sprite.y = this.position.y
	}

	boost() {
		let angle = (this.bearing) / 180 * Math.PI
		let magnitude = 0.1;
		let direction = new AngleVector(angle,magnitude);
		this.applyForce(direction)
	}

	get bearing() {
		let mouse = this.game.mouseposition
		mouse.sub(this.position)
		return mouse.getAngle()
	}
}