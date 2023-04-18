const request = require("request-promise");
const csvtojson = require("csvtojson");
const moment = require('moment');
const cheerio = require("cheerio");
const axios = require('axios');
const puppeteer = require('puppeteer');
const {google}= require('googleapis');
const key = require('./keys.json');
const path = require('path');
const csvWriter =  require('csv-writer');
const writer = csvWriter.createArrayCsvWriter({
    path:path.resolve(__dirname,'record.csv'),
    header:['SYMBOL','OPEN','HIGH','LOW','PREVCLOSE','LTP','CHNG','CHANGPercentage','VOLUME','VALUE','fiftyTwo_WH','fiftyTwo_WL','TODAY','Date_Time']
});

const myInterval = setInterval(main, 180000);//for 10 min 60000
const writer1 = csvWriter.createObjectCsvWriter({
    path: path.resolve(__dirname, 'stocks.csv'),
    header: [
        { id: 'SYMBOL', title: 'SYMBOL' },
        { id: 'OPEN', title: 'OPEN' },
        { id: 'HIGH', title: 'HIGH' },
        { id: 'LOW', title: 'LOW' },
        { id: 'PREV.CLOSE', title: 'PREVCLOSE' },
        { id: 'LTP', title: 'LTP' },
        { id: 'CHNG', title: 'CHNG' },
        { id: '%CHNG', title: 'CHANGPercentage' },
        { id: 'VOLUME', title: 'VOLUME' },
        { id: 'VALUE' , title: 'VALUE' },
        { id: '52W H', title: 'fiftyTwo_WH' },
        { id: '52W L', title: 'fiftyTwo_WL' },
        { id: 'TODAY', title: 'TODAY' },
        { id: 'Date & Time', title: 'Date_Time' },
    ]
  });

  const client = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'] // scope of the app https://developers.google.com/identity/protocols/oauth2/scopes#sheets
);
client.authorize(function(err,tokens){

    if(err){
        console.log(err);
        return;
    }else{
        console.log('connected!')
      
    }
});


