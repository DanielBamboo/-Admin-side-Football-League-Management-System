// sign in:
var index = 0;

var Server_create_time = require('../current_time');

// var config = require('../config');

// var sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 30000
//     }
// });

// var User = sequelize.define('user', {
//     usrname: {
//         type: Sequelize.STRING(50),
//         primaryKey: true
//     },
//     pwd: Sequelize.STRING(50)
// }, {
//     timestamps: false
// });

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
        
        // console.log(`find ${users.length} user:`);
        // for(let u of users) {
        //     console.log(u);
        // }
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

        // if(username == '123' && password === '123') {
        //     ctx.session.user = username;
            // ctx.body = {
            //     success:true,
            //     msg: 'Log in successfully'
            // }
        //     console.log('post /signin okay');
        // } else {
            // ctx.body = {
            //     success:false,
            //     msg: 'Wrong Username or password'
            // }
        //     console.log('post /signin not okay')
        // }

        // ctx.render('home.html', {});



        // index++;
        // let name = ctx.request.body.name || '路人甲';
        // let user = {
        //     id: index,
        //     name: name,
        //     image: index % 10,
        //     time: Server_create_time
        // };

        // let value = Buffer.from(JSON.stringify(user)).toString('base64');
        // console.log(`set cookie value: ${value}`);
        // console.log('set name');
        // ctx.cookies.set('name', value);
        // ctx.response.redirect('/');
        // var
        //     email = ctx.request.body.email || '',
        //     password = ctx.request.body.password || '';
        // if (email === 'admin@example.com' && password === '123456') {
        //     console.log('signin ok!');
        //     ctx.render('signin-ok.html', {
        //         title: 'Sign In OK',
        //         name: 'Mr Node'
        //     });
        // } else {
        //     console.log('signin failed!');
        //     ctx.render('signin-failed.html', {
        //         title: 'Sign In Failed'
        //     });
        // }
    },

    'GET /signout': async (ctx, next) => {
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    }
};