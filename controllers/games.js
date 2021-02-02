const tables = require('../tables');
const Game = tables.Game;
const Game_record = tables.Game_record;
const Player = tables.Player;
const Player_record = tables.Player_record;
const Club_record = tables.Club_record;
const Club = tables.Club;
const Op = tables.Op;

async function getPlayerRecordsAndUpdateGames(game_ids) {
    var player_records = {};
    for (var i = 0; i < game_ids.length; i++) {
        console.log('getPlayerRecordsAndUpdateGames() deal with game_id: ' + game_ids[i]);
        var element = game_ids[i];
        var game_records_in_this_id = await Game_record.findAll({
            include: [
                {
                    model: Player,
                    require: true
                },
                {
                    model: Game,
                    require: true
                }
            ],
            where: {
                game_id: element
            }
        });

        console.log('game_records_in_this_id');
        console.log(game_records_in_this_id);
        var home_and_away_team = await Game.findAll({
            attributes: ['home_team', 'away_team'],
            where: {
                id: element
            }
        });
        console.log('home-and-away-team' + JSON.stringify(home_and_away_team));

        var home_team = home_and_away_team[0].home_team;
        var away_team = home_and_away_team[0].away_team;

        console.log(game_records_in_this_id);

        var home_team_goal = 0, away_team_goal = 0;
        game_records_in_this_id.forEach((game_record) => {
            if (game_record.event == 0) {
                //更新player_records用到的
                if (player_records[game_record.player_id] == undefined) {
                    player_records[game_record.player_id] = {};
                }

                if (player_records[game_record.player_id][game_record.game.season] == undefined) {
                    player_records[game_record.player_id][game_record.game.season] = {
                        goal: 0,
                        assist: 0
                    };
                }
                player_records[game_record.player_id][game_record.game.season]['goal']++;
                // 更新games用到的
                if (game_record.player.club == home_team) {
                    home_team_goal++;
                } else if (game_record.player.club == away_team) {
                    away_team_goal++;
                }
            } else if (game_record.event == 1) {
                //更新player_records用到的
                if (player_records[game_record.player_id] == undefined) {
                    player_records[game_record.player_id] = {};
                }

                if (player_records[game_record.player_id][game_record.game.season] == undefined) {
                    player_records[game_record.player_id][game_record.game.season] = {
                        'assist': 0,
                        'goal': 0
                    };
                }
                player_records[game_record.player_id][game_record.game.season]['assist']++;
            }
        });
        var game_result = -1;
        if (home_team_goal > away_team_goal) {
            game_result = 0;
        } else if (home_team_goal == away_team_goal) {
            game_result = 2;
        } else {
            game_result = 1;
        }

        var res = await Game.update({
            home_team_goal: home_team_goal,
            away_team_goal: away_team_goal,
            game_result: game_result
        }, {
            where: {
                id: element
            }
        });

        // 现在来更新club_record
        // 需要club_name
        // 需要league
        // 需要season
        // 需要points
        // 需要wins
        // 需要draws
        // 需要loses
        // 需要goals
        // 需要lose_goals
        // 需要turns

        // var club_records = {
        //     club_name: {
        //         season: {

        //         }
        //     }
        // }
    }
    return player_records;
};

