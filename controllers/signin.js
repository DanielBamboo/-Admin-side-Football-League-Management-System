const tables = require('../tables');

// 这里可能会有一个异步函数的问题
function verifyPassword(usrname, password) {
    return (async () => {
        var users = await tables.User.findAll({
            where: {
                usrname: usrname
            }
        });
        console.log(users);
        if(users.length == 0)   return false;
        // 出于一种很神奇的数据结构我暂时下不了手
        for(var u of users) {
            console.log('var u of users: u[pwd]= "'+typeof u['pwd']+'"', 'password="' + typeof password + '"');
            console.log(u['pwd'].length, password.length, u['pwd']==password);
            if(u['pwd'] == password) return true;
        }
        return false;

    })();
}

module.exports = {
    'GET /signin': async (ctx, next) => {
        // let names = '甲乙丙丁戊己庚辛壬癸';
        // let name = names[index % 10];
        ctx.render('signin.html', {
            // name: `路人${name}`
        })
    },

    'POST /signin': async (ctx, next) => {
        var username = ctx.request.body.usrname;
        var password = ctx.request.body.pwd;

        console.log('get username: ',  username, 'get password"'+ password + '"');

        console.log('verify res =', await verifyPassword(username, password));
        if(await verifyPassword(username, password) == true) {
            ctx.response.redirect('/home');
            ctx.session.user = username;
        } else {
            ctx.render('signin-fail.html', {});
        }
    },

    'GET /signout': async (ctx, next) => {
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    }
};