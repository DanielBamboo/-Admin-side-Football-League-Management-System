module.exports = {
    'GET /games': async(ctx, next) => {
        if(!ctx.session.user) {
            ctx.response.redirect('/signin');
        }
        ctx.render('games.html', {});
    }
}