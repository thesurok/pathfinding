import Field from "../components/Field";

export default class PathfindState extends PIXI.utils.EventEmitter {
    constructor(field) {
        super();
        this.field = field;
        this.type = Field.BUILD_STATE;
    }

    handlePointerDown(e) {
        const { row, col } = this.field.getRowCol(e);
        const tile = this.field.getTileAt(row, col);
        const { startTile, finishTile } = this.field;

        if (!startTile) {
            this.setStartTile(tile);
        } else {
            this.setFinishTile(tile);
        }

        tile.updateView();
    }

    setStartTile(tile) {
        if (tile !== this.field.finishTile) {
            tile.isStart = true;
            this.field.startTile = tile;
            tile.isBlocked = false;
            if (this.field.finishTile) {
                this.emit("toggle-pathfind-button", true);
            }
        }
    }

    setFinishTile(tile) {
        if (tile === this.field.startTile) {
            tile.isStart = false;
            this.field.startTile = null;
            this.emit("toggle-pathfind-button", false);
            return
        }

        if (!this.field.finishTile) {
            tile.isFinish = true;
            this.field.finishTile = tile;
            tile.isBlocked = false;
            this.emit("toggle-pathfind-button", true);
        } else if (this.field.finishTile === tile) {
            tile.isFinish = false;
            this.field.finishTile = null;
            this.emit("toggle-pathfind-button", false);
        }
    }
}