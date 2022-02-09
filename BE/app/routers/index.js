const accountRouter = require('./account_router');
const salonOwnerRouter=require('./salon_owner_router')
const homeRouter = require('./home_router');
function route(app) {
    app.use('/api/account',accountRouter);
    app.use('/api/salonowner',salonOwnerRouter)
}
module.exports=route;