export default class HUD {
    constructor(game) {
        this.game = game;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";

        if (this.game.gameState === "IDLE") {
            ctx.fillText("Tap or Press Space to Start", 250, 200);
        }

        if (this.game.gameState === "RUNNING") {
            ctx.fillText(`Score: ${Math.floor(this.game.score)}`, 20, 30);
        }

        if (this.game.gameState === "GAME_OVER") {
            ctx.fillText("Game Over", 330, 180);
            ctx.fillText("Tap or Press Space to Restart", 230, 220);
        }
    }
}