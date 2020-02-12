import Game from "../Game.js"

class LayoutManager {
    constructor() {
        this.eventEmitter = new PIXI.utils.EventEmitter();

        this.width = 0;
        this.height = 0;

        this.gameWidth = 0;
        this.gameHeight = 0;

        this.aspectRatio = 0;
    }

    handleResize(w = window.innerWidth, h = window.innerHeight) {
        if (w === this.width && h === this.height) return;

        this.width = w;
        this.height = h;

        this.aspectRatio = Math.max(w / h, h / w);


        Game.app.renderer.resize(this.width, this.height);

        this.eventEmitter.emit("resize", { width: this.width, height: this.height });
    }

    on(e, cb, context) {
        this.eventEmitter.on(e, cb, context);
    }

    once(e, cb, context) {
        this.eventEmitter.once(e, cb, context);
    }

    off(e, cb, context) {
        this.eventEmitter.off(e, cb, context);
    }
}

export default new LayoutManager();