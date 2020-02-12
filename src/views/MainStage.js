import Sprite from '../libs/Sprite';
import LayoutManager from '../libs/LayoutManager';
import Field from '../components/Field';

class MainStage extends Sprite {
    constructor() {
        super();
        window.main = this;
        this.field = this.addChild(new Field());
    }

    onResize() {
        const w = LayoutManager.width, h = LayoutManager.height;

        if (w > h) {
        } else {

        }
        this.field && this.field.onResize(w, h);
    }

    tick(delta) {
    }
}

export default MainStage;