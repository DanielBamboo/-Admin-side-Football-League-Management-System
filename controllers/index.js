// var fn_index = async (ctx, next) => {
//     ctx.response.body = `<h1>Index</h1>
//         <form action="/signin" method="post">
//             <p>Name: <input name="name" value="koa"></p>
//             <p>Password: <input name="password" type="password"></p>
//             <p><input type="submit" value="Submit"></p>
//         </form>`;
// };

// var fn_signin = async (ctx, next) => {
//     var
//         name = ctx.request.body.name || '',
//         password = ctx.request.body.password || '';
//     console.log(`signin with name: ${name}, password: ${password}`);
//     if (name === 'koa' && password === '12345') {
//         ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
//     } else {
//         ctx.response.body = `<h1>Login failed!</h1>
//         <p><a href="/">Try again</a></p>`;
//     }
// };

// module.exports = {
//     'GET /': fn_index,
//     'POST /signin': fn_signin
// };

// module.exports = {
//     'GET /': async (ctx, next) => {
//         ctx.render('index.html', {
//             title: 'Welcome'
//         });
//     }
// };

var Server_create_time = require('../current_time');

module.exports = {
    'GET /': async (ctx, next) => {
        console.log('index.js');
        // let user = ctx.state.user;
        // if(user && user.time == Server_create_time) {
        //     // 这里的ctx render 事什么意思
        //     // 替换当前页面吗
        //     console.log('index.js if(usr)');
        //     ctx.render('room.html', {
        //         user: user
        //     });
            
        // }
        if(!ctx.session.user) {
            ctx.response.redirect('/signin');
        }

        ctx.render('home.html', {});
    }
}