export default class LabBuildState {
    constructor(field) {
        this.field = field;
    }

    handlePointerDown(e) {
        const { row, col } = this.field.getRowCol(e);
        const tile = this.field.getTileAt(row, col);
        console.log(tile.neighbours);
    }
}