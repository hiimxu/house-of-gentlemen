const { body, validationResult } = require('express-validator');
var StaffCanleder = require('../models/staffCanleder.model');
var SalonOwner = require('../models/salonOwner.model');
var Staff = require('../models/satff.model');

exports.staffCanlederOrderandBusy = function (req, res, next) {
    
    var day = req.body.day;
    var staffId = req.body.staffId;
    var slotTime=[];
    var checkDay = new Date();
    var getDay=new Date(day +" 00:00:00");
    
    

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (getDay<checkDay) {
       return res.status(400).json({message:"please check day",data: []})
    }
    var checkFiveDay = new Date();
    checkFiveDay.setDate(checkFiveDay.getDate()+5);
    console.log(checkFiveDay)
    if (getDay>checkFiveDay){
        return res.status(400).json({message:"you should booking on 5 days",data:[]})

    }
        Staff.getTotalSlotSalon(staffId, function (data) {
            var slotTotal = data[0].totalSlot;
            console.log(slotTotal)
            var timeOpen=new Date("01-01-2017 " + data[0].timeOpen );
            var h=timeOpen.getHours();
            var m=timeOpen.getMinutes();
            StaffCanleder.staffCanlederBusy(day, staffId, function (data) {
               
                    var slot = [];
                    for (let index = 0; index < slotTotal; index++) {
                        slot.push(index+1);
                    }
                    for (let n = 0; n < data.length; n++) {
                        var index = slot.indexOf(data[n].slotBusy);
                        slot.splice(index, 1)
                    }
                    for (let n = 0; n < slot.length; n++) {
                        
                        var hSlot=Math.floor((slot[n]-1)/4);
                        var mSlot=(slot[n]-1-4*hSlot)*15;
                        hSlot=hSlot+h;
                        mSlot=mSlot+m;
                        if (mSlot>=60) {
                            mSlot=mSlot-60;
                            hSlot=hSlot+1;
                        }
                        if (hSlot<10) {
                            hSlot="0"+hSlot
                        }
                        if (mSlot==0) {
                            mSlot="00"
                        }
                        var timeSlot = hSlot+":"+mSlot;
                        console.log(slot[n])
                        slotTime.push(timeSlot)
                        
                    }
                    

                    return res.json({ message: "slot staff free", data: slotTime })

                
            });
        })



}