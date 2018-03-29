const app = new PIXI.Application({
    width: window.innerWidth, 
    height: window.innerHeight,
    antialias: true,
    interactive:true,
    transparent: false,
    forceCanvas: false,
});

window.onwheel = event => { // prevent scrolling
    event.preventDefault()
}

document.body.appendChild(app.view)

game = new Game({
    app: app,
    client: true
})

app.ticker.add(delta => game.gameLoop(delta))

