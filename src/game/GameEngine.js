import Player from "./Player";
import ObstacleManager from "./ObstacleManager";
import GhostRecorder from "../ghost/GhostRecorder";
import AIGhostPlayer from "../ghost/AIGhostPlayer";
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

        this.recorder = new GhostRecorder(this);
        this.aiGhosts = [];
        this.ghostCount = 5;

        const saved = localStorage.getItem("ghostRuns");
        if (saved) {
            this.ghostRuns = JSON.parse(saved);
        }
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

                // ✅ RECORD INPUT
                this.recorder.record("jump");
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

        this.aiGhosts = [];

        for (let i = 0; i < this.ghostCount; i++) {
            const ghost = new AIGhostPlayer(this);

            // Slight starting offset (so they don't overlap)
            ghost.x -= (i + 1) * 25;

            // Add variation
            ghost.speedMultiplier = 0.95 + Math.random() * 0.2; // 0.95 → 1.15
            ghost.mistakeChance = 0.1 + Math.random() * 0.3;    // 10% - 40%
            ghost.reactionDistance = 100 + Math.random() * 80;

            this.aiGhosts.push(ghost);
        }
    }

    restart() {
        this.player.reset();
        this.obstacles.reset();
        this.score = 0;

        this.startGame();
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

        this.aiGhosts.forEach((ghost) => ghost.update(dt));

        const playerDead = this.obstacles.checkCollision(this.player);

        // Check each ghost
        this.aiGhosts = this.aiGhosts.filter((ghost) => {
            const dead = this.obstacles.checkCollision(ghost);
            return !dead; // remove dead ghosts
        });

        // Lose condition
        if (playerDead) {
            this.gameState = "GAME_OVER";
            this.result = "LOSE";
            return;
        }

        // Win condition (all ghosts dead)
        if (this.aiGhosts.length === 0) {
            this.gameState = "GAME_OVER";
            this.result = "WIN";
            return;
        }

        this.score += dt * 10;
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Ground
        this.ctx.fillStyle = "#222";
        this.ctx.fillRect(0, this.height - 20, this.width, 20);

        this.aiGhosts.forEach((ghost) => {
            ghost.x = Math.max(0, Math.min(this.width, ghost.x));
        });
        this.aiGhosts.forEach((ghost) => ghost.draw(this.ctx));
        this.player.draw(this.ctx);
        this.obstacles.draw(this.ctx);
        this.hud.draw(this.ctx);

    }
}