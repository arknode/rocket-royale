// Shared core game class that runs on both client and server
// Initialisation for each mode is different.

class Game {
    constructor(options) {
        options.client ? this.clientInit(options) : this.serverInit(options)
    }

    serverInit(options) {
        this.server = options.server
        this.players = options.player
        this.started = false
        setInterval(this.physicsLoop, 16)
    }

    clientInit(options) {
        this.app = options.app
        this.io = io()

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

        // Adding test triangle
        let graphics = new PIXI.Graphics()
        graphics.beginFill(0x00FFFF)
        graphics.drawPolygon([
            0,-50,
            -15,0,
            0,-10,
            15,0
        ])
        console.log(graphics)
        graphics.endFill()
        let position = new Vector(0,0)
        this.testTriangle = new Entity(this,graphics,position)
        this.map.addChild(graphics)

        //End test
        this.hudText = new PIXI.Text('Position:')
        this.hudText.style.fill = 'white'
        this.app.stage.addChild(this.hudText) // hud
        
    }

    get mouseposition() {
        let localpos = this.app.renderer.plugins.interaction.mouse.getLocalPosition(this.map)
        return new Vector(localpos.x, localpos.y)
    }

    serverPhysicsLoop() {
        
    }

    gameLoop(delta) {
        this.hudText.text = 'Position: ' + Math.floor(this.player.position.x / 100) + ', ' + Math.floor(this.player.position.y / 100)
        this.hudText.text += '\nFPS: ' + Math.round(this.app.ticker.FPS)
        this.hudText.text += '\nVelocity: ' +  Math.round(this.player.speed) + 'm/s'
        this.hudText.text += '\nBearing: ' + Math.round(this.player.bearing)
        this.hudText.text += "\nDelta: " + delta 
        this.hudText.position.set(10, 10)

        if (this.app.ticker.FPS > 55) {
            this.camera.pivot.copy(this.player.position)
        }

        if (this.keyboard[87]) {
            this.player.shoot(55, delta)
        }

        if (this.keyboard[32]) {
            this.player.boost(0.6, delta)
        }

        for (let [index, bullet] of this.bullets.entries()) {
            bullet.update()
            if (Math.abs(bullet.velocity.x) < 0.1 && Math.abs(bullet.velocity.y) < 0.1) {
                this.map.removeChild(bullet.sprite)
                this.bullets.splice(index, 1)
            }
            
        }

        this.player.update(delta)

        if (this.app.ticker.FPS < 55) {
            this.camera.pivot.copy(this.player.position)
        }
        

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
        this.map.addChild(graphics)
        let position = new Vector(Math.random() * this.map.width,Math.random() * this.map.height)
        let player = new Player(this, graphics,position)

        return player
    }

    keyDown(e) {
        
    }

    keyUp(e) {
        

    }
}