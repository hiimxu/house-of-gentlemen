//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var tokenCustomer="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjozLCJhY2NvdW50X25hbWUiOiJjdXN0b21lciIsImN1c3RvbWVySWQiOjUsImlhdCI6MTY0OTk0NTEyMCwiZXhwIjoxNjQ5OTUyMzIwfQ.3XG0NR2DMUa2RRBDPBUipidGVbaePd6tUG7nZqOTWV4";
var tokenSalon="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoyLCJhY2NvdW50X25hbWUiOiJzYWxvbiIsInNhbG9uSWQiOjEsImlhdCI6MTY0OTk0NTE2MywiZXhwIjoxNjQ5OTUyMzYzfQ.6r-nxCMExaxDU28hGnwzQ8pDIPCMdVr-Fj1X0LYL7AI";
chai.use(chaiHttp);
//1.1 login account 
// check password to login
describe('test for loginAccount post:/api/account/login', function () {
  it('should be true if message:"message:password wrong,please check password", status:400, ', function () {
    let data = {
      account: 'customer',
      password: '1234'

    };
    chai.request('http://localhost:8080')
      .post('/api/account/login').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('password wrong,please check password');
      });

  });

});
//1.2 login account 
// check password to login
describe('test for loginAccount post:/api/account/login', function () {
  it('should be true if message:"message:Account not exist, please check account", status:400, ', function () {
    let data = {
      account: 'customer123a',
      password: '1234'

    };
    chai.request('http://localhost:8080')
      .post('/api/account/login').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Account not exist, please check account');
      });

  });

});
//1.3 login account 
// check password to login
describe('test for loginAccount post:/api/account/login', function () {
  it('should be true if message:"message:error validate", status:400, ', function () {
    let data = {
      account: '',
      password: '1234'

    };
    chai.request('http://localhost:8080')
      .post('/api/account/login').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('error validate');
      });

  });

});
//1.4 login account 
// check password to login
describe('test for loginAccount post:/api/account/login', function () {
  it('should be true if message:"message:error validate", status:400, ', function () {
    let data = {
      account: 'customer',
      password: ''

    };
    chai.request('http://localhost:8080')
      .post('/api/account/login').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('error validate');
      });

  });

});
//1.5 login account 
// check password to login
describe('test for loginAccount post:/api/account/login', function () {
  it('should be true if message:"message:please check account_name", status:200, ', function () {
    let data = {
      account: 'customer',
      password: '123'

    };
    chai.request('http://localhost:8080')
      .post('/api/account/login').send(data).end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('login successed');
      });

  });

});
// 2.1 get profile customer
describe('test for  get:/api/customer/profile', function () {
  it('should be true if status 200", message:"get data customer s profile success" ', function () {
    
    let data={
      token:tokenCustomer
    }
    chai.request('http://localhost:8080')
      .get('/api/customer/profile').send(data).end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql("get data customer 's profile success");
      });

  });

});
//2.2 get profile customer
describe('test for  get:/api/customer/profile', function () {
  it('should be true if status 403", message:A token is required for authentication ', function () {
    
    let data={
      token:''
    }
    chai.request('http://localhost:8080')
      .get('/api/customer/profile').send(data).end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql("A token is required for authentication");
      });

  });

});
//2.3 get profile customer
describe('test for  get:/api/customer/profile', function () {
  it('should be true if status 200", message:"get data customer s profile success" ', function () {
    let data={
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjozLCJhY2NvdW50X25hbWUiOiJjdXN0b21lciIsImN1c3RvbWVySWQiOjUsImlhdCI6MTY0OTcyOTIyNywiZXhwIjoxNjQ5NzM2NDI3fQ.Sz34DTMbrV2Y1jrx5WLtktnDC0NLh5fO32ztn0hPsv4'
    }
    chai.request('http://localhost:8080')
      .get('/api/customer/profile').send(data).end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql("Invalid Token");
      });

  });

});
//3.1 booking service
// describe('test for  post:/api/customer/create/registerService', function () {
//   it('should be true if status 200", message:booking success', function () {
    
//     let data={
//       token:tokenCustomer,
//       serviceId:'1',
//       salonId:'1',
//       staffId:'1',
//       timeUse:'2022-04-15 15:00:00',
//       price_original:100,
//       service_time:45
//     }
//     chai.request('http://localhost:8080')
//       .post('/api/customer/create/registerService').send(data).end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.have.property('message').eql("booking success");
//       });

//   });

