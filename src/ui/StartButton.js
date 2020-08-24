import Sprite from '../libs/Sprite';
class StartButton extends Sprite {
    constructor(state) {
        super();
        this.state = state;
        this.interactive = true;
        this.view = this.addView();
        this.text = this.addChild(new PIXI.Text("START", { fill: "white" }));
        this.text.anchor.set(0.5);

        this.on("pointerdown", this.onPointerDown, this);
    }

    static RADIUS = 50;

    addView() {
        const graphics = this.addChild(new PIXI.Graphics())
            .beginFill(0x00df00)
            .drawCircle(0, 0, StartButton.RADIUS)
            .endFill();

        return graphics;
    }

    onPointerDown(e) {
        this.emit("start");
    }
}

export default StartButton;