const db = require('../common/connect');

const Feedback_detail = function (feedbackDetail) {
    this.feedBackDetailId = feedbackDetail.feedBackDetailId;
    this.feedBackId = feedbackDetail.feedBackId;
    this.content = feedbackDetail.content;
    this.customerId = feedbackDetail.customerId;
    this.salonId = feedbackDetail.salonId;
    this.wsend = feedbackDetail.wsend;
    
}

module.exports =Feedback_detail;