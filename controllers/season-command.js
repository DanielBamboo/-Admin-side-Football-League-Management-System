const Season = require('../tables').Season;

module.exports = {
    'GET /fetch/seasons' : async (ctx, next) => {
        var seasons = await Season.findAll({});
        
        ctx.response.type = 'application/json';
        ctx.response.body = {
            seasons: seasons
        }
    }
} 
