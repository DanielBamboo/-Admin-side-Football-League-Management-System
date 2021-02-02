const tables = require('../tables');
const Coach = tables.Coach;

module.exports = {

    'GET /coaches': async (ctx, next) => {
        if (!ctx.session.user) {
            ctx.response.redirect('/signin');
        }
        ctx.render('coaches.html', {});
    },

    'GET /fetch/coach_list': async (ctx, next) => {
        var coaches = await Coach.findAll({
        });

        ctx.response.type = 'application.json';
        ctx.response.body = {
            coaches: coaches
        }
    },


    'DELETE /modify/coach': async (ctx, next) => {
        var status = await Coach.destroy({
            where: {
                coach_name: ctx.request.body.coach_name
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
        // .then(function(row_deleted) {

        //     if(row_deleted == 1) {
        //         console.log('delete success');
        //     } else {
        //         console.log('delete fail');
        //     }
        // }, function(err) {
        //     console.log('DELETE ERROR !!!');
        // });

        console.log(status);

        ctx.response.type = 'application/json';
        ctx.response.body = {
            message: status
        }
    },

    'POST /modify/coach': async (ctx, next) => {
        // 直接更新这个表中的这名球员
        console.log('POST /modify/coach');
        var data = ctx.request.body.coach;

        console.log(data);

        var res;

        // 应该添加一个处理异常情况的
        if (ctx.request.body.state == 'add') {
            // 这里要加attrs
            res = await Coach.create(
                data,
                {
                    fields: ['coach_name', 'country']
                }
            );
        } else if (ctx.request.body.state == 'edit') {
            Coach.update({
                coach_name: data.coach_name,
                country: data.country
            }, {
                where: {
                    coach_name: data.coach_name
                }
            });
        }

        console.log('post /modify/coach res: ' + res);

        if (ctx.request.body.state == 'edit') {
            res = data;
        }
        ctx.response.type = 'application/json';
        ctx.response.body = {
            coach: res
        };
    },

}