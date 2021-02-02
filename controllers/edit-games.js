module.exports = {
    'GET /edit-game/:game_name': async (ctx, next) => {
        var name = ctx.params['game_name'];
        console.log(name);
        var teams = name.split('-');
        teams.forEach(function(part, index, this_arr) {
            this_arr[index] = part.replace('_', ' ');
        });
        
        console.log(teams);

        ctx.render('game-detail.html', {
            game_id: teams[0],
            home_team: teams[1],
            away_team: teams[2]
        });
    }
}