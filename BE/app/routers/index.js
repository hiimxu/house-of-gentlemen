const accountRouter = require('./account_router');
const homeRouter = require('./home_router');
function route(app) {
    app.use('/api/account',accountRouter);
}
module.exports=route;