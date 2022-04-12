//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var token;

chai.use(chaiHttp);
//1.1 login account 
// check password to login
describe('test for loginAccount post:/api/account/login', function () {
  it('should be true if message:"message:password wrong,please check password", status:400, ', function () {
    let data = {
      account: 'customer',
      password: '123'

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
      password: '123'

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
  it('should be true if message:"message:please check account_name", status:400, ', function () {
    let data = {
      account: '',
      password: '123'

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
  it('should be true if message:"message:please check account_name", status:400, ', function () {
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
      password: '1234'

    };
    chai.request('http://localhost:8080')
      .post('/api/account/login').send(data).end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('login successed');
      });

  });

});
//2.1 get profile customer
// describe('test for  get:/api/customer/profile', function () {
//   it('should be true if status 200", message:"get data customer s profile success" ', function () {
    
//     let data={
//       token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjozLCJhY2NvdW50X25hbWUiOiJjdXN0b21lciIsImN1c3RvbWVySWQiOjUsImlhdCI6MTY0OTcyOTIyNywiZXhwIjoxNjQ5NzM2NDI3fQ.Sz34DTMbrV2Y1jrx5WLtktnDC0NLh5fO32ztn0hPsv4'
//     }
//     chai.request('http://localhost:8080')
//       .get('/api/customer/profile').send(data).end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.have.property('message').eql("get data customer 's profile success");
//       });

//   });

// });
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
//       token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjozLCJhY2NvdW50X25hbWUiOiJjdXN0b21lciIsImN1c3RvbWVySWQiOjUsImlhdCI6MTY0OTcyOTIyNywiZXhwIjoxNjQ5NzM2NDI3fQ.Sz34DTMbrV2Y1jrx5WLtktnDC0NLh5fO32ztn0hPsv4',
//       serviceId:'1',
//       salonId:'1',
//       staffId:'1',
//       timeUse:'2022-04-12 15:00:00',
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
  it('should be true if status 400", message:booking success', function () {
    
    let data={
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjozLCJhY2NvdW50X25hbWUiOiJjdXN0b21lciIsImN1c3RvbWVySWQiOjUsImlhdCI6MTY0OTcyOTIyNywiZXhwIjoxNjQ5NzM2NDI3fQ.Sz34DTMbrV2Y1jrx5WLtktnDC0NLh5fO32ztn0hPsv4',
      serviceId:'1',
      salonId:'1',
      staffId:'1',
      timeUse:'2022-04-12 15:00:00',
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


