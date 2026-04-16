export default class ObstacleManager {
    constructor(game) {
        this.game = game;
        this.obstacles = [];
        this.spawnTimer = 0;
        this.spawnInterval = 1.5;
        this.speed = 300;
    }

    reset() {
        this.obstacles = [];
        this.spawnTimer = 0;
    }

    spawn() {
        // Max jump height calculation (approx safe value)
        const maxHeight = 60; // safe jumpable height

        const height = 30 + Math.random() * maxHeight;

        this.obstacles.push({
            x: this.game.width,
            y: this.game.height - 20 - height,
            width: 30,
            height: height,
        });
    }

    update(dt) {
        this.spawnTimer += dt;

        if (this.spawnTimer > this.spawnInterval) {
            this.spawn();
            this.spawnTimer = 0;
            this.spawnInterval = 1 + Math.random() * 1.2;
        }

        this.obstacles.forEach((obs) => {
            obs.x -= this.speed * dt;
        });

        this.obstacles = this.obstacles.filter((obs) => obs.x + obs.width > 0);
    }

    draw(ctx) {
        ctx.fillStyle = "#ff4d4d";
        this.obstacles.forEach((obs) => {
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        });
    }

    checkCollision(player) {
        return this.obstacles.some((obs) => {
            return (
                player.x < obs.x + obs.width &&
                player.x + player.width > obs.x &&
                player.y < obs.y + obs.height &&
                player.y + player.height > obs.y
            );
        });
    }
}