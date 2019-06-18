const Games = require("../controllers/games");

module.exports = (app) => {
    app.get("/api/games", Games.getAll);
    app.post("/api/games", Games.create);
    app.delete("/api/games/:_id", Games.delete);
}