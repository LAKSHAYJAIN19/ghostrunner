import Player from "../game/Player";

export default class GhostPlayer extends Player {
    constructor(game, records) {
        super(game);

        this.records = records || [];
        this.currentIndex = 0;
        this.elapsedTime = 0;

        this.color = "rgba(0, 0, 255, 0.7)";
    }

    update(dt) {
        this.elapsedTime += dt;

        // Play recorded actions
        while (
            this.currentIndex < this.records.length &&
            this.records[this.currentIndex].time <= this.elapsedTime
            ) {
            const action = this.records[this.currentIndex].action;

            if (action === "jump") {
                super.jump();
            }

            this.currentIndex++;
        }

        super.update(dt);
    }

    draw(ctx) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.globalAlpha = this.alpha || 0.5;
        ctx.strokeStyle = "blue";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}