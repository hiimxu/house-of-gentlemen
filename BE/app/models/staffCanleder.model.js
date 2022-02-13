const db = require('../common/connect');
const StaffCanleder = function (staffCanleder) {
    this.staffCanlederId = staffCanleder.staffCanlederId;
    this.staffId = staffCanleder.staffId;
    this.hour = staffCanleder.hour;
    this.date = staffCanleder.date;
    this.statusId = staffCanleder.statusId;
}

module.exports =StaffCanleder;