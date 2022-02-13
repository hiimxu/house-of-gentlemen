const db = require('../common/connect');

const Address = function (address) {
    this.addressId = address.addressId;
    this.city=address.city;
    this.district=address.district;
    this.detailAddress=address.detailAddress;
    this.salonId=add.salonId;
}

module.exports =Address;