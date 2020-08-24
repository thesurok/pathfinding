import Field from "../components/Field";

export default class LabBuildState extends PIXI.utils.EventEmitter {
    constructor(field) {
        super();
        this.field = field;
        this.type = Field.BUILD_STATE;
    }

    handlePointerDown(e) {
        const { row, col } = this.field.getRowCol(e);
        const tile = this.field.getTileAt(row, col);
        if (tile.isStart) {
            tile.isStart = false;
            this.field.startTile = null;
            this.emit("toggle-pathfind-button", false);

        }
        if (tile.isFinish) {
            tile.isFinish = false;
            this.field.finishTile = null;
            this.emit("toggle-pathfind-button", false);

        }
        tile.isBlocked = !tile.isBlocked;
        tile.updateView();
    }
}