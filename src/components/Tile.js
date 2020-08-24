import Sprite from "../libs/Sprite";
import Field from "../components/Field";

class Tile extends Sprite {
    constructor() {
        super();
        this.isStart = false;
        this.isFinish = false;
        this.isBlocked = false;
        this.isVisited = false;

        this.prevNode = null;

        this.neighbours = {
            top: null,
            right: null,
            bottom: null,
            left: null
        }

        this.view = this.addView();
    }

    static WIDTH = 50;
    static HEIGHT = 50;

    static FINISH_COLOR = 0x2d9500;
    static START_COLOR = 0xa5a5a5;
    static DEFAULT_COLOR = 0xf9f9f9;
    static BLOCKED_COLOR = 0x110011;

    addView() {
        const { WIDTH: tw, HEIGHT: th } = Tile;
        const graphics = new PIXI.Graphics()
            .beginFill(Tile.DEFAULT_COLOR)
            .lineStyle(2, 0x000000)
            .drawRect(-tw / 2, -th / 2, tw, th)
            .endFill();
        this.addChild(graphics);
        return graphics;
    }

    updateView() {
        let color;
        if (this.isStart) {
            color = Tile.START_COLOR;
        } else if (this.isFinish) {
            color = Tile.FINISH_COLOR;
        } else {
            color = this.isBlocked ? Tile.BLOCKED_COLOR : Tile.DEFAULT_COLOR;
        }
        const { WIDTH: tw, HEIGHT: th } = Tile;
        this.view.clear()
            .beginFill(color)
            .lineStyle(2, 0x000000)
            .drawRect(-tw / 2, -th / 2, tw, th)
            .endFill();
    }
}

export default Tile;