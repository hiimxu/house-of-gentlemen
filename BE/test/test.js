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


// test post service salonowner update service
// describe('test for update service post:/api/salonowner/create/service', function () {
//   it('should be true if message:"add service success", status:200, to be json, be a object ', function () {
//     let service = {
//       salonId: 1,
//       name: 'combo test',
//       price: '100000',
//       description: 'dac biet',
//       content: 'han hanh phuc vu quy khach!!!',
//       promotion: 0,
//       service_time: 45
//     };
//     chai.request('http://localhost:3000')
//       .post('/api/salonowner/create/service').send(service).end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.should.to.be.json;
//         res.body.should.have.property('message').eql('add service success');
//       });
//   });
// });
// get all service
describe('test for get service get: /api/customer/get/AllService', () => {
  it('should be true if message:"get service success, status:200, to be json, be a object "', function () {
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
  it('should be true if message:"login successed", status:200, to be json, be a object ', function () {
    let data = {
      account: 'customer',
      password: '123'

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
  it('should be true if message:"get all salon success", status:200, to be json, be a object ', function () {
    var accountId = 2;
    chai.request('http://localhost:3000')
      .get(`/api/salonowner/profile/${accountId}`).end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("get salon 's profile success");

      });

  });
});
// put : test salonowner update profile

describe('test for salonOwner update profile put:/api/salonowner/update/profile/:id', function () {
  it("should be true if message:update salon 's profile success, status:200, to be json, be a object ", function () {
    var salonId = 1;
    var data = {
      nameSalon: 'duySalon',
      phone: '0826368193',
      taxCode: '12345'
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

// 2. test register account customer create account salon success
// describe('test for register account customer post:/api/account/add/customer', function () {
//   it('should be true if message:create account salon success, status:200, to be json, be a object ', function () {
//     let data = {
//       account_name: 'duytest111',
//       password: 123,
//       role: 'customer',
//       nameCustomer: 'duy',
//       phone: '0826368193',
//       address: 'tb',
//       birthday: '1993-03-30'
//     };
//     chai.request('http://localhost:3000')
//       .post('/api/account/add/customer').send(data).end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.should.to.be.json;
//         res.body.should.have.property('message').eql('create account customer success');
//       });
//   });
// });
//3. testin put account_name is empty
// describe('test for register account customer post:/api/account/add/customer', function () {
//   it(' test in put account_name is empty should be true if  status:400, to be json, be a object,errors ', function () {
//     let data = {
//       account_name: '',
//       password: 123,
//       role: 'customer',
//       nameCustomer: 'duy',
//       phone: '0826368193',
//       address: 'tb',
//       birthday: '1993-03-30'
//     };
//     chai.request('http://localhost:3000')
//       .post('/api/account/add/customer').send(data).end((err, res) => {
//         res.should.have.status(400);
//         res.body.should.be.a('object');
//         res.should.to.be.json;
//         res.body.should.have.property('errors');
//       });
//   });
// });
//4. test input password is empty
describe('test for register account customer post:/api/account/add/customer', function () {
  it('test input password is empty should be true if  status:400, to be json, be a object,errors ', function () {
    let data = {
      account_name: 'duymc',
      password: '',
      role: 'customer',
      nameCustomer: 'duy',
      phone: '0826368193',
      address: 'tb',
      birthday: '1993-03-30'
    };
    chai.request('http://localhost:3000')
      .post('/api/account/add/customer').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.should.to.be.json;
        res.body.should.have.property('errors');
      });
  });
});
//5. test input phone input
describe('test for register account customer post:/api/account/add/customer', function () {
  it('test input phone should be true if  status:400, to be json, be a object,errors ', function () {
    let data = {
      account_name: 'duymc',
      password: '123',
      role: 'customer',
      nameCustomer: 'duy',
      phone: 'asdasdad',
      address: 'tb',
      birthday: '1993-03-30'
    };
    chai.request('http://localhost:3000')
      .post('/api/account/add/customer').send(data).end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.should.to.be.json;
        res.body.should.have.property('errors');
      });
  });
});
//1. test register account customer tai khoan da ton tai
describe('test for register account customer post:/api/account/add/customer', function () {
  it('should be true if message:tai khoan da ton tai, status:200, to be json, be a object ', function () {
    let data = {
      account_name: 'duycustomer',
      password: '12323213',
      role: 'customer',
      nameCustomer: 'duy',
      phone: '0826368193',
      address: 'tb',
      birthday: '1993-03-30'
    };
    chai.request('http://localhost:3000')
      .post('/api/account/add/customer').send(data).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.should.to.be.json;
        res.body.should.have.property('message').eql('Account already exists');
      });
  });
});


//6.  // get feedback of salon
describe('test for get feedback get: /api/customer/getFeedbackOfSalon/:id', () => {
  it('should be true if message:"get feedback success", status:200, to be json, be a object ', function () {
    let id = 1;
    chai.request('http://localhost:3000')
      .get(`/api/customer/getFeedbackOfSalon/${id}`).end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('get feedback success');
      });
  });
});
// 7.// cancel booking by customer
describe('test for cancel booking by customer: /api/customer/cancel/registerservice/:id', () => {
  it('should be true if message:cancel booking success, status:200, to be json, be a object ', function () {
    var id = 6;
    var data={staffCanlederId : 16};
    chai.request('http://localhost:3000')
      .put(`/api/customer/cancel/registerservice/${id}`).send(data).end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('cancel booking success');
      });
  });
});
//8 . booking service
describe('test for booking service post: /api/customer/create/registerService', function () {
  it('should be true if message:booking service success, status:200, to be json, be a object ', function () {
    let data = {
      serviceId: 1,
      salonId:1,
      customerId:5,
      staffId:1,
      timeUse:'2022-03-26 09:30:00',
    };
    chai.request('http://localhost:3000')
      .post('/api/customer/create/registerService').send(data).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.should.to.be.json;
        res.body.should.have.property('message').eql('booking service success');
      });
  });
});