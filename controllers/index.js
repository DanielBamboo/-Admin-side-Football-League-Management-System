

module.exports = {
    'GET /': async (ctx, next) => {
        if(!ctx.session.user) {
            ctx.response.redirect('/signin');
        }
        ctx.render('home.html', {});
    }
}