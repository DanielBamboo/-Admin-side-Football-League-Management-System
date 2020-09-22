module.exports = {
    'GET /home': async(ctx, next) => {
        if(!ctx.session.user) {
            ctx.response.redirect('/signin');
        }
        ctx.render('home.html', {});
    }
}