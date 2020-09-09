import Sprite from '../libs/Sprite';
import LayoutManager from '../libs/LayoutManager';
import Field from '../components/Field';
import StateButton from '../ui/StateButton';
import StartButton from '../ui/StartButton';

class MainStage extends Sprite {
    constructor() {
        super();
        window.main = this;

        this.field = this.addChild(new Field());
        this.stateButton = this.addChild(new StateButton(this.field.state.type));
        this.startButton = this.addChild(new StartButton());
        this.startButton.visible = false;

        this.initListeners();
    }

    initListeners() {
        this.stateButton.on("switch-state", this.handleSwitchState, this);
        this.field.pathfindState.on("toggle-pathfind-button", this.togglePathfindButton, this);
        this.field.labBuildState.on("toggle-pathfind-button", this.togglePathfindButton, this);
        this.startButton.on("start", this.findPath, this);
    }

    togglePathfindButton(visible) {
        this.startButton.visible = visible;
    }

    handleSwitchState(state) {
        const { field } = this;
        field.setState(state === Field.BUILD_STATE ? field.labBuildState : field.pathfindState);
    }

    findPath() {
        const finish = this.field.findPathBFS();
        this.field.visualizePath(finish);
    }

    onResize() {
        const w = LayoutManager.width, h = LayoutManager.height;

        if (w > h) {
            this.field.scale.set(w / this.field.size.width * 0.75);
            this.field.position.set(w / 2 - this.field.size.width / 2 * this.field.scale.x - 10, 0);

            this.stateButton.position.set(-w / 2 + StateButton.WIDTH / 2 + 20, h * 0.5 - StateButton.HEIGHT / 2 - 20);
            this.startButton.position.set(-w / 2 + StartButton.RADIUS + 20, 0);
        } else {
            this.field.scale.set(w / this.field.size.width * 0.95);
            this.field.position.set(0);

            this.stateButton.position.set(0, h * 0.5 - StateButton.HEIGHT / 2 - 20);
            this.startButton.position.set(-w / 2 + StartButton.RADIUS + 20, h / 2 - StartButton.RADIUS - 20);

        }
        this.field && this.field.onResize(w, h);
    }

    tick(delta) {
    }
}

export default MainStage;