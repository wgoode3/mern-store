const mongoose = require("mongoose");
const Game = mongoose.model("Game");

class Games {
    getAll(req, res){
        Game.find({}, (err, games) => {
            if(err) { console.log(err) }
            res.json({status: "ok", games: games});
        });
    }
    create(req, res){
        let g = new Game(req.body);
        g.save( err => {
            if(err) {
                res.json({status: "ok", errors: err});
            } else {
                res.json({status: "ok"});
            }
        });
    }
    delete(req, res){
        Game.findOneAndDelete({_id: req.params._id}, err => {
            if(err) { console.log(err) }
            res.json({status: "ok"});
        });
    }
}

module.exports = new Games();