module.exports = {
    'GET /games': async (ctx, next) => {
        if (!ctx.session.user) {
            ctx.response.redirect('/signin');
        }
        ctx.render('games.html', {});
    },
    'GET /fetch/games': async (ctx, next) => {
        var games = await Game.findAll({});
        var res = await Game.aggregate('turn', 'max', {
        });

        console.log(res);
        ctx.response.type = 'application/json';
        ctx.response.body = {
            games: games,
            turns: res
        };
    },
    'GET /update/games': async (ctx, next) => {
        // 更新games
        // 更新club_records
        // 更新player_records
        var game_ids = await Game_record.aggregate('game_id', 'DISTINCT',
            {
                plain: false
            }
        );

        game_ids = game_ids.map((element) => {
            return element['DISTINCT'];
        });
        console.log(game_ids);

        // 开始统计player_record
        // 需要统计season
        // 统计goal
        // 统计assist

        // var player_records = {
        //     player_id_1: {
        //         season_name_1: {

        //         },
        //         season_name_2: {

        //         }
        //     },
        //     player_id_2: {
        //         season_name_1: {

        //         },
        //         season_name_2: {

        //         }
        //     }
        // }

        var player_records = await getPlayerRecordsAndUpdateGames(game_ids);
        console.log('we fetch the player records');
        console.log(player_records);

        // var single_records = {
        //     player_id:
        //     season:
        //     goal:
        //     assist:
        // }

        var json_player_records = [];

        Object.keys(player_records).forEach(player_id => {
            Object.keys(player_records[player_id]).forEach(season_name => {
                json_player_records.push({
                    player_id: player_id,
                    season: season_name,
                    goal: player_records[player_id][season_name].goal,
                    assist: player_records[player_id][season_name].assist
                })
            })
        })

        console.log(json_player_records);
        json_player_records.forEach(json_player_record => {
            Player_record.upsert(json_player_record);
        });

        // 接下来获取club_record的数据
        //先获取所有俱乐部的名字，然后对每一个俱乐部进行这样的获取吗?

        var club_names = await Club.findAll({
            attributes: ['club_name']
        });

        club_names = club_names.map(element => element.club_name);

        console.log(club_names);

        club_names.forEach(async (club_name) => {
            var home_games = await Game.findAll({
                where: {
                    home_team: club_name,
                    game_result: {
                        [Op.ne]: null
                    }
                }
            });

            console.log(home_games);

            var recorder = {};
            var points = 0;
            var goals = 0;
            var lose_goals = 0;
            var wins = 0;
            var draws = 0;
            var loses = 0;

            var init_recorder_item = {
                league: '',
                points: 0,
                goals: 0,
                lose_goals: 0,
                wins: 0,
                draws: 0,
                loses: 0,
                turns: 0
            }

            home_games.forEach(home_game => {
                if(recorder[home_game.season] == undefined) {
                    recorder[home_game.season] = init_recorder_item;
                }

                recorder[home_game.season]['league'] = home_game.league;

                if(home_game.game_result == 0) {
                    recorder[home_game.season].points += 3;
                    recorder[home_game.season].wins += 1;
                } else if(home_game.game_result == 2) {
                    recorder[home_game.season].points += 1;
                    recorder[home_game.season].draws += 1;
                } else if(home_game.game_result == 1) {
                    recorder[home_game.season].loses += 1;
                }

                recorder[home_game.season].turns += 1;
                recorder[home_game.season].goals += home_game.home_team_goal;
                recorder[home_game.season].lose_goals += home_game.away_team_goal;
            })

            var away_games = await Game.findAll({
                where: {
                    away_team: club_name
                }
            })

            away_games.forEach(away_game => {
                if(recorder[away_game.season] == undefined) {
                    recorder[away_game.season] = init_recorder_item;
                }

                recorder[away_game.season]['league'] = away_game.league;

                if(away_game.game_result == 0) {
                    recorder[away_game.season].loses += 1;
                } else if(away_game.game_result == 2) {
                    recorder[away_game.season].points += 1;
                    recorder[away_game.season].draws += 1;
                } else if(away_game.game_result == 1) {
                    recorder[away_game.season].points += 3;
                    recorder[away_game.season].wins += 1;
                }

                recorder[away_game.season].turns += 1;
                recorder[away_game.season].goals += away_game.away_team_goal;
                recorder[away_game.season].lose_goals += away_game.home_team_goal;
            });

            // turns = home_games.length + away_games.length;

            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>');
            console.log(club_name);
            console.log(recorder);
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>');

            Object.keys(recorder).forEach(season => {
                Club_record.upsert({
                    club_name: club_name,
                    season: season,
                    league: recorder[season].league,
                    points: recorder[season].points,
                    wins: recorder[season].wins,
                    draws: recorder[season].draws,
                    loses: recorder[season].loses,
                    goals: recorder[season].goals,
                    lose_goals: recorder[season].lose_goals,
                    turns: recorder[season].turns
                })
            })

        })

        // game_ids.forEach(async (element) => {
        //     console.log('now deal with :' + element);
        //     // 只会查出来一项
        //     var game_include_records = await Game.findAll({
        //         include: [
        //             {
        //                 model: Game_record,
        //                 require: true
        //             }
        //         ],
        //         where: {
        //             id: element

        //         }
        //     });

        //     // 就此，我们获取到了所需要的记录，这可能和之前想得不太一样
        //     // 记录是这样的
        //     /*
        //     id: 92,
        //     season: 'Premier League 2019/2020',
        //     league: 'Premier League',
        //     turn: 1,
        //     matchday: '2019-08-11',
        //     home_team: 'Manchester City',
        //     away_team: 'Manchester United',
        //     home_team_goal: null,
        //     away_team_goal: null,
        //     game_result: null,
        //     game_records:
        //     [ 
        //         [game_record],
        //         [game_record],
        //         [game_record],
        //         [game_record],
        //         [game_record],
        //         [game_record],
        //         [game_record],
        //         [game_record],
        //         [game_record],
        //         [game_record],
        //         [game_record],
        //         [game_record] 
        //     ] },
        // */
        //     //有些神奇
        //     // 这大概就是include 的意思了，包含在结果里面
        //     // 测试一下，如果有别的比赛记录加入了会怎样
        //     // 测试正常，现在开始计算比赛结果




        //     //现在还要进行一次连接操作找到这个球员是哪个俱乐部的。
        //     //有点点复杂，这个


        //     var home_team_goal = 0;
        //     var away_team_goal = 0;

        //     game_include_records[0].game_records.forEach(element => {

        //     });


        // });
        // res.forEach(element => {
        //     console.log(element);
        // });



        ctx.response.type = 'application/json';
        ctx.response.body = {
            msg: 'success'
        }
    }
}
