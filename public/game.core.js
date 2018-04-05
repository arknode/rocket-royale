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
                this.keyDown(e)
            })
            window.addEventListener('keyup', e => {
                this.keyboard[e.keyCode] = false
                this.keyUp(e)
            })

            this.camera = new PIXI.Container()
            this.camera.position.set(app.screen.width/2, app.screen.height/2)
            this.app.stage.addChild(this.camera)

            // this.app.stage.position.set(app.screen.width/2, app.screen.height/2)

            this.map = new Map(this, 100, 100)
            this.camera.addChild(this.map)
            this.player = this.createPlayer()
            this.bullets = []

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
        let localpos = this.app.renderer.plugins.interaction.mouse.getLocalPosition(this.map)
        return new Vector(localpos.x, localpos.y)
    }

    gameLoop(delta) {
        this.text.text = 'Position: ' + Math.floor(this.player.position.x / 100) + ', ' + Math.floor(this.player.position.y / 100)
        this.text.text += '\nFPS: ' + Math.round(this.app.ticker.FPS)
        this.text.text += '\nVelocity: ' +  Math.round((this.player.velocity.x ** 2 +  this.player.velocity.y ** 2) ** 0.5) + 'm/s'
        this.text.text += '\nBearing: ' + Math.round(this.player.bearing)

        this.text.position.set(10, 10)

        this.camera.pivot.copy(this.player.position)

        if (this.keyboard[32]) {
            this.player.boost()
        }

        for (let [index, bullet] of this.bullets.entries()) {
            bullet.update()
            if (Math.abs(bullet.velocity.x) < 0.1 && Math.abs(bullet.velocity.y) < 0.1) {
                this.map.removeChild(bullet.sprite)
                this.bullets.splice(index, 1)
            }
            
        }

        this.player.update(delta)

    }

    createPlayer() {
        let graphics = new PIXI.Graphics()

        graphics.beginFill(0x00FFFF)
        
        // graphics.drawPolygon([
        //     110,150,
        //     140,150,
        //     125,100
        // ])

        graphics.drawPolygon([
            0,-50,
            -15,0,
            0,-10,
            15,0
        ])
        graphics.endFill()

        graphics.pivot.y = (-25);

        graphics.x = Math.random() * this.map.width
        graphics.y = Math.random() * this.map.height

        this.map.addChild(graphics)

        let player = new Player(this, graphics)

        return player
    }

    keyDown(e) {
        if (e.keyCode === 87) {
            this.player.shoot()
        }
    }

    keyUp(e) {
        

    }
}