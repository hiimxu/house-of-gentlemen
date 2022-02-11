const accountRouter = require('./account_router');
const salonOwnerRouter=require('./salon_owner_router');
const adminRouter = require('./admin_router');
const customerRouter = require('./customer_router');
function route(app) {
    app.use('/api/account',accountRouter);
    app.use('/api/salonowner',salonOwnerRouter);
    app.use('/api/admin',adminRouter);
    app.use('/api/customer',customerRouter);
}
module.exports=route;