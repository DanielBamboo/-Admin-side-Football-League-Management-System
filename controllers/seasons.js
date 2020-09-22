module.exports = {
    'GET /seasons': async (ctx, next) => {
        if(!ctx.session.user) {
            ctx.response.redirect('/signin');
        }
        ctx.render('seasons.html', {});
    }
}