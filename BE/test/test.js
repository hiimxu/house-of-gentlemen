var assert = require('assert');
var chai = require('chai')
  , chaiHttp = require('chai-http');
chai.use(chaiHttp);
var should = chai.should();
var md5 = require('md5');

// let should = chai.should();
const { describe } = require('mocha');
// var server = require('../server');
// var should = chai.should();

// get all account
describe('test for get: /api/account', () => {
  it('should be true if message:"get all salon success"', function () {
    chai.request('http://localhost:3000')
      .get('/api/customer/get/AllSalon').end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('get all salon success');

      });

  });
});

// test post service salonowner update service
describe('test for post:/api/salonowner/create/service', function () {
  it('should be true if message:"add service success"', function () {
    let service = {
      salonId: 1,
      name: 'combo test',
      price: '100000',
      description: 'dac biet',
      content: 'han hanh phuc vu quy khach!!!',
      promotion: 0,
      service_time: 45};
    chai.request('http://localhost:3000')
      .post('/api/salonowner/create/service').send(service).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.should.to.be.json;
        res.body.should.have.property('message').eql('add service success');
      });
    });
  });
  // get all service
describe('test for get: /api/customer/get/AllService', () => {
  it('should be true if message:"get service success"', function () {
    chai.request('http://localhost:3000')
      .get('/api/customer/get/AllService').end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('get service success');
      });
    });
});
// login account
describe('test for loginAccount post:/api/account/login', function () {
  it('should be true if message:"login successed"', function () {
    let data = {
      account: 'customer',
      password: md5('123')

    };
    chai.request('http://localhost:3000')
      .post('/api/account/login').send(data).end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('login successed');
      });

  });

});
// get profile of salon
describe('test for get salon profile get:/api/salonowner/profile/:id', function () {
  it('should be true if message:"get all salon success"', function () {
    var accountId=2;
    chai.request('http://localhost:3000')
      .get(`/api/salonowner/profile/${accountId}`).end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("get salon 's profile success");

      });

  });
});
// put : test salonowner update profile

describe('test for salonOwner update profile put:/api/salonowner/update/profile/:id', function () {
  it("should be true if message:update salon 's profile success", function () {
    var salonId=1;
    var data = {
      nameSalon: 'duySalon',
      phone:0826368193,
      taxCode:'12345'
    };
    chai.request('http://localhost:3000')
      .put(`/api/salonowner/update/profile/${salonId}`).send(data).end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("update salon 's profile success");
      });

  });

});