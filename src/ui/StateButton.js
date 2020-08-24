import Sprite from '../libs/Sprite';
import Field from '../components/Field';
class StateButton extends Sprite {
    constructor(state) {
        super();
        this.state = state;
        this.interactive = true;
        this.view = this.addView();
        this.text = this.addChild(new PIXI.Text(this.getText()));
        this.text.anchor.set(0.5);

        this.on("pointerdown", this.onPointerDown, this);
    }

    static WIDTH = 200;
    static HEIGHT = 75;

    addView() {
        const { WIDTH: w, HEIGHT: h } = StateButton;
        const graphics = this.addChild(new PIXI.Graphics())
            .beginFill(this.getColor())
            .drawRect(-w / 2, -h / 2, w, h)
            .endFill();

        return graphics;
    }

    updateView() {
        const { WIDTH: w, HEIGHT: h } = StateButton;
        const { view } = this;
        view.clear()
            .beginFill(this.getColor())
            .drawRect(-w / 2, -h / 2, w, h)
            .endFill();
        this.text.text = this.getText();
    }

    getText() {
        return `Mode: ${this.state === Field.BUILD_STATE ? "Build" : "FindPath"}`;
    }

    getColor() {
        return this.state === Field.BUILD_STATE ? 0x00b2ee : 0xffb2ee;
    }

    onPointerDown(e) {
        const { state } = this;
        this.state = state === Field.BUILD_STATE ? Field.PATHFIND_STATE : Field.BUILD_STATE;
        this.updateView();

        this.emit("switch-state", this.state);
    }
}

export default StateButton;