const db = require('../common/connect');
const StatusRegisterService = function (statusRegisterService) {
    this.status_register_id = statusRegisterService.status_register_id;
    this.name = statusRegisterService.name;
}

module.exports =StatusRegisterService;