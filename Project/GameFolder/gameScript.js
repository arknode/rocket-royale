let application = PIXI.Application,
		loader = PIXI.loader,
		resources = PIXI.loader.resources,
		sprite = PIXI.Sprite;

let app = new PIXI.Application({
	width: 600, 
	height: 600,
	backgroundColor: 0x555555,
	antialias: true,
	interactive:true,
	transparent: false
});

loader
	.add("assets/car.svg")
	.load(setup);

document.body.appendChild(app.view)


let mousePosition;
let graphics = new PIXI.Graphics();
graphics.beginFill(0xFF0000);
graphics.drawCircle(50,50,50);
graphics.endFill();

graphics.beginFill(0x0000FF);
graphics.drawPolygon([new PIXI.Point(100,100),new PIXI.Point(200,200),new PIXI.Point(300,100)]);
graphics.endFill();
function setup() {
	mouseposition = app.renderer.plugins.interaction.mouse.global;
	app.stage.addChild(graphics);
}

function gameLoop(delta) {

}

setup();

