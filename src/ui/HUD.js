export default class HUD {
    constructor(game) {
        this.game = game;
    }

    draw(ctx) {
        const centerX = this.game.width / 2;

        // Score (Top Center)
        if (this.game.gameState !== "IDLE") {
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 24px Arial";
            ctx.textAlign = "center";
            ctx.fillText(`🏃 Score: ${Math.floor(this.game.score)}`, centerX, 40);

            ctx.textAlign = "right";
            ctx.fillStyle = this.game.aiGhosts.length > 0 ? "#fff" : "#22c55e";
            ctx.fillText(
                `👻 Ghosts: ${this.game.aiGhosts.length}`,
                this.game.width - 20,
                30
            );
        }

        ctx.textAlign = "center";

        // Reset alignment
        ctx.textAlign = "center";

        if (this.game.gameState === "IDLE") {
            ctx.font = "22px Arial";
            ctx.fillText("🚀 Tap or Press Space to Start", centerX, 200);
        }


        if (this.game.gameState === "GAME_OVER") {
            // 🔲 Dark overlay
            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            ctx.fillRect(0, 0, this.game.width, this.game.height);

            const centerY = this.game.height / 2;

            // 💀 Title
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 42px Arial";
            ctx.fillText("💀 Game Over", centerX, centerY - 40);

            const ghostCount = this.game.aiGhosts.length;

            // 🧠 Result message
            ctx.font = "24px Arial";

            if (this.game.result === "LOSE") {
                ctx.fillStyle = "#ff4d4d";
                ctx.fillText(
                    `🤖 ${ghostCount} Opponent${ghostCount > 1 ? "s" : ""} Survived`,
                    centerX,
                    centerY
                );
            } else if (this.game.result === "WIN"){
                ctx.fillStyle = "#22c55e";
                ctx.fillText("🏆 You are the last one standing!", centerX, centerY);
            }

            // 📊 Score
            ctx.fillStyle = "#ffffff";
            ctx.font = "20px Arial";
            ctx.fillText(
                `Final Score: ${Math.floor(this.game.score)}`,
                centerX,
                centerY + 40
            );

            // 🔁 Restart hint
            ctx.font = "18px Arial";
            ctx.fillStyle = "#cccccc";
            ctx.fillText(
                "Tap or Press Space to Restart",
                centerX,
                centerY + 80
            );
        }
    }
}