const Server = require("boardgame.io/server").Server;
const unoGame = require("./server/game/game").unoGame;

const server = Server({ games: [unoGame] });
const PORT = process.env.PORT || 8000;

server.run(PORT, () => console.log("dev server running at: PORT"));
