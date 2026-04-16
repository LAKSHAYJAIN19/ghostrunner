import Player from "../game/Player";

export default class AIGhostPlayer extends Player {
    constructor(game) {
        super(game);

        // AI tuning
        this.reactionDistance = 120; // when to detect obstacle
        this.mistakeChance = 0.2; // 20% chance to fail
        this.speedMultiplier = 0.9 + Math.random() * 0.3; // 0.9x – 1.2x

        this.alpha = 0.4 + Math.random() * 0.4;
        this.color = "rgba(59, 130, 246, 0.7)";
    }

    update(dt) {
        // Move forward (simulate speed variation)
        // Keep ghost near player (camera lock feel)
        const minX = this.game.player.x - 120;
        const maxX = this.game.player.x + 80;

        // If too far behind → boost
        if (this.x < minX) {
            this.x += 200 * dt; // catch-up speed
        }

        // If too far ahead → slow down
        if (this.x > maxX) {
            this.x -= 100 * dt;
        }

        // Find nearest obstacle
        const obstacle = this.getNearestObstacle();

        if (obstacle) {
            const distance = obstacle.x - this.x;

            // If obstacle is close → decide to jump
            if (distance > 0 && distance < this.reactionDistance) {
                if (this.isGrounded) {
                    // Random failure
                    if (Math.random() > this.mistakeChance) {
                        this.jump();
                    }
                }
            }
        }

        super.update(dt);
    }

    getNearestObstacle() {
        return this.game.obstacles.obstacles.find(
            (obs) => obs.x + obs.width > this.x
        );
    }

    draw(ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1;
    }
}