import GameEngine from "./game/GameEngine";

const canvas = document.createElement("canvas");

// ✅ Center canvas using flexbox
document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.background = "#0f172a"; // dark background looks better

document.body.appendChild(canvas);

const game = new GameEngine(canvas);
game.start();