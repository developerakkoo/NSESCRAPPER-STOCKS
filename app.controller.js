const Data = require('./models/scraperData.model')
const csvtojson = require("csvtojson");
require('dotenv').config();


async function  scrapData(req,res,DataObj){
csvtojson()
    .fromFile("record.csv")
    .then(csvData => {
    
    const data1 = csvData[3]
    console.log()
      const DataObj={
    SYMBOL:JSON.stringify(data1.SYMBOL),
    OPEN:JSON.stringify(data1.OPEN),
    HIGH:JSON.stringify(data1.HIGH),
    LOW:JSON.stringify(data1.LOW),
    PREVCLOSE:JSON.stringify(data1.PREVCLOSE),
    LTP:JSON.stringify(data1.LTP),
    CHNG:JSON.stringify(data1.CHNG),
    CHANGPercentage:JSON.stringify(data1.CHANGPercentage),
    VOLUME:JSON.stringify(data1.VOLUME),
    VALUE:JSON.stringify(data1.VALUE),
    fiftyTwo_WH:JSON.stringify(data1.fiftyTwo_WH),
    fiftyTwo_WL:JSON.stringify(data1.fiftyTwo_WL),
    TODAY:JSON.stringify(data1.TODAY),
    Date_Time:JSON.stringify(data1.Date_Time)
}

    
csvData.forEach(function (arrayItem) { })
//     // let dataX = []
//     // dataX.push(JSON.stringify(arrayItem));
//    // console.log(dataX)
//     // scrapData(dataX);




  try {
    
    const insertedData =  Data.create(DataObj);
    
    res.status(201).send({message: `Data inserted successfully`});
  
}catch(err){
    console.log("Something went wrong while saving to DB", err.message);
    res.status(500).send({message: "Some internal error while inserting the element"});

}
});
}




module.exports={scrapData}