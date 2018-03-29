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

        let test = new Vector(32,16);
    }

    get mouseposition() {
        let mouse = this.app.renderer.plugins.interaction.mouse.global;
        let vector = new Vector(mouse.x, mouse.y)
        return vector
    }

    gameLoop(delta) {
        if (this.keyboard[32]) this.player.boost()
        this.player.update()
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

        graphics.pivot.x = (110 + 140 + 125) / 3
        graphics.pivot.y = (150+150+100) / 3
        graphics.x = 100
        graphics.y = 100

        this.app.stage.addChild(graphics)
        let player = new Player(this, graphics)

        return player
    }
}