const { body, validationResult } = require('express-validator');
var StaffCanleder = require('../models/staffCanleder.model');
var SalonOwner = require('../models/salonOwner.model');

exports.staffCanlederOrderandBusy = function (req, res, next) {
    var day = req.body.day;
    var staffId=req.body.staffId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(day)
    StaffCanleder.staffCanlederBusy(day,staffId, function (data) {
        if (data.length == 0) {
            return res.json({message:"staff free all day",data})
        }
        else{
         var slotTotal= data[0].slotTotal;
         var slot=[];
         for (let index = 0; index < slotTotal; index++) {
             slot.push(index+1);  
         }
       
            for (let n = 0; n < data.length;n++) {
                var index = slot.indexOf(data[n].slotBusy);
                slot.splice(index,1)
            }
        
         return res.json({message:"slot staff free",data:slot})

        }
    });


}