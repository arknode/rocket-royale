const app = new PIXI.Application({
    width: 600, 
    height: 600,
    antialias: true,
    interactive:true,
    transparent: false,
    forceCanvas: false,
});

document.body.appendChild(app.view)

game = new Game({
    app: app,
    client: true
})

app.ticker.add(delta => game.gameLoop(delta))

