const db = require('../common/connect');
const StatusRegisterService = function (statusRegisterService) {
    this.status_register_id = statusRegisterService.status_register_id;
    this.name = statusRegisterService.name;
}
StatusRegisterService.getAllSatusRegisterService =function ( result) {
    db.query("SELECT * FROM swp490_g11.status_register_service", (err, rows, fields) => {
        if (err) {
            console.log(err);
            result(null,err);
        } else {
           var data = rows;
            result(data)
        }
    });
}
StatusRegisterService.getSatusRegisterServiceById =function (id, result) {
    db.query("SELECT * FROM swp490_g11.status_register_service where status_register_id =?",id,(err, rows, fields) => {
        if (err) {
            console.log(err);
            result(null,err);
        } else {
           var data = rows;
            result(data)
        }
    });
}


module.exports =StatusRegisterService;