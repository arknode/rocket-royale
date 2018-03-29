// Shared core game class that runs on both client and server
// Initialisation for each mode is different.

class Game {
    constructor(options) {
        this.app = options.app
        
        this.isClient = options.client // Means this code is running on the client

        if (this.isClient) {
            this.keyboard = {}

            window.addEventListener('keydown', e => {
                this.keyboard[e.keyCode] = true
            })
            window.addEventListener('keyup', e => {
                this.keyboard[e.keyCode] = false
            })

            this.player = this.createPlayer()

            // todo
        } else {
            // todo
        }
    }

    gameLoop(delta) {
        this.player.vx = this.player.vy = 0

        if (this.keyboard[37]) this.player.vx = -1 // left
        if (this.keyboard[39]) this.player.vx = 1 // right
        if (this.keyboard[38]) this.player.vy = -1 // down
        if (this.keyboard[40]) this.player.vy = 1 // up

        this.player.x += this.player.vx
        this.player.y += this.player.vy
        this.player.rotation += 0.1
    }

    createPlayer() {
        let graphics = new PIXI.Graphics()
        graphics.beginFill(0x00FFFF)
        
        graphics.drawPolygon([
            110,150,
            140,150,
            125,100
        ])

        graphics.endFill()

        graphics.x = app.width / 2
        graphics.y = app.height / 2

        graphics.pivot.x = (110 + 140 + 125) / 3
        graphics.pivot.y = (150+150+100) / 3

        this.app.stage.addChild(graphics)
        return graphics
    }
}