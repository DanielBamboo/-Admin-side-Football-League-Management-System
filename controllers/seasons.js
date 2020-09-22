const { Season } = require('../tables');

const Club = require('../tables').Club;
const Game = require('../tables').Game;

module.exports = {
    'GET /seasons': async (ctx, next) => {
        if(!ctx.session.user) {
            ctx.response.redirect('/signin');
        }
        ctx.render('seasons.html', {});
    },

    'POST /create-new-season': async (ctx, next) => {
        console.log(JSON.stringify(ctx.request.body));
        var data = ctx.request.body;

        var season_name = data.season_name;
        var league_name = season_name.split('/')[0];
        league_name = league_name.substring(0, league_name.length - 5);
        // console.log(league_name + '<<');
        var season_period = season_name.substring(season_name.length-9, season_name.length);
        console.log(season_period);

        var clubs = await Club.findAll({
            where: {
                league: league_name
            }
        });

        var club_names = clubs.map(function(club) {
            return club.club_name;
        });

        console.log(club_names);

        console.log('POST /create-new-season: ' +  data.begin_date + '  -  ' + data.end_date);

        var matchday_and_games = require('../static/js/getShuffleGames')(club_names, data.begin_date, data.end_date);
        console.log(matchday_and_games);

        for(var club of clubs) {
            console.log(JSON.stringify(club));
        }

        for(var mag of matchday_and_games) {
            var insert_data = {
                season: season_name,
                league: league_name,
                turn: mag.turn,
                matchday: mag.matchday,
                home_team: mag.home_team,
                away_team: mag.away_team,
                home_team_goal: null,
                away_team_goal: null,
                game_result: null
            }

            // 这里要试下查错机制
            var res = await Game.create(
                insert_data,
                {
                    fields: [
                        'season',
                        'league',
                        'turn',
                        'matchday',
                        'home_team',
                        'away_team',
                        'home_team_goal',
                        'away_team_goal',
                        'game_result'
                    ]
                }
            );

            console.log('>>' + JSON.stringify(res));
        }

        Season.update({
            start: true
        }, {
            where: {
                season_name: season_name
            }
        });


        ctx.response.type = 'application/json';
        ctx.response.body = {
            done: 'done'
        };

    }
}