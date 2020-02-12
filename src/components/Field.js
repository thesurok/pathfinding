import Sprite from '../libs/Sprite';
import LabBuildState from '../states/LabBuildState';

class Field extends Sprite {
    constructor() {
        super();
        this.fieldWidth = 16;
        this.fieldHeight = 16;

        this.tileWidth = 50;
        this.tileHeight = 50;
        this.tiles = [];
        this.currentPos = new PIXI.Point();

        this.state = new LabBuildState();

        this.init();
        this.initListeners();
    }

    init() {
        this.buildField();
        this.addInteractivePlate();
    }

    addInteractivePlate() {
        const rect = new PIXI.Graphics()
            .beginFill(0xff0000)
            .drawRect(-0.5, -0.5, 1, 1)
            .endFill();

        const renderer = PIXI.autoDetectRenderer();
        const texture = renderer.generateTexture(rect);

        this.plate = this.addChild(new Sprite());
        this.plate.texture = texture;
        this.plate.interactive = true;
        this.plate.alpha = 0.5;
    }

    buildField() {
        for (let y = 0; y < this.fieldHeight; y++) {
            for (let x = 0; x < this.fieldWidth; x++) {
                const tile = new PIXI.Graphics()
                    .beginFill(0x2d9500)
                    .lineStyle(2, 0x000000)
                    .drawRect(-this.tileWidth / 2, -this.tileHeight / 2, this.tileWidth, this.tileHeight)
                    .endFill();

                this.addChild(tile);
                tile.x = -this.fieldWidth / 2 * this.tileWidth + this.tileWidth * x + this.tileWidth / 2;
                tile.y = -this.fieldHeight / 2 * this.tileHeight + this.tileHeight * y + this.tileHeight / 2;

                this.tiles.push(tile);
                const txt = tile.addChild(new PIXI.Text(`x:${x} y:${y}`, { fontSize: 12 }));
                txt.anchor.set(0.5);
            }
        }
    }

    initListeners() {
        this.plate.interactive = true;
        this.plate.on("pointerdown", this.onPointerDown, this);
    }

    onPointerDown(e) {
        const point = e.data.getLocalPosition(this.plate);
        const normalizedPoint = { x: point.x + 0.5, y: point.y + 0.5 };

        const col = (Math.floor(normalizedPoint.x * this.fieldWidth));
        const row = (Math.floor(normalizedPoint.y * this.fieldHeight));

        const tile = this.getTileAt(row, col);
        this.state.handlePointerDown(e);
        // tile.clear();
        // tile.beginFill(0xff0000);
        // tile.drawRect(-this.tileWidth / 2, - this.tileHeight / 2, this.tileWidth, this.tileHeight)
        // tile.endFill();
    }

    getTileAt(row, col) {
        return this.tiles[col + (row * this.fieldWidth)];
    }

    onResize(w, h) {
        this.plate.scale.set(this.fieldWidth * this.tileWidth / this.plate.width, this.fieldHeight * this.tileHeight / this.plate.height);
    }
}

export default Field;