// });
//3.2 booking service
describe('test for  post:/api/customer/create/registerService', function () {
  it('should be true if status 400", message:staff busy', function () {
    
    let data={
      token:tokenCustomer,
      serviceId:'1',
      salonId:'1',
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/customer/create/registerService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("staff busy");
      });

  });

});
//3.3 booking service
describe('test for  post:/api/customer/create/registerService', function () {
  it('should be true if status 400", message:please login account customer', function () {
    
    let data={
      token:tokenSalon,
      serviceId:'1',
      salonId:'1',
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/customer/create/registerService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("please login account customer");
      });

  });

});
//3.4 booking service
describe('test for  post:/api/customer/create/registerService', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenCustomer,
      serviceId:'1',
      salonId:'1',
      staffId:'1',
      timeUse:'',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/customer/create/registerService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//3.5 booking service
describe('test for  post:/api/customer/create/registerService', function () {
  it('should be true if status 401", message:Invalid Token', function () {
    
    let data={
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjozLCJhY2NvdW50X25hbWUiOiJjdXN0b21lciIsImN1c3RvbWVySWQiOjUsImlhdCI6MTY0OTcyOTIyNywiZXhwIjoxNjQ5NzM2NDI3fQ.Sz34DTMbrV2Y1jrx5WLtktnDC0NLh5fO32ztn0hPsv4',
      serviceId:'1',
      salonId:'1',
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/customer/create/registerService').send(data).end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql("Invalid Token");
      });

  });

});
//3.6 booking service
describe('test for  post:/api/customer/create/registerService', function () {
  it('should be true if status 403", message:booking success', function () {
    
    let data={
      token:'',
      serviceId:'1',
      salonId:'1',
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/customer/create/registerService').send(data).end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql("A token is required for authentication");
      });

  });

});
//3.7 booking service
describe('test for  post:/api/customer/create/registerService', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenCustomer,
      serviceId:'',
      salonId:'1',
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/customer/create/registerService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//3.8 booking service
describe('test for  post:/api/customer/create/registerService', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenCustomer,
      serviceId:'1',
      salonId:'',
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/customer/create/registerService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//3.9 booking service
describe('test for  post:/api/customer/create/registerService', function () {
  it('should be true if status 400", message:serror validate', function () {
    
    let data={
      token:tokenCustomer,
      serviceId:'1',
      salonId:'1',
      staffId:'',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/customer/create/registerService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//3.10 booking service
describe('test for  post:/api/customer/create/registerService', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenCustomer,
      serviceId:'1',
      salonId:'1',
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:'a',
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/customer/create/registerService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//3.11 booking service
describe('test for  post:/api/customer/create/registerService', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenCustomer,
      serviceId:'1',
      salonId:'1',
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:'a'
    }
    chai.request('http://localhost:8080')
      .post('/api/customer/create/registerService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
// 4.1 get history booking of customer

describe('test for  get:/api/customer/get/historyBooking', function () {
  it('should be true if status 200", message:get history booking service', function () {
    
    let data={
      token:tokenCustomer
    }
    chai.request('http://localhost:8080')
      .get('/api/customer/get/historyBooking').send(data).end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql("get history booking success");
      });

  });

});
// 4.2 get history booking of customer

describe('test for  get:/api/customer/get/historyBooking', function () {
  it('should be true if status 200", message:get history booking service', function () {
    
    let data={
      token:tokenSalon
    }
    chai.request('http://localhost:8080')
      .get('/api/customer/get/historyBooking').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("please login account customer");
      });

  });

});
// 4.3 get history booking of customer

describe('test for  get:/api/customer/get/historyBooking', function () {
  it('should be true if status 200", message:get history booking service', function () {
    
    let data={
      token:''
    }
    chai.request('http://localhost:8080')
      .get('/api/customer/get/historyBooking').send(data).end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql("A token is required for authentication");
      });

  });

});
// 4.4 get history booking of customer

describe('test for  get:/api/customer/get/historyBooking', function () {
  it('should be true if status 200", message:get history booking service', function () {
    
    let data={
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjozLCJhY2NvdW50X25hbWUiOiJjdXN0b21lciIsImN1c3RvbWVySWQiOjUsImlhdCI6MTY0OTcyOTIyNywiZXhwIjoxNjQ5NzM2NDI3fQ.Sz34DTMbrV2Y1jrx5WLtktnDC0NLh5fO32ztn0hPsv4'
    }
    chai.request('http://localhost:8080')
      .get('/api/customer/get/historyBooking').send(data).end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql("Invalid Token");
      });

  });

});
// 5.1 cancel booking service by customer
describe('test for  get:/api/customer/cancel/registerservice', function () {
  it('should be true if status 200", message:get history booking service', function () {
    
    let data={
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjozLCJhY2NvdW50X25hbWUiOiJjdXN0b21lciIsImN1c3RvbWVySWQiOjUsImlhdCI6MTY0OTcyOTIyNywiZXhwIjoxNjQ5NzM2NDI3fQ.Sz34DTMbrV2Y1jrx5WLtktnDC0NLh5fO32ztn0hPsv4',
      registerserviceId :109,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .put('/api/customer/cancel/registerservice').send(data).end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql("Invalid Token");
      });

  });
  

});
// 5.2 cancel booking service by customer
describe('test for  get:/api/customer/cancel/registerservice', function () {
  it('should be true if status 200", message:get history booking service', function () {
    
    let data={
      token:'',
      registerserviceId :109,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .put('/api/customer/cancel/registerservice').send(data).end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql("A token is required for authentication");
      });

  });
  

});
// 5.3 cancel booking service by customer
describe('test for  get:/api/customer/cancel/registerservice', function () {
  it('should be true if status 200", message:get history booking service', function () {
    
    let data={
      token:tokenSalon,
      registerserviceId :109,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .put('/api/customer/cancel/registerservice').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("please login account customer");
      });

  });
  

});
// 5.4 cancel booking service by customer
describe('test for  get:/api/customer/cancel/registerservice', function () {
  it('should be true if status 200", message:get history booking service', function () {
    
    let data={
      token:tokenCustomer,
      registerserviceId :'a',
      service_time:45
    }
    chai.request('http://localhost:8080')
      .put('/api/customer/cancel/registerservice').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });
  

});
// 5.5 cancel booking service by customer
describe('test for  get:/api/customer/cancel/registerservice', function () {
  it('should be true if status 200", message:get history booking service', function () {
    
    let data={
      token:tokenCustomer,
      registerserviceId :109,
      service_time:'a'
    }
    chai.request('http://localhost:8080')
      .put('/api/customer/cancel/registerservice').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });
  

});
// 5.6 cancel booking service by customer
describe('test for  get:/api/customer/cancel/registerservice', function () {
  it('should be true if status 200", message:get history booking service', function () {
    
    let data={
      token:tokenCustomer,
      registerServiceId:109,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .put('/api/customer/cancel/registerservice').send(data).end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql("canceled booking service success");
      });

  });
  

});
// 6.1 booking service by salon for customer
// describe('test for  post:/api/salonowner/bookingService', function () {
//   it('should be true if status 200", message:booking success', function () {
    
