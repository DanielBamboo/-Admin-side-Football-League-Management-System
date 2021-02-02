const tables = require('../tables');
const Club = tables.Club;
const Coach = tables.Coach;

module.exports = {
    'GET /clubs': async(ctx, next) => {
        if(!ctx.session.user) {
            ctx.response.redirect('/signin');
        }
        ctx.render('clubs.html', {});
    },
    // 这里和player-panel的fetch/clubs冲突，所以暂时改个名
    'GET /fetch/club_list': async (ctx, next) => {
        var clubs = await Club.findAll({
        });

        ctx.response.type = 'application.json';
        ctx.response.body = {
            clubs: clubs
        }
    },

    'GET /fetch/coaches_with_club': async (ctx, next) => {
        var coaches_with_club = await Coach.findAll({
            include: [
                {
                    model: Club,
                    require: true
                }
            ],
        })
        // console.log(coaches_with_club);

        ctx.response.type = 'application.json';
        ctx.response.body = {
            coaches_with_club: coaches_with_club
        }
    },

    'DELETE /modify/club': async (ctx, next) => {
        console.log(ctx.request.body);
        var status = await Club.destroy({
            where: {
                club_name: ctx.request.body.club_name
            }
        }).then(function (delete_record) {
            if (delete_record == 1) {
                console.log('delete success');
                return 'success';
            } else {
                console.log('not found');
                return 'notFound';
            }
        }).catch(function (err) {
            console.log('ERROR');
            return 'ERROR';
        });

        console.log(status);

        ctx.response.type = 'application/json';
        ctx.response.body = {
            message: status
        }
    },

    'POST /modify/club': async (ctx, next) => {
        // 直接更新这个表中的这名球员
        console.log('POST /modify/club');
        var data = ctx.request.body.club;

        console.log(data);

        var res;

        if(data.chief_coach == '') {
            data.chief_coach = null;
        }

        // 应该添加一个处理异常情况的
        if (ctx.request.body.state == 'add') {
            // 这里要加attrs
            res = await Club.create(
                data,
                {
                    fields: ['club_name', 'league', 'chief_coach']
                }
            );
        } else if (ctx.request.body.state == 'edit') {
            Club.update({
                club_name: data.club_name,
                league: data.league,
                chief_coach: data.chief_coach
            }, {
                where: {
                    club_name: data.club_name
                }
            });
        }

        console.log('post /modify/club res: ' + res);

        if (ctx.request.body.state == 'edit') {
            res = data;
        }
        ctx.response.type = 'application/json';
        ctx.response.body = {
            club: res
        };
    },
}