async function main() {
    console.log("Main Started");
    let stocks = [];
    const browser = await puppeteer.launch({headless: false});
    const page  = await browser.newPage();
await page.goto("https://www.nseindia.com/market-data/live-equity-market?symbol=NIFTY%2050",
{ waitUntil:'networkidle2',timeout:0});
    await page.waitForSelector("#equityStockTable")
    const html = await page.content();


    const $ = cheerio.load(html);
   
    //all table headers
    let head = [];
    let headers = [];
    if (!'#equityStockTable'){
        console.log("undefined")
        main();
    }
    $('#equityStockTable > thead > tr > th')
    .each((index, element) =>{ 
        // console.log($(element).text());
        head.push($(element).text());
    })

    headers.push(head[0].toString())
    headers.push( head[1].toString())
    headers.push(head[2].toString())
    headers.push(head[3].toString())
    headers.push(head[4].toString())
    headers.push(head[5].toString())
    headers.push(head[6].toString())
    headers.push(head[7].toString())
    headers.push(head[8].toString())
    headers.push(head[9].toString())
    headers.push(head[10].toString())
    headers.push(head[11].toString())
    headers.push(head[12].toString())

//HEADERS END

    // console.log(head);

     //NIFTY50 DATA
    let NIFTY50 = [];
    $("#equityStockTable > tbody > tr:nth-child(1) > td").each((i,e) =>{
         // console.log($(e).text());
        NIFTY50.push($(e).text())
    });

     //LT DATA
    let LT = [];
    $("#equityStockTable > tbody > tr:nth-child(2) > td").each((i,e) =>{
         // console.log($(e).text());
        LT.push($(e).text())
    })

     //HDFCBANK DATA
    let HDFCBANK = [];
    $("#equityStockTable > tbody > tr:nth-child(3) > td").each((i,e) =>{
         // console.log($(e).text());
        HDFCBANK.push($(e).text())
    })

     //HDFC DATA
    let HDFC = [];
    $("#equityStockTable > tbody > tr:nth-child(4) > td").each((i,e) =>{
         // console.log($(e).text());
        HDFC.push($(e).text())
    })

     //ITC DATA
    let ITC = [];
    $("#equityStockTable > tbody > tr:nth-child(5) > td").each((i,e) =>{
         // console.log($(e).text());
        ITC.push($(e).text())
    })

     //HDFCLIFE DATA
    let HDFCLIFE = [];
    $("#equityStockTable > tbody > tr:nth-child(6) > td").each((i,e) =>{
         // console.log($(e).text());
        HDFCLIFE.push($(e).text())
    })
    
     //TITAN DATA
    let TITAN = [];
    $("#equityStockTable > tbody > tr:nth-child(7) > td").each((i,e) =>{
         // console.log($(e).text());
        TITAN.push($(e).text())
    })

     //TCS DATA
    let TCS = [];
    $("#equityStockTable > tbody > tr:nth-child(8) > td").each((i,e) =>{
         // console.log($(e).text());
        TCS.push($(e).text())
    })
    //BAJFINANCE DATA
    let BAJFINANCE = [];
    
    $("#equityStockTable > tbody > tr:nth-child(9) > td").each((i,e) =>{
        // console.log($(e).text());
        BAJFINANCE.push($(e).text())
    })



    // TATACONSUM DATA
    let TATACONSUM = [];
    $("#equityStockTable > tbody > tr:nth-child(10) > td").each((i,e) =>{
        // console.log($(e).text());
        TATACONSUM.push($(e).text())
    })
    
    //COALINDIA DATA
    let COALINDIA = [];
    $("#equityStockTable > tbody > tr:nth-child(11) > td").each((i,e) =>{
        // console.log($(e).text());
        COALINDIA.push($(e).text())
    })

     //HCLTECH DATA
    let HCLTECH = [];
    $("#equityStockTable > tbody > tr:nth-child(12) > td").each((i,e) =>{
         // console.log($(e).text());
        HCLTECH.push($(e).text())
    })

      //SUNPHARMA DATA
    let SUNPHARMA = [];
    $("#equityStockTable > tbody > tr:nth-child(13) > td").each((i,e) =>{
        // console.log($(e).text());
        SUNPHARMA.push($(e).text())
    })

     //INFY DATA
    let INFY = [];
    $("#equityStockTable > tbody > tr:nth-child(14) > td").each((i,e) =>{
         // console.log($(e).text());
        INFY.push($(e).text())
    })

      //KOTAKBANK DATA
    let KOTAKBANK = [];
    $("#equityStockTable > tbody > tr:nth-child(15) > td").each((i,e) =>{
        // console.log($(e).text());
        KOTAKBANK.push($(e).text())
    })

     //SBILIFE DATA
    let SBILIFE = [];
    $("#equityStockTable > tbody > tr:nth-child(16) > td").each((i,e) =>{
         // console.log($(e).text());
        SBILIFE.push($(e).text())
    })

      //WIPRO DATA
    let WIPRO = [];
    $("#equityStockTable > tbody > tr:nth-child(17) > td").each((i,e) =>{
        // console.log($(e).text());
        WIPRO.push($(e).text())
    })

     //BRITANNIA DATA
    let BRITANNIA = [];
    $("#equityStockTable > tbody > tr:nth-child(18) > td").each((i,e) =>{
         // console.log($(e).text());
        BRITANNIA.push($(e).text())
    })

      //TECHM DATA
    let TECHM = [];
    $("#equityStockTable > tbody > tr:nth-child(19) > td").each((i,e) =>{
        // console.log($(e).text());
        TECHM.push($(e).text())
    })

       //HINDUNILVR DATA
    let HINDUNILVR = [];
    $("#equityStockTable > tbody > tr:nth-child(20) > td").each((i,e) =>{
           // console.log($(e).text());
        HINDUNILVR.push($(e).text())
    })
          //TATASTEEL DATA
    let TATASTEEL = [];
    $("#equityStockTable > tbody > tr:nth-child(21) > td").each((i,e) =>{
        // console.log($(e).text());
        TATASTEEL.push($(e).text())
    })
       //ULTRACEMCO DATA
    let ULTRACEMCO = [];
    $("#equityStockTable > tbody > tr:nth-child(22) > td").each((i,e) =>{
           // console.log($(e).text());
        ULTRACEMCO.push($(e).text())
    })
          //ONGC DATA
    let ONGC = [];
    $("#equityStockTable > tbody > tr:nth-child(23) > td").each((i,e) =>{
        // console.log($(e).text());
        ONGC.push($(e).text())
    })
       //JSWSTEEL DATA
    let JSWSTEEL = [];
    $("#equityStockTable > tbody > tr:nth-child(24) > td").each((i,e) =>{
           // console.log($(e).text());
        JSWSTEEL.push($(e).text())
    })
          //CIPLA DATA
    let CIPLA = [];
    $("#equityStockTable > tbody > tr:nth-child(25) > td").each((i,e) =>{
        // console.log($(e).text());
        CIPLA.push($(e).text())
    })
       //TATAMOTORS DATA
    let TATAMOTORS = [];
    $("#equityStockTable > tbody > tr:nth-child(26) > td").each((i,e) =>{
           // console.log($(e).text());
        TATAMOTORS.push($(e).text())
    })
          //BHARTIARTL	 DATA
    let BHARTIARTL	 = [];
    $("#equityStockTable > tbody > tr:nth-child(27) > td").each((i,e) =>{
        // console.log($(e).text());
        BHARTIARTL	.push($(e).text())
    })
       //UPL DATA
    let UPL = [];
    $("#equityStockTable > tbody > tr:nth-child(28) > td").each((i,e) =>{
           // console.log($(e).text());
        UPL.push($(e).text())
    })
          //BAJAJFINSV DATA
    let BAJAJFINSV = [];
    $("#equityStockTable > tbody > tr:nth-child(29) > td").each((i,e) =>{
        // console.log($(e).text());
        BAJAJFINSV.push($(e).text())
    })
       //ADANIPORTS DATA
       let ADANIPORTS = [];
       $("#equityStockTable > tbody > tr:nth-child(30) > td").each((i,e) =>{
           // console.log($(e).text());
           ADANIPORTS.push($(e).text())
       })
          //DIVISLAB DATA
    let DIVISLAB = [];
    $("#equityStockTable > tbody > tr:nth-child(31) > td").each((i,e) =>{
        // console.log($(e).text());
        DIVISLAB.push($(e).text())
    })
       //BAJAJ-AUTO DATA
       let BAJAJAUTO = [];
       $("#equityStockTable > tbody > tr:nth-child(32) > td").each((i,e) =>{
           // console.log($(e).text());
           BAJAJAUTO.push($(e).text())
       })
          //POWERGRID DATA
    let POWERGRID = [];
    $("#equityStockTable > tbody > tr:nth-child(33) > td").each((i,e) =>{
        // console.log($(e).text());
        POWERGRID.push($(e).text())
    })

          //DRREDDY DATA
          let DRREDDY = [];
          $("#equityStockTable > tbody > tr:nth-child(34) > td").each((i,e) =>{
              // console.log($(e).text());
              DRREDDY.push($(e).text())
          })

                //ASIANPAINT DATA
    let ASIANPAINT = [];
    $("#equityStockTable > tbody > tr:nth-child(35) > td").each((i,e) =>{
        // console.log($(e).text());
        ASIANPAINT.push($(e).text())
    })

          //NESTLEIND DATA
          let NESTLEIND = [];
          $("#equityStockTable > tbody > tr:nth-child(36) > td").each((i,e) =>{
              // console.log($(e).text());
              NESTLEIND.push($(e).text())
          })

                //BPCL DATA
    let BPCL = [];
    $("#equityStockTable > tbody > tr:nth-child(37) > td").each((i,e) =>{
        // console.log($(e).text());
        BPCL.push($(e).text())
    })

          //M&M DATA
          let MandM = [];
          $("#equityStockTable > tbody > tr:nth-child(38) > td").each((i,e) =>{
              // console.log($(e).text());
              MandM.push($(e).text())
          })

                //GRASIM DATA
    let GRASIM = [];
    $("#equityStockTable > tbody > tr:nth-child(39) > td").each((i,e) =>{
        // console.log($(e).text());
        GRASIM.push($(e).text())
    })

          //HEROMOTOCO	 DATA
          let HEROMOTOCO	 = [];
          $("#equityStockTable > tbody > tr:nth-child(40) > td").each((i,e) =>{
              // console.log($(e).text());
              HEROMOTOCO	.push($(e).text())
          })

                //HINDALCO DATA
    let HINDALCO = [];
    $("#equityStockTable > tbody > tr:nth-child(41) > td").each((i,e) =>{
        // console.log($(e).text());
        HINDALCO.push($(e).text())
    })

          //ICICIBANK DATA
          let ICICIBANK = [];
          $("#equityStockTable > tbody > tr:nth-child(42) > td").each((i,e) =>{
              // console.log($(e).text());
              ICICIBANK.push($(e).text())
          })

                //MARUTI DATA
    let MARUTI = [];
    $("#equityStockTable > tbody > tr:nth-child(43) > td").each((i,e) =>{
        // console.log($(e).text());
        MARUTI.push($(e).text())
    })

          //AXISBANK DATA
          let AXISBANK = [];
          $("#equityStockTable > tbody > tr:nth-child(44) > td").each((i,e) =>{
              // console.log($(e).text());
              AXISBANK.push($(e).text())
          })

                //RELIANCE DATA
    let RELIANCE = [];
    $("#equityStockTable > tbody > tr:nth-child(45) > td").each((i,e) =>{
        // console.log($(e).text());
        RELIANCE.push($(e).text())
    })

          //APOLLOHOSP	 DATA
          let APOLLOHOSP	 = [];
          $("#equityStockTable > tbody > tr:nth-child(46) > td").each((i,e) =>{
              // console.log($(e).text());
              APOLLOHOSP.push($(e).text())
          })

                //NTPC DATA
    let NTPC = [];
    $("#equityStockTable > tbody > tr:nth-child(47) > td").each((i,e) =>{
        // console.log($(e).text());
        NTPC.push($(e).text())
    })

          //SBIN DATA
          let SBIN = [];
          $("#equityStockTable > tbody > tr:nth-child(48) > td").each((i,e) =>{
              // console.log($(e).text());
              SBIN.push($(e).text())
          })

                //INDUSINDBK DATA
    let INDUSINDBK = [];
    $("#equityStockTable > tbody > tr:nth-child(49) > td").each((i,e) =>{
        // console.log($(e).text());
        INDUSINDBK.push($(e).text())
    })

          //EICHERMOT DATA
          let EICHERMOT = [];
          $("#equityStockTable > tbody > tr:nth-child(50) > td").each((i,e) =>{
              // console.log($(e).text());
              EICHERMOT.push($(e).text())
          })

                //ADANIENT DATA
    let ADANIENT = [];
    $("#equityStockTable > tbody > tr:nth-child(51) > td").each((i,e) =>{
        // console.log($(e).text());
        ADANIENT.push($(e).text())
    })
    
    stocks.push([NIFTY50[0],NIFTY50[1],NIFTY50[2],NIFTY50[3],NIFTY50[4],NIFTY50[5],NIFTY50[6],NIFTY50[7],NIFTY50[8],NIFTY50[9],NIFTY50[10],NIFTY50[11],NIFTY50[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [LT[0],LT[1],LT[2],LT[3],LT[4],LT[5],LT[6],LT[7],LT[8],LT[9],LT[10],LT[11],LT[12],moment().format('l'),moment().format('LT')] );
    stocks.push( [HDFCBANK[0],HDFCBANK[1],HDFCBANK[2], HDFCBANK [3],HDFCBANK[4], HDFCBANK [5], HDFCBANK [6],HDFCBANK[7],HDFCBANK[8],HDFCBANK[9],HDFCBANK[10],HDFCBANK[11],HDFCBANK [12],moment().format('l'),moment().format('LT')]);
    stocks.push( [HDFC[0], HDFC[1],  HDFC[2], HDFC[3],HDFC[4], HDFC[5], HDFC[6],HDFC[7],HDFC[8],HDFC[9],HDFC[10],HDFC[11],HDFC[12],moment().format('l'),moment().format('LT')] );
    stocks.push( [ITC[0],ITC[1],ITC[2],ITC[3],ITC[4], ITC[5], ITC[6],ITC[7],ITC[8],ITC[9],ITC[10],ITC[11], ITC[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [HDFCLIFE[0], HDFCLIFE[1], HDFCLIFE[2],  HDFCLIFE[3],HDFCLIFE[4],HDFCLIFE[5],  HDFCLIFE[6],HDFCLIFE[7],HDFCLIFE[8],HDFCLIFE[9],HDFCLIFE[10],HDFCLIFE[11],HDFCLIFE[12],moment().format('l'),moment().format('LT')] );
    stocks.push( [TITAN[0],TITAN[1], TITAN[2], TITAN[3],TITAN[4], TITAN[5],TITAN[6],TITAN[7],TITAN[8],TITAN[9],TITAN[10],TITAN[11],TITAN[12],moment().format('l'),moment().format('LT')] );
    stocks.push( [TCS[0], TCS[1], TCS[2], TCS[3],TCS[4],TCS[5],  TCS[6],TCS[7],TCS[8],TCS[9],TCS[10],TCS[11], TCS[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [BAJFINANCE[0],BAJFINANCE[1],BAJFINANCE[2], BAJFINANCE[3],BAJFINANCE[4],  BAJFINANCE[5],  BAJFINANCE[6],BAJFINANCE[7],BAJFINANCE[8],BAJFINANCE[9],BAJFINANCE[10],BAJFINANCE[11], BAJFINANCE[12],moment().format('l'),moment().format('LT')] );
    stocks.push( [TATACONSUM[0],TATACONSUM[1], TATACONSUM[2], TATACONSUM[3],TATACONSUM[4],TATACONSUM[5],  TATACONSUM[6],TATACONSUM[7],TATACONSUM[8],TATACONSUM[9],TATACONSUM[10],TATACONSUM[11],TATACONSUM[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [COALINDIA[0], COALINDIA[1], COALINDIA[2], COALINDIA[3],COALINDIA[4],COALINDIA[5],COALINDIA[6],COALINDIA[7],COALINDIA[8],COALINDIA[9],COALINDIA[10],COALINDIA[11], COALINDIA[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [HCLTECH[0], HCLTECH[1], HCLTECH[2], HCLTECH[3],HCLTECH[4],HCLTECH[5],HCLTECH[6],HCLTECH[7],HCLTECH[8],HCLTECH[9],HCLTECH[10],HCLTECH[11], HCLTECH[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [SUNPHARMA[0],SUNPHARMA[1], SUNPHARMA[2], SUNPHARMA[3],SUNPHARMA[4],SUNPHARMA[5], SUNPHARMA[6],SUNPHARMA[7],SUNPHARMA[8],SUNPHARMA[9],SUNPHARMA[10],SUNPHARMA[11], SUNPHARMA[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [INFY[0], INFY[1], INFY[2], INFY[3],INFY[4],INFY[5],INFY[6],INFY[7],INFY[8],INFY[9],INFY[10],INFY[11],INFY[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [KOTAKBANK[0], KOTAKBANK[1], KOTAKBANK[2], KOTAKBANK[3],KOTAKBANK[4],KOTAKBANK[5],  KOTAKBANK[6],KOTAKBANK[7],KOTAKBANK[8],KOTAKBANK[9],KOTAKBANK[10],KOTAKBANK[11], KOTAKBANK[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [SBILIFE[0],SBILIFE[1], SBILIFE[2], SBILIFE[3],SBILIFE[4],SBILIFE[5],SBILIFE[6],SBILIFE[7],SBILIFE[8],SBILIFE[9],SBILIFE[10],SBILIFE[11],SBILIFE[12],moment().format('l')]);
    stocks.push( [WIPRO[0],WIPRO[1], WIPRO[2], WIPRO[3],WIPRO[4],WIPRO[5], WIPRO[6],WIPRO[7],WIPRO[8],WIPRO[9],WIPRO[10],WIPRO[11], WIPRO[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [BRITANNIA[0],BRITANNIA[1],BRITANNIA[2],BRITANNIA[3],BRITANNIA[4],BRITANNIA[5],BRITANNIA[6],BRITANNIA[7],BRITANNIA[8],BRITANNIA[9],BRITANNIA[10],BRITANNIA[11],BRITANNIA[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [TECHM[0],TECHM[1], TECHM[2], TECHM[3],TECHM[4],TECHM[5],TECHM[6],TECHM[7],TECHM[8],TECHM[9],TECHM[10],TECHM[11],TECHM[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [HINDUNILVR[0],HINDUNILVR[1], HINDUNILVR[2], HINDUNILVR[3],HINDUNILVR[4], HINDUNILVR[5], HINDUNILVR[6],HINDUNILVR[7],HINDUNILVR[8],HINDUNILVR[9],HINDUNILVR[10],HINDUNILVR[11], HINDUNILVR[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [TATASTEEL[0],TATASTEEL[1],TATASTEEL[2],TATASTEEL[3],TATASTEEL[4],TATASTEEL[5],TATASTEEL[6],TATASTEEL[7],TATASTEEL[8],TATASTEEL[9],TATASTEEL[10],TATASTEEL[11],TATASTEEL[12],moment().format('l')]);
    stocks.push( [ULTRACEMCO[0],ULTRACEMCO[1],ULTRACEMCO[2],ULTRACEMCO[3],ULTRACEMCO[4],ULTRACEMCO[5],ULTRACEMCO[6],ULTRACEMCO[7],ULTRACEMCO[8],ULTRACEMCO[9],ULTRACEMCO[10],ULTRACEMCO[11],ULTRACEMCO[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [ONGC[0], ONGC[1], ONGC[2], ONGC[3],ONGC[4],  ONGC[5], ONGC[6],ONGC[7], ONGC[8], ONGC[9], ONGC[10], ONGC[11], ONGC[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [JSWSTEEL[0], JSWSTEEL[1], JSWSTEEL[2],JSWSTEEL[3],JSWSTEEL[4],JSWSTEEL[5],JSWSTEEL[6],JSWSTEEL[7],JSWSTEEL[8],JSWSTEEL[9],JSWSTEEL[10],JSWSTEEL[11],JSWSTEEL[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [CIPLA[0],CIPLA[1],CIPLA[2],CIPLA[3],CIPLA[4],CIPLA[5], CIPLA[6],CIPLA[7],CIPLA[8],CIPLA[9],CIPLA[10],CIPLA[11],CIPLA[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [TATAMOTORS[0],TATAMOTORS[1],TATAMOTORS[2],TATAMOTORS[3],TATAMOTORS[4],TATAMOTORS[5],TATAMOTORS[6],TATAMOTORS[7],TATAMOTORS[8],TATAMOTORS[9],TATAMOTORS[10],TATAMOTORS[11],TATAMOTORS[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [BHARTIARTL[0],BHARTIARTL[1],BHARTIARTL[2],BHARTIARTL[3],BHARTIARTL[4],BHARTIARTL[5],BHARTIARTL[6],BHARTIARTL[7],BHARTIARTL[8],BHARTIARTL[9],BHARTIARTL[10],BHARTIARTL[11],BHARTIARTL[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [UPL[0],UPL[1],UPL[2],UPL[3],UPL[4],UPL[5],UPL[6],UPL[7],UPL[8],UPL[9],UPL[10],UPL[11],UPL[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [BAJAJFINSV[0],BAJAJFINSV[1],BAJAJFINSV[2],BAJAJFINSV[3],BAJAJFINSV[4],BAJAJFINSV[5],BAJAJFINSV[6],BAJAJFINSV[7],BAJAJFINSV[8],BAJAJFINSV[9],BAJAJFINSV[10],BAJAJFINSV[11],BAJAJFINSV[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [ADANIPORTS[0],ADANIPORTS[1],ADANIPORTS[2],ADANIPORTS[3],ADANIPORTS[4],ADANIPORTS[5],ADANIPORTS[6],ADANIPORTS[7],ADANIPORTS[8],ADANIPORTS[9],ADANIPORTS[10],ADANIPORTS[11],ADANIPORTS[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [DIVISLAB[0],DIVISLAB[1],DIVISLAB[2],DIVISLAB[3],DIVISLAB[4],DIVISLAB[5],DIVISLAB[6],DIVISLAB[7],DIVISLAB[8],DIVISLAB[9],DIVISLAB[10],DIVISLAB[11],DIVISLAB[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [BAJAJAUTO[0],BAJAJAUTO[1],BAJAJAUTO[2],BAJAJAUTO[3],BAJAJAUTO[4],BAJAJAUTO[5],BAJAJAUTO[6],BAJAJAUTO[7],BAJAJAUTO[8],BAJAJAUTO[9],BAJAJAUTO[10],BAJAJAUTO[11],BAJAJAUTO[12],moment().format('l'),moment().format('LT')] );
    stocks.push( [POWERGRID[0],POWERGRID[1],POWERGRID[2],POWERGRID[3],POWERGRID[4],POWERGRID[5],POWERGRID[6],POWERGRID[7],POWERGRID[8],POWERGRID[9],POWERGRID[10],POWERGRID[11],POWERGRID[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [DRREDDY[0],DRREDDY[1],DRREDDY[2],DRREDDY[3],DRREDDY[4],DRREDDY[5],DRREDDY[6],DRREDDY[7],DRREDDY[8],DRREDDY[9],DRREDDY[10],DRREDDY[11],DRREDDY[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [ASIANPAINT[0],ASIANPAINT[1],ASIANPAINT[2],ASIANPAINT[3],ASIANPAINT[4],ASIANPAINT[5],ASIANPAINT[6],ASIANPAINT[7],ASIANPAINT[8],ASIANPAINT[9],ASIANPAINT[10],ASIANPAINT[11],ASIANPAINT[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [NESTLEIND[0],NESTLEIND[1],NESTLEIND[2],NESTLEIND[3],NESTLEIND[4],NESTLEIND[5],NESTLEIND[6],NESTLEIND[7],NESTLEIND[8],NESTLEIND[9],NESTLEIND[10],NESTLEIND[11],NESTLEIND[12],moment().format('l')]);
    stocks.push( [BPCL[0],BPCL[1],BPCL[2],BPCL[3],BPCL[4],BPCL[5],BPCL[6],BPCL[7],BPCL[8],BPCL[9],BPCL[10],BPCL[11],BPCL[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [MandM[0],MandM[1],MandM[2],MandM[3],MandM[4],MandM[5],MandM[6],MandM[7],MandM[8],MandM[9],MandM[10],MandM[11],MandM[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [GRASIM[0],GRASIM[1],GRASIM[2],GRASIM[3],GRASIM[4],GRASIM[5],GRASIM[6],GRASIM[7],GRASIM[8],GRASIM[9],GRASIM[10],GRASIM[11],GRASIM[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [HEROMOTOCO[0],HEROMOTOCO[1],HEROMOTOCO[2],HEROMOTOCO[3],HEROMOTOCO[4],HEROMOTOCO[5],HEROMOTOCO[6],HEROMOTOCO[7],HEROMOTOCO[8],HEROMOTOCO[9],HEROMOTOCO[10],HEROMOTOCO[11],HEROMOTOCO[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [HINDALCO[0],HINDALCO[1],HINDALCO[2],HINDALCO[3],HINDALCO[4],HINDALCO[5],HINDALCO[6],HINDALCO[7],HINDALCO[8],HINDALCO[9],HINDALCO[10],HINDALCO[11],HINDALCO[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [ICICIBANK[0],ICICIBANK[1],ICICIBANK[2],ICICIBANK[3],ICICIBANK[4],ICICIBANK[5],ICICIBANK[6],ICICIBANK[7],ICICIBANK[8],ICICIBANK[9],ICICIBANK[10],ICICIBANK[11],ICICIBANK[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [MARUTI[0],MARUTI[1],MARUTI[2],MARUTI[3],MARUTI[4],MARUTI[5],MARUTI[6],MARUTI[7],MARUTI[8],MARUTI[9],MARUTI[10],MARUTI[11],MARUTI[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [AXISBANK[0],AXISBANK[1],AXISBANK[2],AXISBANK[3],AXISBANK[4],AXISBANK[5],AXISBANK[6],AXISBANK[7],AXISBANK[8],AXISBANK[9],AXISBANK[10],AXISBANK[11],AXISBANK[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [RELIANCE[0],RELIANCE[1],RELIANCE[2],RELIANCE[3],RELIANCE[4],RELIANCE[5],RELIANCE[6],RELIANCE[7],RELIANCE[8],RELIANCE[9],RELIANCE[10],RELIANCE[11],RELIANCE[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [APOLLOHOSP[0],APOLLOHOSP[1],APOLLOHOSP[2],APOLLOHOSP[3],APOLLOHOSP[4],APOLLOHOSP[5],APOLLOHOSP[6],APOLLOHOSP[7],APOLLOHOSP[8],APOLLOHOSP[9],APOLLOHOSP[10],APOLLOHOSP[11],APOLLOHOSP[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [NTPC[0],NTPC[1],NTPC[2],NTPC[3],NTPC[4],NTPC[5],NTPC[6],NTPC[7],NTPC[8],NTPC[9],NTPC[10],NTPC[11],NTPC[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [SBIN[0],SBIN[1],SBIN[2],SBIN[3],SBIN[4],SBIN[5],SBIN[6],SBIN[7],SBIN[8],SBIN[9],SBIN[10],SBIN[11],SBIN[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [INDUSINDBK[0],INDUSINDBK[1],INDUSINDBK[2],INDUSINDBK[3],INDUSINDBK[4],INDUSINDBK[5],INDUSINDBK[6],INDUSINDBK[7],INDUSINDBK[8],INDUSINDBK[9],INDUSINDBK[10],INDUSINDBK[11],INDUSINDBK[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [EICHERMOT[0],EICHERMOT[1],EICHERMOT[2],EICHERMOT[3],EICHERMOT[4],EICHERMOT[5],EICHERMOT[6],EICHERMOT[7],EICHERMOT[8],EICHERMOT[9],EICHERMOT[10],EICHERMOT[11],EICHERMOT[12],moment().format('l'),moment().format('LT')]);
    stocks.push( [ADANIENT[0],ADANIENT[1],ADANIENT[2],ADANIENT[3],ADANIENT[4],ADANIENT[5],ADANIENT[6],ADANIENT[7],ADANIENT[8],ADANIENT[9],ADANIENT[10],ADANIENT[11],ADANIENT[12],moment().format('l'),moment().format('LT')]);
    //Data  object  inserting in mongo using axios
let data1 ={SYMBOL:NIFTY50[0],OPEN:NIFTY50[1],HIGH:NIFTY50[2],LOW:NIFTY50[3],PREVCLOSE:NIFTY50[4],LTP:NIFTY50[5],CHNG:NIFTY50[6],CHANGPercentage:NIFTY50[7],VOLUME:NIFTY50[8],VALUE:NIFTY50[9],fiftyTwo_WH:NIFTY50[10],fiftyTwo_WL:NIFTY50[11],TODAY:NIFTY50[12],Date:moment().format('l'),Time:moment().format('LT')}
let data2 ={SYMBOL:LT[0],OPEN:LT[1],HIGH:LT[2],LOW:LT[3],PREVCLOSE:LT[4],LTP:LT[5],CHNG:LT[6],CHANGPercentage:LT[7],VOLUME:LT[8],VALUE:LT[9],fiftyTwo_WH:LT[10],fiftyTwo_WL:LT[11],TODAY:LT[12],Date:moment().format('l'),Time:moment().format('LT')}
let data3 ={SYMBOL:HDFCBANK[0],OPEN:HDFCBANK[1],HIGH:HDFCBANK[2],LOW:HDFCBANK[3],PREVCLOSE:HDFCBANK[4],LTP:HDFCBANK[5],CHNG:HDFCBANK[6],CHANGPercentage:HDFCBANK[7],VOLUME:HDFCBANK[8],VALUE:HDFCBANK[9],fiftyTwo_WH:HDFCBANK[10],fiftyTwo_WL:HDFCBANK[11],TODAY:HDFCBANK[12],Date:moment().format('l'),Time:moment().format('LT')}
let data4 ={SYMBOL:HDFC[0],OPEN:HDFC[1],HIGH:HDFC[2],LOW:HDFC[3],PREVCLOSE:HDFC[4],LTP:HDFC[5],CHNG:HDFC[6],CHANGPercentage:HDFC[7],VOLUME:HDFC[8],VALUE:HDFC[9],fiftyTwo_WH:HDFC[10],fiftyTwo_WL:HDFC[11],TODAY:HDFC[12],Date:moment().format('l'),Time:moment().format('LT')}
let data5 ={SYMBOL:ITC[0],OPEN:ITC[1],HIGH:ITC[2],LOW:ITC[3],PREVCLOSE:ITC[4],LTP:ITC[5],CHNG:ITC[6],CHANGPercentage:ITC[7],VOLUME:ITC[8],VALUE:ITC[9],fiftyTwo_WH:ITC[10],fiftyTwo_WL:ITC[11],TODAY:ITC[12],Date:moment().format('l'),Time:moment().format('LT')}
let data6 ={SYMBOL:HDFCLIFE[0],OPEN:HDFCLIFE[1],HIGH:HDFCLIFE[2],LOW:HDFCLIFE[3],PREVCLOSE:HDFCLIFE[4],LTP:HDFCLIFE[5],CHNG:HDFCLIFE[6],CHANGPercentage:HDFCLIFE[7],VOLUME:HDFCLIFE[8],VALUE:HDFCLIFE[9],fiftyTwo_WH:HDFCLIFE[10],fiftyTwo_WL:HDFCLIFE[11],TODAY:HDFCLIFE[12],Date:moment().format('l'),Time:moment().format('LT')}
let data7 ={SYMBOL:TITAN[0],OPEN:TITAN[1],HIGH:TITAN[2],LOW:TITAN[3],PREVCLOSE:TITAN[4],LTP:TITAN[5],CHNG:TITAN[6],CHANGPercentage:TITAN[7],VOLUME:TITAN[8],VALUE:TITAN[9],fiftyTwo_WH:TITAN[10],fiftyTwo_WL:TITAN[11],TODAY:TITAN[12],Date:moment().format('l'),Time:moment().format('LT')}
let data8 ={SYMBOL:TCS[0],OPEN:TCS[1],HIGH:TCS[2],LOW:TCS[3],PREVCLOSE:TCS[4],LTP:TCS[5],CHNG:TCS[6],CHANGPercentage:TCS[7],VOLUME:TCS[8],VALUE:TCS[9],fiftyTwo_WH:TCS[10],fiftyTwo_WL:TCS[11],TODAY:TCS[12],Date:moment().format('l'),Time:moment().format('LT')}
let data9 ={SYMBOL:BAJFINANCE[0],OPEN:BAJFINANCE[1],HIGH:BAJFINANCE[2],LOW:BAJFINANCE[3],PREVCLOSE:BAJFINANCE[4],LTP:BAJFINANCE[5],CHNG:BAJFINANCE[6],CHANGPercentage:BAJFINANCE[7],VOLUME:BAJFINANCE[8],VALUE:BAJFINANCE[9],fiftyTwo_WH:BAJFINANCE[10],fiftyTwo_WL:BAJFINANCE[11],TODAY:BAJFINANCE[12],Date:moment().format('l'),Time:moment().format('LT')}
let data10 ={SYMBOL:TATACONSUM[0],OPEN:TATACONSUM[1],HIGH:TATACONSUM[2],LOW:TATACONSUM[3],PREVCLOSE:TATACONSUM[4],LTP:TATACONSUM[5],CHNG:TATACONSUM[6],CHANGPercentage:TATACONSUM[7],VOLUME:TATACONSUM[8],VALUE:TATACONSUM[9],fiftyTwo_WH:TATACONSUM[10],fiftyTwo_WL:TATACONSUM[11],TODAY:TATACONSUM[12],Date:moment().format('l'),Time:moment().format('LT')}
let data11 ={SYMBOL:COALINDIA[0],OPEN:COALINDIA[1],HIGH:COALINDIA[2],LOW:COALINDIA[3],PREVCLOSE:COALINDIA[4],LTP:COALINDIA[5],CHNG:COALINDIA[6],CHANGPercentage:COALINDIA[7],VOLUME:COALINDIA[8],VALUE:COALINDIA[9],fiftyTwo_WH:COALINDIA[10],fiftyTwo_WL:COALINDIA[11],TODAY:COALINDIA[12],Date:moment().format('l'),Time:moment().format('LT')}
let data12 ={SYMBOL:HCLTECH[0],OPEN:HCLTECH[1],HIGH:HCLTECH[2],LOW:HCLTECH[3],PREVCLOSE:HCLTECH[4],LTP:HCLTECH[5],CHNG:HCLTECH[6],CHANGPercentage:HCLTECH[7],VOLUME:HCLTECH[8],VALUE:HCLTECH[9],fiftyTwo_WH:HCLTECH[10],fiftyTwo_WL:HCLTECH[11],TODAY:HCLTECH[12],Date:moment().format('l'),Time:moment().format('LT')}
let data13 ={SYMBOL:SUNPHARMA[0],OPEN:SUNPHARMA[1],HIGH:SUNPHARMA[2],LOW:SUNPHARMA[3],PREVCLOSE:SUNPHARMA[4],LTP:SUNPHARMA[5],CHNG:SUNPHARMA[6],CHANGPercentage:SUNPHARMA[7],VOLUME:SUNPHARMA[8],VALUE:SUNPHARMA[9],fiftyTwo_WH:SUNPHARMA[10],fiftyTwo_WL:SUNPHARMA[11],TODAY:SUNPHARMA[12],Date:moment().format('l'),Time:moment().format('LT')}
let data14 ={SYMBOL:INFY[0],OPEN:INFY[1],HIGH:INFY[2],LOW:INFY[3],PREVCLOSE:INFY[4],LTP:INFY[5],CHNG:INFY[6],CHANGPercentage:INFY[7],VOLUME:INFY[8],VALUE:INFY[9],fiftyTwo_WH:INFY[10],fiftyTwo_WL:INFY[11],TODAY:INFY[12],Date:moment().format('l'),Time:moment().format('LT')}
let data15 ={SYMBOL:KOTAKBANK[0],OPEN:KOTAKBANK[1],HIGH:KOTAKBANK[2],LOW:KOTAKBANK[3],PREVCLOSE:KOTAKBANK[4],LTP:KOTAKBANK[5],CHNG:KOTAKBANK[6],CHANGPercentage:KOTAKBANK[7],VOLUME:KOTAKBANK[8],VALUE:KOTAKBANK[9],fiftyTwo_WH:KOTAKBANK[10],fiftyTwo_WL:KOTAKBANK[11],TODAY:KOTAKBANK[12],Date:moment().format('l'),Time:moment().format('LT')}
let data16 ={SYMBOL:SBILIFE[0],OPEN:SBILIFE[1],HIGH:SBILIFE[2],LOW:SBILIFE[3],PREVCLOSE:SBILIFE[4],LTP:SBILIFE[5],CHNG:SBILIFE[6],CHANGPercentage:SBILIFE[7],VOLUME:SBILIFE[8],VALUE:SBILIFE[9],fiftyTwo_WH:SBILIFE[10],fiftyTwo_WL:SBILIFE[11],TODAY:SBILIFE[12],Date:moment().format('l'),Time:moment().format('LT')}
let data17 ={SYMBOL:WIPRO[0],OPEN:WIPRO[1],HIGH:WIPRO[2],LOW:WIPRO[3],PREVCLOSE:WIPRO[4],LTP:WIPRO[5],CHNG:WIPRO[6],CHANGPercentage:WIPRO[7],VOLUME:WIPRO[8],VALUE:WIPRO[9],fiftyTwo_WH:WIPRO[10],fiftyTwo_WL:WIPRO[11],TODAY:WIPRO[12],Date:moment().format('l'),Time:moment().format('LT')}
let data18 ={SYMBOL:BRITANNIA[0],OPEN:BRITANNIA[1],HIGH:BRITANNIA[2],LOW:BRITANNIA[3],PREVCLOSE:BRITANNIA[4],LTP:BRITANNIA[5],CHNG:BRITANNIA[6],CHANGPercentage:BRITANNIA[7],VOLUME:BRITANNIA[8],VALUE:BRITANNIA[9],fiftyTwo_WH:BRITANNIA[10],fiftyTwo_WL:BRITANNIA[11],TODAY:BRITANNIA[12],Date:moment().format('l'),Time:moment().format('LT')}
let data19 ={SYMBOL:TECHM[0],OPEN:TECHM[1],HIGH:TECHM[2],LOW:TECHM[3],PREVCLOSE:TECHM[4],LTP:TECHM[5],CHNG:TECHM[6],CHANGPercentage:TECHM[7],VOLUME:TECHM[8],VALUE:TECHM[9],fiftyTwo_WH:TECHM[10],fiftyTwo_WL:TECHM[11],TODAY:TECHM[12],Date:moment().format('l'),Time:moment().format('LT')}
let data20 ={SYMBOL:HINDUNILVR[0],OPEN:HINDUNILVR[1],HIGH:HINDUNILVR[2],LOW:HINDUNILVR[3],PREVCLOSE:HINDUNILVR[4],LTP:HINDUNILVR[5],CHNG:HINDUNILVR[6],CHANGPercentage:HINDUNILVR[7],VOLUME:HINDUNILVR[8],VALUE:HINDUNILVR[9],fiftyTwo_WH:HINDUNILVR[10],fiftyTwo_WL:HINDUNILVR[11],TODAY:HINDUNILVR[12],Date:moment().format('l'),Time:moment().format('LT')}
    let data = JSON.stringify({
        data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11
    });
    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:8000/App/api/v1/scrapData',
    headers: { 
        'Content-Type': 'application/json'
        },
    data : data
    };
    axios.request(config)
    .then((response) => {
    console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
    console.log(error);
    });
    console.log(data1);
    console.log('stocks fetched sucsfully');
    // console.log(head);

    if (!stocks[0][0] || !head[0]){
        console.log("undefined")
        main();
    }else{
        gsRun(client,stocks);
    }
    setInterval(() => {
        browser.close();
    }, 20000);


}

main();


    //Inserting data  from sheet 1
async function gsRun(client,stocks){

    const gsApi = google.sheets({version:'v4',auth:client});

//Insert data in to  sheet //
    const updateOption= {
        spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
        range: 'Data!A2',
        valueInputOption:'USER_ENTERED',
        resource: {values:stocks}
    };

    let res = await gsApi.spreadsheets.values.update(updateOption); // post
    console.log(res.data,res.status);    
    //gsRun1(client);
};


//getting data from sheet1 and inserting into sheet 2
// async function gsRun1(client){
    
//     const gsApi = google.sheets({version:'v4',auth:client});
//     const opt = {
//         spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
//         range: 'Data!A2:N52' // range of data
//     };

//     let data = await gsApi.spreadsheets.values.get(opt);  // get 
//     let stocksData=data.data.values; 
//     //console.log(stocksData)
    
//     setTimeout(() => {
//         gsRun2(client,stocksData)
//     }, 60000);
    
// }

// //insert into sheet 2
// async function gsRun2(client,stocksData){

//     const gsApi = google.sheets({version:'v4',auth:client});
//             const updateOption1= {
//             spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
//             range: 'Data2!A2',
//             valueInputOption:'USER_ENTERED',
//             resource: {values:stocksData}
//         };
    
//         let res1 = await gsApi.spreadsheets.values.update(updateOption1); // post
//         console.log(res1.data,res1.status);
//             gsRun3(client);
        
        
//     }

// async function gsRun3(client){

//     const gsApi = google.sheets({version:'v4',auth:client});
//     const opt = {
//         spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
//         range: 'Data2!A2:N52' // range of data
//     };

//     let data = await gsApi.spreadsheets.values.get(opt);  // get 
//     let stocksData=data.data.values; 
//     //console.log(stocksData)
//     setTimeout(() => {
//         gsRun4(client,stocksData);
//     }, 60000);
    
// }

// async function gsRun4(client,stocksData){

//     const gsApi = google.sheets({version:'v4',auth:client});
//     const updateOption1= {
//         spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
//         range: 'Data3!A2',
//         valueInputOption:'USER_ENTERED',
//         resource: {values:stocksData}
//     };

//     let res1 = await gsApi.spreadsheets.values.update(updateOption1); // post
//     console.log(res1.data,res1.status);
//     setInterval(() => {
//         gsRun5(client);
//     }, 60000);
    
// }

// async function gsRun5(client){
//     const gsApi = google.sheets({version:'v4',auth:client});
//     const opt = {
//         spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
//         range: 'Data3!A2:N52' // range of data
//     };
//     let data = await gsApi.spreadsheets.values.get(opt);  // get 
//     let stocksData=data.data.values; 
//     writer.writeRecords(stocksData).then(() =>{
//     console.log("Data Saved offline DONE!");
//     }).catch((error) =>{
//     console.log(error);
//     })
// }