//     let data={
//       token:tokenSalon,
//       serviceId:'1',
      
//       staffId:'1',
//       timeUse:'2022-04-15 16:00:00',
//       price_original:100,
//       service_time:45
//     }
//     chai.request('http://localhost:8080')
//       .post('/api/salonowner/bookingService').send(data).end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.have.property('message').eql("booking success");
//       });

//   });

// });
// 6.2 booking service by salon for customer
describe('test for  post:/api/salonowner/bookingService', function () {
  it('should be true if status 400", message:staff busy', function () {
    
    let data={
      token:tokenSalon,
      serviceId:'1',
      
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/bookingService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("staff busy");
      });

  });

});
//6.3 booking service
describe('test for  post:/api/salonowner/bookingService', function () {
  it('should be true if status 400", message:please login account salon', function () {
    
    let data={
      token:tokenCustomer,
      serviceId:'1',
      
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/bookingService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("please login account salon");
      });

  });

});
//6.4 booking service
describe('test for  post:/api/salonowner/bookingService', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenSalon,
      serviceId:'1',
      
      staffId:'1',
      timeUse:'',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/bookingService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//6.5 booking service
describe('test for  post:/api/salonowner/bookingService', function () {
  it('should be true if status 401", message:Invalid Token', function () {
    
    let data={
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjozLCJhY2NvdW50X25hbWUiOiJjdXN0b21lciIsImN1c3RvbWVySWQiOjUsImlhdCI6MTY0OTcyOTIyNywiZXhwIjoxNjQ5NzM2NDI3fQ.Sz34DTMbrV2Y1jrx5WLtktnDC0NLh5fO32ztn0hPsv4',
      serviceId:'1',
     
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/bookingService').send(data).end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql("Invalid Token");
      });

  });

});
//6.6 booking service
describe('test for  post:/api/salonowner/bookingService', function () {
  it('should be true if status 403", message:A token is required for authentication', function () {
    
    let data={
      token:'',
      serviceId:'1',
      
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/bookingService').send(data).end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql("A token is required for authentication");
      });

  });

});
//6.7 booking service
describe('test for  post:/api/salonowner/bookingService', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenSalon,
      serviceId:'',
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/bookingService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//6.8 booking service
describe('test for  post:/api/salonowner/bookingService', function () {
  it('should be true if status 400", message:staff busy', function () {
    
    let data={
      token:tokenSalon,
      serviceId:'1',
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/bookingService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("staff busy");
      });

  });

});
//6.9 booking service
describe('test for  post:/api/salonowner/bookingService', function () {
  it('should be true if status 400", message:serror validate', function () {
    
    let data={
      token:tokenSalon,
      serviceId:'1',
      
      staffId:'',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/bookingService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//6.10 booking service
describe('test for  post:/api/salonowner/bookingService', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenSalon,
      serviceId:'1',
     
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:'a',
      service_time:45
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/bookingService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//6.11 booking service
describe('test for  post:/api/salonowner/bookingService', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenSalon,
      serviceId:'1',
     
      staffId:'1',
      timeUse:'2022-04-15 15:00:00',
      price_original:100,
      service_time:'a'
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/bookingService').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
       
      });

  });

});
//7.1 booking service
describe('test for  post:/api/salonowner/create/service', function () {
  it('should be true if status 200", message:create service success', function () {
    
    let data={
      token:tokenSalon,
      name:'Short Hair',
      price:100,
      service_time:45,
      promotion:10,
      content:'Short haircuts for men often look like they don’t need to be styled but that is rarely the case. Unless you have a buzz cut or hair that lies just right, skip this. For everyone else, here’s how to style short hair.',
      description:'The shorter the hair, the less product you need.',
      image:'https://www.menshairstyletrends.com/wp-content/uploads/2020/06/How-To-Style-Short-Hair-Men-sq.jpg',
      
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/create/service').send(data).end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql("add service success");
      });

  });

});
//7.2 booking service
describe('test for  post:/api/salonowner/create/service', function () {
  it('should be true if status 401", message:Invalid Token', function () {
    
    let data={
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjozLCJhY2NvdW50X25hbWUiOiJjdXN0b21lciIsImN1c3RvbWVySWQiOjUsImlhdCI6MTY0OTcyOTIyNywiZXhwIjoxNjQ5NzM2NDI3fQ.Sz34DTMbrV2Y1jrx5WLtktnDC0NLh5fO32ztn0hPsv4',
      name:'Short Hair',
      price:100,
      service_time:45,
      promotion:10,
      content:'Short haircuts for men often look like they don’t need to be styled but that is rarely the case. Unless you have a buzz cut or hair that lies just right, skip this. For everyone else, here’s how to style short hair.',
      description:'The shorter the hair, the less product you need.',
      image:'https://www.menshairstyletrends.com/wp-content/uploads/2020/06/How-To-Style-Short-Hair-Men-sq.jpg',
      
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/create/service').send(data).end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql("Invalid Token");
      });

  });

});
//7.3 booking service
describe('test for  post:/api/salonowner/create/service', function () {
  it('should be true if status 401", message:A token is required for authentication', function () {
    
    let data={
      token:'',
      name:'Short Hair',
      price:100,
      service_time:45,
      promotion:10,
      content:'Short haircuts for men often look like they don’t need to be styled but that is rarely the case. Unless you have a buzz cut or hair that lies just right, skip this. For everyone else, here’s how to style short hair.',
      description:'The shorter the hair, the less product you need.',
      image:'https://www.menshairstyletrends.com/wp-content/uploads/2020/06/How-To-Style-Short-Hair-Men-sq.jpg',
      
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/create/service').send(data).end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql("A token is required for authentication");
      });

  });

});
//7.4 booking service
describe('test for  post:/api/salonowner/create/service', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenSalon,
      name:'',
      price:100,
      service_time:45,
      promotion:10,
      content:'Short haircuts for men often look like they don’t need to be styled but that is rarely the case. Unless you have a buzz cut or hair that lies just right, skip this. For everyone else, here’s how to style short hair.',
      description:'The shorter the hair, the less product you need.',
      image:'https://www.menshairstyletrends.com/wp-content/uploads/2020/06/How-To-Style-Short-Hair-Men-sq.jpg',
      
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/create/service').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//7.5 booking service
describe('test for  post:/api/salonowner/create/service', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenSalon,
      name:'short hair',
      price:'adsdsadsad',
      service_time:45,
      promotion:10,
      content:'Short haircuts for men often look like they don’t need to be styled but that is rarely the case. Unless you have a buzz cut or hair that lies just right, skip this. For everyone else, here’s how to style short hair.',
      description:'The shorter the hair, the less product you need.',
      image:'https://www.menshairstyletrends.com/wp-content/uploads/2020/06/How-To-Style-Short-Hair-Men-sq.jpg',
      
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/create/service').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//7.6 booking service
describe('test for  post:/api/salonowner/create/service', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenSalon,
      name:'short hair',
      price:100,
      service_time:'saas',
      promotion:10,
      content:'Short haircuts for men often look like they don’t need to be styled but that is rarely the case. Unless you have a buzz cut or hair that lies just right, skip this. For everyone else, here’s how to style short hair.',
      description:'The shorter the hair, the less product you need.',
      image:'https://www.menshairstyletrends.com/wp-content/uploads/2020/06/How-To-Style-Short-Hair-Men-sq.jpg',
      
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/create/service').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//7.7 booking service
describe('test for  post:/api/salonowner/create/service', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenSalon,
      name:'short hair',
      price:100,
      service_time:45,
      promotion:'aa',
      content:'Short haircuts for men often look like they don’t need to be styled but that is rarely the case. Unless you have a buzz cut or hair that lies just right, skip this. For everyone else, here’s how to style short hair.',
      description:'The shorter the hair, the less product you need.',
      image:'https://www.menshairstyletrends.com/wp-content/uploads/2020/06/How-To-Style-Short-Hair-Men-sq.jpg',
      
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/create/service').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//7.8 booking service
describe('test for  post:/api/salonowner/create/service', function () {
  it('should be true if status 400", message:0<=promotion<=100', function () {
    
    let data={
      token:tokenSalon,
      name:'short hair',
      price:100,
      service_time:45,
      promotion:101,
      content:'Short haircuts for men often look like they don’t need to be styled but that is rarely the case. Unless you have a buzz cut or hair that lies just right, skip this. For everyone else, here’s how to style short hair.',
      description:'The shorter the hair, the less product you need.',
      image:'https://www.menshairstyletrends.com/wp-content/uploads/2020/06/How-To-Style-Short-Hair-Men-sq.jpg',
      
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/create/service').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("0<=promotion<=100");
      });

  });

});
//7.9 booking service
describe('test for  post:/api/salonowner/create/service', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenSalon,
      name:'short hair',
      price:100,
      service_time:45,
      promotion:10,
      content:'',
      description:'The shorter the hair, the less product you need.',
      image:'https://www.menshairstyletrends.com/wp-content/uploads/2020/06/How-To-Style-Short-Hair-Men-sq.jpg',
      
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/create/service').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//7.10 booking service
describe('test for  post:/api/salonowner/create/service', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenSalon,
      name:'short hair',
      price:100,
      service_time:45,
      promotion:10,
      content:'Short haircuts for men often look like they don’t need to be styled but that is rarely the case. Unless you have a buzz cut or hair that lies just right, skip this. For everyone else, here’s how to style short hair.',
      description:'',
      image:'https://www.menshairstyletrends.com/wp-content/uploads/2020/06/How-To-Style-Short-Hair-Men-sq.jpg',
      
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/create/service').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//7.11 booking service
describe('test for  post:/api/salonowner/create/service', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenSalon,
      name:'short hair',
      price:100,
      service_time:45,
      promotion:10,
      content:'Short haircuts for men often look like they don’t need to be styled but that is rarely the case. Unless you have a buzz cut or hair that lies just right, skip this. For everyone else, here’s how to style short hair.',
      description:'asadsad',
      image:'',
      
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/create/service').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
      });

  });

});
//7.12 booking service
describe('test for  post:/api/salonowner/create/service', function () {
  it('should be true if status 400", message:error validate', function () {
    
    let data={
      token:tokenSalon,
      name:'short hair',
      price:100,
      service_time:45,
      promotion:10,
      content:'Short haircuts for men often look like they don’t need to be styled but that is rarely the case. Unless you have a buzz cut or hair that lies just right, skip this. For everyone else, here’s how to style short hair.',
      description:'',
      image:'https://www.menshairstyletrends.com/wp-content/uploads/2020/06/How-To-Style-Short-Hair-Men-sq.jpg',
      
    }
    chai.request('http://localhost:8080')
      .post('/api/salonowner/create/service').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql("error validate");
        
      });

  });

});
