// const { where } = require('sequelize/types');
const tables = require('../tables');

const Player = tables.Player;
const Club = tables.Club;
const League = tables.League;
const Op = tables.Op;

function findInPlayers(where_clause) {
    return (async () => {
        var players = await Player.findAll({
            where: where_clause
        });
        return players;
    })();
}

function fuzzyQueryPlayers(where_clause) {
    Object.keys(where_clause).forEach((key) => {
        var content = where_clause[key];
        where_clause[key] = {
            [Op.like]: `%${content}%`
        }
    });
    return (async() => {
        // var player_name_filter = where_clause.player_name ? {  }
        var players = await Player.findAll({
            where: where_clause
        })
        return players;
    })();
}

module.exports = {
    'GET /fetch/player_list': async (ctx, next) => {
        var player_list = await findInPlayers({});
        ctx.response.type = 'application/json';
        ctx.response.body = {
            player_list: player_list
        };
    },

    'POST /fetch/player_list': async (ctx, next) => {
        var where_clause = ctx.request.body;
        var player_list = await fuzzyQueryPlayers(where_clause);


        console.log('-----------');
        for(var p of player_list) {
            console.log(JSON.stringify(p));
        }
        console.log('-----------');

        ctx.response.type = 'application/json';
        ctx.response.body = {
            player_list: player_list
        };
    },

    'POST /modify/player': async (ctx, next) => {
        // 直接更新这个表中的这名球员
        console.log('POST /modify/player');
        var data = ctx.request.body.player;

        console.log(data);

        if(data.shirt_number == "") {
            data.shirt_number = null;
        }
        if(data.club == "");

        var res;

        // 应该添加一个处理异常情况的
        if(ctx.request.body.state == 'add') {
            // 这里要加attrs
            res = await Player.create(
                data, 
                {
                    fields: ['player_name', 'shirt_number', 'age', 'preferred_foot',
                        'position', 'club', 'country']
                }
            );
        } else if(ctx.request.body.state == 'edit') {
            Player.update({
                player_name: data.player_name,
                shirt_number: data.shirt_number,
                age: data.age,
                preferred_foot: data.preferred_foot,
                position: data.position,
                club: data.club,
                country: data.country
            }, {
                where: {
                    id: data.id
                }
            });
        }

        console.log(res);

        if(ctx.request.body.state == 'edit') {
            res = data;
        } 
        ctx.response.type = 'application/json';
        ctx.response.body = {
            player: res
        };
    },

    'GET /fetch/clubs': async (ctx, next) => {
        var clubs =  await Club.findAll({
            attributes: ['club_name', 'league']
        });
        ctx.response.type = 'application/json';
        ctx.response.body = {
            clubs: clubs
        };
    },

    'DELETE /modify/player': async (ctx, next) => {
        var status = await Player.destroy({
            where: {
                id: ctx.request.body.id
            }
        }).then(function(delete_record){
            if(delete_record == 1) {
                console.log('delete success');
                return 'success';
            } else {
                console.log('not found');
                return 'notFound';
            }
        }).catch(function(err) {
            console.log('ERROR');
            return 'ERROR';
        });

        console.log(status);

        ctx.response.type = 'application/json';
        ctx.response.body = {
            message: status
        }
    },

    'GET /fetch/leagues': async(ctx, next) => {
        var leagues = await League.findAll({});
        ctx.response.type = 'application/json';
        ctx.response.body = {
            leagues: leagues
        }
    }
}