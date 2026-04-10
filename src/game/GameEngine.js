import Player from "./Player";
import ObstacleManager from "./ObstacleManager";
import HUD from "../ui/HUD";

export default class GameEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.width = 800;
        this.height = 400;

        this.lastTime = 0;
        this.gameState = "IDLE"; // IDLE, RUNNING, GAME_OVER
        this.score = 0;

        this.resize();
        window.addEventListener("resize", () => this.resize());

        this.player = new Player(this);
        this.obstacles = new ObstacleManager(this);
        this.hud = new HUD(this);

        this.setupControls();
    }

    resize() {
        const scale = Math.min(
            window.innerWidth / this.width,
            window.innerHeight / this.height
        );

        this.canvas.width = this.width * devicePixelRatio;
        this.canvas.height = this.height * devicePixelRatio;

        this.canvas.style.width = `${this.width * scale}px`;
        this.canvas.style.height = `${this.height * scale}px`;

        this.ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    setupControls() {
        const jumpHandler = () => {
            if (this.gameState === "IDLE") {
                this.startGame();
            } else if (this.gameState === "RUNNING") {
                this.player.jump();
            } else if (this.gameState === "GAME_OVER") {
                this.restart();
            }
        };

        window.addEventListener("keydown", (e) => {
            if (e.code === "Space") jumpHandler();
        });

        window.addEventListener("touchstart", jumpHandler);
    }

    startGame() {
        this.gameState = "RUNNING";
        this.score = 0;
    }

    restart() {
        this.player.reset();
        this.obstacles.reset();
        this.score = 0;
        this.gameState = "RUNNING";
    }

    start() {
        requestAnimationFrame((time) => this.loop(time));
    }

    loop(time) {
        const deltaTime = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        if (this.gameState !== "RUNNING") return;

        this.player.update(dt);
        this.obstacles.update(dt);

        if (this.obstacles.checkCollision(this.player)) {
            this.gameState = "GAME_OVER";
        }

        this.score += dt * 10;
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Ground
        this.ctx.fillStyle = "#333";
        this.ctx.fillRect(0, this.height - 20, this.width, 20);

        this.player.draw(this.ctx);
        this.obstacles.draw(this.ctx);
        this.hud.draw(this.ctx);
    }
}