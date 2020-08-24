import Sprite from '../libs/Sprite';
import LabBuildState from '../states/LabBuildState';
import Tile from "../components/Tile";

class Field extends Sprite {
    constructor() {
        super();
        this.currentPos = new PIXI.Point();
        this.state = new LabBuildState(this);

        this.tiles = this.buildField();
        this.plate = this.addInteractivePlate();

        this.initGraphs();
        this.initListeners();
    }

    static WIDTH = 16;
    static HEIGHT = 10;
    static TILE = {
        WIDTH: 50,
        HEIGHT: 50
    }


    addInteractivePlate() {
        const { WIDTH: fw, HEIGHT: fh } = Field;
        const { WIDTH: tw, HEIGHT: th } = Field.TILE;
        const rect = new PIXI.Graphics()
            .beginFill(0xff0000, 1)
            .drawRect(-0.5, -0.5, 1, 1)
            .endFill();

        const renderer = PIXI.autoDetectRenderer();
        const texture = renderer.generateTexture(rect);

        const plate = this.addChild(Sprite.from(texture));
        plate.interactive = true;
        plate.scale.set(fw * tw, fh * th);

        return plate;
    }

    buildField() {
        const { WIDTH: fw, HEIGHT: fh } = Field;
        const { WIDTH: tw, HEIGHT: th } = Field.TILE;
        const tiles = [];
        for (let y = 0; y < fh; y++) {
            for (let x = 0; x < fw; x++) {
                const tile = new Tile();
                this.addChild(tile);
                tile.x = -fw / 2 * tw + tw * x + tw / 2;
                tile.y = -fh / 2 * th + th * y + th / 2;

                tiles.push(tile);
                const txt = tile.addChild(new PIXI.Text(`x:${x} y:${y}`, { fontSize: 12 }));
                txt.anchor.set(0.5);
            }
        }
        return tiles;
    }

    initGraphs() {
        const { WIDTH: fw, HEIGHT: fh } = Field;

        for (let y = 0; y < fh; y++) {
            for (let x = 0; x < fw; x++) {
                const tile = this.getTileAt(y, x);
                tile.neighbours.top = y <= 0 ? null : this.getTileAt(y - 1, x);
                tile.neighbours.right = x >= fw - 1 ? null : this.getTileAt(y, x + 1);
                tile.neighbours.bottom = y >= fh - 1 ? null : this.getTileAt(y + 1, x);
                tile.neighbours.left = x <= 0 ? null : this.getTileAt(y, x - 1);
            }
        }
    }

    initListeners() {
        this.plate.interactive = true;
        this.plate.on("pointerdown", this.onPointerDown, this);
    }

    onPointerDown(e) {
        this.state.handlePointerDown(e);
    }

    getRowCol(e) {
        const point = e.data.getLocalPosition(this.plate);
        const normalizedPoint = { x: point.x + 0.5, y: point.y + 0.5 };

        const col = (Math.floor(normalizedPoint.x * Field.WIDTH));
        const row = (Math.floor(normalizedPoint.y * Field.HEIGHT));
        return { row, col };
    }

    getTileAt(row, col) {
        return this.tiles[col + (row * Field.WIDTH)];
    }

    onResize(w, h) {
    }
}

export default Field;