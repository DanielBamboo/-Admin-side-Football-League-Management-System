const tables = require('../tables');
const Player = tables.Player;
const Game_record = tables.Game_record;

module.exports = {
    'GET /fetch/game-records/:game_id': async (ctx, next) => {
        var game_id = ctx.params.game_id;
        // console.log();
        // console.log(game_id);
        // console.log();
        var game_records = await Game_record.findAll({
            include: [
                {
                    model: Player,
                    required: true
                }
            ],
            where: {
                game_id: game_id
            }
        });
        
        // console.log(JSON.stringify(records));
        // console.log(records);

        var res_records = game_records.map(function(record) {
            return {
                id: record.id,
                game_id: record.game_id,
                event: record.event,
                player_id: record.player_id,
                player_name: record.player.player_name,
                club: record.player.club,
                minutes: record.minutes,
            }
        });

        console.log(res_records);

        ctx.response.type = 'application/json';
        ctx.response.body = {
            records: res_records
        };
    },

    'POST /create/record': async(ctx, next) => {
        var data = ctx.request.body;
        var record = data.record;

        console.log(record);

        var new_record = await Game_record.create(
            record, 
            {
                fields: ['game_id', 'event', 'player_id', 'minutes']
            }
        );

        console.log(new_record);

        ctx.response.type = 'application/json';
        ctx.response.body = {
            record: new_record
        };
    },

    'DELETE /modify/record/:target_id': async (ctx, next) => {
        var target_id = ctx.params.target_id;
        console.log(target_id);

        var res = await Game_record.destroy({
            where: {
                id: target_id
            }
        });

        if(res == 1) {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            msg: 'success'
        };

        }
    }

}