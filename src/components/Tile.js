import Sprite from "../libs/Sprite";
import Field from "../components/Field";

class Tile extends Sprite {
    constructor() {
        super();
        this.neighbours = {
            top: null,
            right: null,
            bottom: null,
            left: null
        }

        this.view = this.addView();
    }

    addView() {
        const { WIDTH: tw, HEIGHT: th } = Field.TILE;
        const graphics = new PIXI.Graphics()
            .beginFill(0x2d9500)
            .lineStyle(2, 0x000000)
            .drawRect(-tw / 2, -th / 2, tw, th)
            .endFill();
        this.addChild(graphics);
        return graphics;
    }
}

export default Tile;