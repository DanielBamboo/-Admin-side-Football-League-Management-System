const Game = require('../tables').Game;

module.exports = {
    'GET /games': async(ctx, next) => {
        if(!ctx.session.user) {
            ctx.response.redirect('/signin');
        }
        ctx.render('games.html', {});
    },
    'GET /fetch/games': async(ctx, next) => {
        var games = await Game.findAll({});
        var res = await Game.aggregate('turn', 'max', {
        });

        console.log(res);
        ctx.response.type = 'application/json';
        ctx.response.body = {
            games: games,
            turns: res
        };
    }
}