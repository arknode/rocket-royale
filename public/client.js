const app = new PIXI.Application({
    width: window.innerWidth, 
    height: window.innerHeight,
    antialias: true,
    interactive:true,
    transparent: false,
    forceCanvas: true,
});



document.body.appendChild(app.view)

game = new Game({
    app: app,
    client: true
})

let scale = 1

window.onwheel = event => { // prevent scrolling
    event.preventDefault()
    if (scale - event.deltaY / 200 > 0.4) { // zooming stuff
        scale -= event.deltaY / 200
        game.camera.scale.set(scale, scale)
    }
}

app.ticker.add(delta => game.gameLoop(delta))

