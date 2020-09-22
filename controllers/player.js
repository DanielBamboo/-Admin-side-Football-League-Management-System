module.exports = {
    'GET /players': async(ctx, next) => {
        if(!ctx.session.user) {
            ctx.response.redirect('/signin');
        }
        ctx.render('players.html', {});
    }
}