const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    SYMBOL:{
        type:String,
        required: true
    },
    OPEN:{
        type:String,
        required: true
    },
    HIGH:{
        type:String,
        required: true
    },
    LOW:{
        type:String,
        required: true
    },
    PREVCLOSE:{
        type:String,
        required: true
    },
    LTP:{
        type:String,
        required: true
    },
    CHNG:{
        type:String,
        required: true
    },
    CHANGPercentage:{
        type:String,
        required: true
    },
    VOLUME:{
        type:String,
        required: true
    },
    VALUE:{
        type:String,
        required: true
    },
    fiftyTwo_WH:{
        type:String,
        required: true
    },
    fiftyTwo_WL:{
        type:String,
        required: true
    },
    TODAY:{
        type:String,
        required: true
    },
    Date_Time:{
        type:String,
        required: true
    }
});


module.exports = mongoose.model("Data",dataSchema);