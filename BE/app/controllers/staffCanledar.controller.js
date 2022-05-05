const { body, validationResult } = require('express-validator');
var StaffCanleder = require('../models/staffCanleder.model');
var SalonOwner = require('../models/salonOwner.model');
var Staff = require('../models/satff.model');

exports.staffCanlederOrderandBusy = function (req, res, next) {
    
    var day = req.body.day;
    var staffId = req.body.staffId;
    var service_time = req.body.service_time;
    var slotTime=[];
    var checkDay = new Date();
    var getDay=new Date(day +" 23:59:59");
   
    
    

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
            var timeOpen=new Date("01-01-2017 " + data[0].timeOpen +":00" );
            var h=timeOpen.getHours();
            var m=timeOpen.getMinutes();
            console.log(timeOpen)
            StaffCanleder.staffCanlederBusy(day, staffId, function (data) {
               
                    var slot = [];
                    var arrSlotCheck=[];
                    var checkSlot=service_time/15;
                    for (let index = 0; index < slotTotal; index++) {
                        slot.push(index+1);
                    }
                    console.log("slot:"+slot)
                    for (let n = 0; n < data.length; n++) {
                        var index = slot.indexOf(data[n].slotBusy);
                        slot.splice(index, 1);
                    }
                    console.log("slot1:"+slot)
                    for (let n=0 ; n<slot.length; n++){
                        var x=slot[n+1]-slot[n];
                        // console.log(x+"+"+n)
                        if (x>1) {
                            // arrSlotCheck.push(slot[n-1]);
                            arrSlotCheck.push(slot[n]);
                        }
                        if (slot[n]==slot[slot.length-1] && slot[n]>(slotTotal-checkSlot)) {
                            arrSlotCheck.push(slot[n]);
                        }
                        
                        if (isNaN(x)) {
                            console.log(x+"+"+n)
                            // slot.splice(index, 1);
                        }
                        // console.log(slot[n+1]-slot[n])
                                          
                    }
                    console.log("arrSlotCheck"+arrSlotCheck)
                    for (let m = 0; m< arrSlotCheck.length; m++) {
console.log(arrSlotCheck[m])
                        var index = slot.indexOf(arrSlotCheck[m]-checkSlot+2);
                        console.log(index+"index")
                        slot.splice(index, checkSlot-1);
                        if (index<0) {
                            slot.splice(0, checkSlot-1+index);
                        }

                       
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
                        var checkHour = checkDay.getHours();
                        var checkMinute = checkDay.getMinutes();
                        var checkTime =checkHour+":"+checkMinute;
                        if (getDay.getFullYear()==checkDay.getFullYear()&&getDay.getMonth()==checkDay.getMonth()&&getDay.getDate()==checkDay.getDate()) {
                            if (Date.parse('01/01/2011'+' '+timeSlot+':45') > Date.parse('01/01/2011'+' '+checkTime+':45')) {
                                slotTime.push(timeSlot)
                            }
                            
                        }else{
                            slotTime.push(timeSlot)
                        }
                        
                        
                    }
                    

                    return res.json({ message: "slot staff free", data: slotTime })

                
            });
        })



}