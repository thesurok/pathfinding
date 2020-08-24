class Sprite extends PIXI.Sprite {
    constructor() {
        super();
        this.anchor.set(0.5);
    }

    static from(props) {
        const sp = super.from(props);
        sp.anchor.set(0.5);
        return sp;
    }
}

export default Sprite;