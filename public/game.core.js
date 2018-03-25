// Shared core game class that runs on both client and server
// Initialisation for each mode is different.

class Game {
	constructor(options) {
        this.app = options.app
        this.isClient = options.client // Means this code is running on the client
        if (this.isClient) {
            this.socket = io()
            this.mainPlayer = this.createPlayer()
            // todo
        } else {
            // todo
        }
	}

	gameLoop(delta) {
		this.mainPlayer.x += 2
	}

	createPlayer() {
        let graphics = new PIXI.Graphics()
        graphics.beginFill(0x00FFFF)
        graphics.drawPolygon([
            100,100,
            120,150,
            140,100
		])
		graphics.endFill()
		this.app.stage.addChild(graphics)
        return graphics
	}
}
