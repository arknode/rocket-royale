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

            this.camera = new PIXI.Container()
            this.camera.position.set(app.screen.width/2, app.screen.height/2)
            this.app.stage.addChild(this.camera)

            // this.app.stage.position.set(app.screen.width/2, app.screen.height/2)

            this.map = new Map(this, 15, 200)
            this.camera.addChild(this.map)
            this.player = this.createPlayer()

            this.text = new PIXI.Text('Position:')
            this.text.style.fill = 'white'
            this.app.stage.addChild(this.text) // hud

            
            // todo
        } else {
            // todo
        }

        let test = new Vector(32,16);
    }

    get mouseposition() {
        let mouse = this.app.renderer.plugins.interaction.mouse.global;
        return new Vector(mouse.x, mouse.y)
    }

    gameLoop(delta) {
        this.text.text = 'Position: ' + Math.floor(this.player.position.x / 100) + ', ' + Math.floor(this.player.position.y / 100)
        this.text.text += '\nFPS: ' + Math.round(this.app.ticker.FPS)

        this.text.position.set(10, 10)

        this.camera.pivot.copy(this.player.position)

        if (this.keyboard[32]) this.player.boost(delta)
        this.player.update(delta)
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

        graphics.pivot.x = (110 + 140 + 125) / 3 // centroid of the triangle
        graphics.pivot.y = (150 + 150 +100) / 3

        graphics.x = this.map.width / 2
        graphics.y = this.map.height / 2
        // graphics.cacheAsBitmap = true

        this.map.addChild(graphics)

        let player = new Player(this, graphics)

        return player
    }
}