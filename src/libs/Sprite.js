class Sprite extends PIXI.Sprite {
    constructor(texture) {
        super();
        this.anchor.set(0.5);
        this.setTexture(texture);
    }

    setTexture(texture) {
        if (texture === undefined) {
            this.texture = PIXI.Texture.EMPTY;
        } else {
            this.texture = PIXI.Texture.from(texture);
        }
    }

    static from(props) {
        const sp = super.from(props);
        sp.anchor.set(0.5);
        return sp;
    }
}

export default Sprite;