import GameEngine from "./game/GameEngine";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const game = new GameEngine(canvas);
game.start();