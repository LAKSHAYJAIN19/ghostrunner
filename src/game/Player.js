import { applyGravity } from "./Physics";

export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 40;
        this.height = 40;

        this.reset();
    }

    reset() {
        this.x = 100;
        this.y = this.game.height - 60;

        this.velocityY = 0;
        this.gravity = 1200;
        this.jumpForce = -500;

        this.isGrounded = true;
    }

    jump() {
        if (this.isGrounded) {
            this.velocityY = this.jumpForce;
            this.isGrounded = false;
        }
    }

    update(dt) {
        applyGravity(this, dt);

        const ground = this.game.height - 20;

        if (this.y + this.height >= ground) {
            this.y = ground - this.height;
            this.velocityY = 0;
            this.isGrounded = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#00ffcc";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}