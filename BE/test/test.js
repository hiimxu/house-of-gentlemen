//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();


chai.use(chaiHttp);
//1.1 login account 
// check password to login
describe('test for loginAccount post:/api/account/login', function () {
  it('should be true if message:"message:please check password", status:400, ', function () {
    let data = {
      account: 'customer',
      password: '123'

    };
    chai.request('http://localhost:8080')
      .post('/api/account/login').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('please check password');
      });

  });

});
//1.2 login account 
// check password to login
describe('test for loginAccount post:/api/account/login', function () {
  it('should be true if message:"message:please check account_name", status:400, ', function () {
    let data = {
      account: 'customer123a',
      password: '123'

    };
    chai.request('http://localhost:8080')
      .post('/api/account/login').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('please check account_name');
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
describe('test for loginAccount get:/api/customer/profile', function () {
  it('should be true if message:"message:please check account_name", status:400, ', function () {
    let data = {
      account: 'customer',
      password: '1234'

    };
    chai.request('http://localhost:8080')
      .get('/api/customer/profile').send(data).end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql('login successed');
      });

  });

});


