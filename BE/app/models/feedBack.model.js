const db = require('../common/connect');

const Feedback = function (feedback) {
    this.feedBackId = feedback.feedBackId;
    this.customerId = feedback.customerId;
    this.content = feedback.content;
    this.rate = feedback.rate;
    this.salonId = feedback.salonId;
    this.wsend = feedback.wsend;
    
}

module.exports =Feedback;