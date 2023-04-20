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
const { Console } = require("console");
const writer = csvWriter.createArrayCsvWriter({
    path:path.resolve(__dirname,'record.csv'),
    header:['SYMBOL','OPEN','HIGH','LOW','PREVCLOSE','LTP','CHNG','CHANGPercentage','VOLUME','VALUE','fiftyTwo_WH','fiftyTwo_WL','TODAY','Date_Time']
});
const myInterval = setInterval(main, 120000);//for 10 min 60000
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
    if (!$){
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
   
    // const momentTime= moment()  // time For calculatting -10,im

    stocks.push([NIFTY50[0],NIFTY50[1],NIFTY50[2],NIFTY50[3],NIFTY50[4],NIFTY50[5],NIFTY50[6],NIFTY50[7],NIFTY50[8],NIFTY50[9],NIFTY50[10],NIFTY50[11],NIFTY50[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [LT[0],LT[1],LT[2],LT[3],LT[4],LT[5],LT[6],LT[7],LT[8],LT[9],LT[10],LT[11],LT[12],moment().format('DD-MM-YY'),moment().format('hh.mm')] );
    stocks.push( [HDFCBANK[0],HDFCBANK[1],HDFCBANK[2], HDFCBANK [3],HDFCBANK[4], HDFCBANK [5], HDFCBANK [6],HDFCBANK[7],HDFCBANK[8],HDFCBANK[9],HDFCBANK[10],HDFCBANK[11],HDFCBANK [12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [HDFC[0], HDFC[1],  HDFC[2], HDFC[3],HDFC[4], HDFC[5], HDFC[6],HDFC[7],HDFC[8],HDFC[9],HDFC[10],HDFC[11],HDFC[12],moment().format('DD-MM-YY'),moment().format('hh.mm')] );
    stocks.push( [ITC[0],ITC[1],ITC[2],ITC[3],ITC[4], ITC[5], ITC[6],ITC[7],ITC[8],ITC[9],ITC[10],ITC[11], ITC[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [HDFCLIFE[0], HDFCLIFE[1], HDFCLIFE[2],  HDFCLIFE[3],HDFCLIFE[4],HDFCLIFE[5],  HDFCLIFE[6],HDFCLIFE[7],HDFCLIFE[8],HDFCLIFE[9],HDFCLIFE[10],HDFCLIFE[11],HDFCLIFE[12],moment().format('DD-MM-YY'),moment().format('hh.mm')] );
    stocks.push( [TITAN[0],TITAN[1], TITAN[2], TITAN[3],TITAN[4], TITAN[5],TITAN[6],TITAN[7],TITAN[8],TITAN[9],TITAN[10],TITAN[11],TITAN[12],moment().format('DD-MM-YY'),moment().format('hh.mm')] );
    stocks.push( [TCS[0], TCS[1], TCS[2], TCS[3],TCS[4],TCS[5],  TCS[6],TCS[7],TCS[8],TCS[9],TCS[10],TCS[11], TCS[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [BAJFINANCE[0],BAJFINANCE[1],BAJFINANCE[2], BAJFINANCE[3],BAJFINANCE[4],  BAJFINANCE[5],  BAJFINANCE[6],BAJFINANCE[7],BAJFINANCE[8],BAJFINANCE[9],BAJFINANCE[10],BAJFINANCE[11], BAJFINANCE[12],moment().format('DD-MM-YY'),moment().format('hh.mm')] );
    stocks.push( [TATACONSUM[0],TATACONSUM[1], TATACONSUM[2], TATACONSUM[3],TATACONSUM[4],TATACONSUM[5],  TATACONSUM[6],TATACONSUM[7],TATACONSUM[8],TATACONSUM[9],TATACONSUM[10],TATACONSUM[11],TATACONSUM[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [COALINDIA[0], COALINDIA[1], COALINDIA[2], COALINDIA[3],COALINDIA[4],COALINDIA[5],COALINDIA[6],COALINDIA[7],COALINDIA[8],COALINDIA[9],COALINDIA[10],COALINDIA[11], COALINDIA[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [HCLTECH[0], HCLTECH[1], HCLTECH[2], HCLTECH[3],HCLTECH[4],HCLTECH[5],HCLTECH[6],HCLTECH[7],HCLTECH[8],HCLTECH[9],HCLTECH[10],HCLTECH[11], HCLTECH[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [SUNPHARMA[0],SUNPHARMA[1], SUNPHARMA[2], SUNPHARMA[3],SUNPHARMA[4],SUNPHARMA[5], SUNPHARMA[6],SUNPHARMA[7],SUNPHARMA[8],SUNPHARMA[9],SUNPHARMA[10],SUNPHARMA[11], SUNPHARMA[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [INFY[0], INFY[1], INFY[2], INFY[3],INFY[4],INFY[5],INFY[6],INFY[7],INFY[8],INFY[9],INFY[10],INFY[11],INFY[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [KOTAKBANK[0], KOTAKBANK[1], KOTAKBANK[2], KOTAKBANK[3],KOTAKBANK[4],KOTAKBANK[5],  KOTAKBANK[6],KOTAKBANK[7],KOTAKBANK[8],KOTAKBANK[9],KOTAKBANK[10],KOTAKBANK[11], KOTAKBANK[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [SBILIFE[0],SBILIFE[1], SBILIFE[2], SBILIFE[3],SBILIFE[4],SBILIFE[5],SBILIFE[6],SBILIFE[7],SBILIFE[8],SBILIFE[9],SBILIFE[10],SBILIFE[11],SBILIFE[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [WIPRO[0],WIPRO[1], WIPRO[2], WIPRO[3],WIPRO[4],WIPRO[5], WIPRO[6],WIPRO[7],WIPRO[8],WIPRO[9],WIPRO[10],WIPRO[11], WIPRO[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [BRITANNIA[0],BRITANNIA[1],BRITANNIA[2],BRITANNIA[3],BRITANNIA[4],BRITANNIA[5],BRITANNIA[6],BRITANNIA[7],BRITANNIA[8],BRITANNIA[9],BRITANNIA[10],BRITANNIA[11],BRITANNIA[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [TECHM[0],TECHM[1], TECHM[2], TECHM[3],TECHM[4],TECHM[5],TECHM[6],TECHM[7],TECHM[8],TECHM[9],TECHM[10],TECHM[11],TECHM[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [HINDUNILVR[0],HINDUNILVR[1], HINDUNILVR[2], HINDUNILVR[3],HINDUNILVR[4], HINDUNILVR[5], HINDUNILVR[6],HINDUNILVR[7],HINDUNILVR[8],HINDUNILVR[9],HINDUNILVR[10],HINDUNILVR[11], HINDUNILVR[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [TATASTEEL[0],TATASTEEL[1],TATASTEEL[2],TATASTEEL[3],TATASTEEL[4],TATASTEEL[5],TATASTEEL[6],TATASTEEL[7],TATASTEEL[8],TATASTEEL[9],TATASTEEL[10],TATASTEEL[11],TATASTEEL[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [ULTRACEMCO[0],ULTRACEMCO[1],ULTRACEMCO[2],ULTRACEMCO[3],ULTRACEMCO[4],ULTRACEMCO[5],ULTRACEMCO[6],ULTRACEMCO[7],ULTRACEMCO[8],ULTRACEMCO[9],ULTRACEMCO[10],ULTRACEMCO[11],ULTRACEMCO[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [ONGC[0], ONGC[1], ONGC[2], ONGC[3],ONGC[4],  ONGC[5], ONGC[6],ONGC[7], ONGC[8], ONGC[9], ONGC[10], ONGC[11], ONGC[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [JSWSTEEL[0], JSWSTEEL[1], JSWSTEEL[2],JSWSTEEL[3],JSWSTEEL[4],JSWSTEEL[5],JSWSTEEL[6],JSWSTEEL[7],JSWSTEEL[8],JSWSTEEL[9],JSWSTEEL[10],JSWSTEEL[11],JSWSTEEL[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [CIPLA[0],CIPLA[1],CIPLA[2],CIPLA[3],CIPLA[4],CIPLA[5], CIPLA[6],CIPLA[7],CIPLA[8],CIPLA[9],CIPLA[10],CIPLA[11],CIPLA[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [TATAMOTORS[0],TATAMOTORS[1],TATAMOTORS[2],TATAMOTORS[3],TATAMOTORS[4],TATAMOTORS[5],TATAMOTORS[6],TATAMOTORS[7],TATAMOTORS[8],TATAMOTORS[9],TATAMOTORS[10],TATAMOTORS[11],TATAMOTORS[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [BHARTIARTL[0],BHARTIARTL[1],BHARTIARTL[2],BHARTIARTL[3],BHARTIARTL[4],BHARTIARTL[5],BHARTIARTL[6],BHARTIARTL[7],BHARTIARTL[8],BHARTIARTL[9],BHARTIARTL[10],BHARTIARTL[11],BHARTIARTL[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [UPL[0],UPL[1],UPL[2],UPL[3],UPL[4],UPL[5],UPL[6],UPL[7],UPL[8],UPL[9],UPL[10],UPL[11],UPL[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [BAJAJFINSV[0],BAJAJFINSV[1],BAJAJFINSV[2],BAJAJFINSV[3],BAJAJFINSV[4],BAJAJFINSV[5],BAJAJFINSV[6],BAJAJFINSV[7],BAJAJFINSV[8],BAJAJFINSV[9],BAJAJFINSV[10],BAJAJFINSV[11],BAJAJFINSV[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [ADANIPORTS[0],ADANIPORTS[1],ADANIPORTS[2],ADANIPORTS[3],ADANIPORTS[4],ADANIPORTS[5],ADANIPORTS[6],ADANIPORTS[7],ADANIPORTS[8],ADANIPORTS[9],ADANIPORTS[10],ADANIPORTS[11],ADANIPORTS[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [DIVISLAB[0],DIVISLAB[1],DIVISLAB[2],DIVISLAB[3],DIVISLAB[4],DIVISLAB[5],DIVISLAB[6],DIVISLAB[7],DIVISLAB[8],DIVISLAB[9],DIVISLAB[10],DIVISLAB[11],DIVISLAB[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [BAJAJAUTO[0],BAJAJAUTO[1],BAJAJAUTO[2],BAJAJAUTO[3],BAJAJAUTO[4],BAJAJAUTO[5],BAJAJAUTO[6],BAJAJAUTO[7],BAJAJAUTO[8],BAJAJAUTO[9],BAJAJAUTO[10],BAJAJAUTO[11],BAJAJAUTO[12],moment().format('DD-MM-YY'),moment().format('hh.mm')] );
    stocks.push( [POWERGRID[0],POWERGRID[1],POWERGRID[2],POWERGRID[3],POWERGRID[4],POWERGRID[5],POWERGRID[6],POWERGRID[7],POWERGRID[8],POWERGRID[9],POWERGRID[10],POWERGRID[11],POWERGRID[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [DRREDDY[0],DRREDDY[1],DRREDDY[2],DRREDDY[3],DRREDDY[4],DRREDDY[5],DRREDDY[6],DRREDDY[7],DRREDDY[8],DRREDDY[9],DRREDDY[10],DRREDDY[11],DRREDDY[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [ASIANPAINT[0],ASIANPAINT[1],ASIANPAINT[2],ASIANPAINT[3],ASIANPAINT[4],ASIANPAINT[5],ASIANPAINT[6],ASIANPAINT[7],ASIANPAINT[8],ASIANPAINT[9],ASIANPAINT[10],ASIANPAINT[11],ASIANPAINT[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [NESTLEIND[0],NESTLEIND[1],NESTLEIND[2],NESTLEIND[3],NESTLEIND[4],NESTLEIND[5],NESTLEIND[6],NESTLEIND[7],NESTLEIND[8],NESTLEIND[9],NESTLEIND[10],NESTLEIND[11],NESTLEIND[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [BPCL[0],BPCL[1],BPCL[2],BPCL[3],BPCL[4],BPCL[5],BPCL[6],BPCL[7],BPCL[8],BPCL[9],BPCL[10],BPCL[11],BPCL[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [MandM[0],MandM[1],MandM[2],MandM[3],MandM[4],MandM[5],MandM[6],MandM[7],MandM[8],MandM[9],MandM[10],MandM[11],MandM[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [GRASIM[0],GRASIM[1],GRASIM[2],GRASIM[3],GRASIM[4],GRASIM[5],GRASIM[6],GRASIM[7],GRASIM[8],GRASIM[9],GRASIM[10],GRASIM[11],GRASIM[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [HEROMOTOCO[0],HEROMOTOCO[1],HEROMOTOCO[2],HEROMOTOCO[3],HEROMOTOCO[4],HEROMOTOCO[5],HEROMOTOCO[6],HEROMOTOCO[7],HEROMOTOCO[8],HEROMOTOCO[9],HEROMOTOCO[10],HEROMOTOCO[11],HEROMOTOCO[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [HINDALCO[0],HINDALCO[1],HINDALCO[2],HINDALCO[3],HINDALCO[4],HINDALCO[5],HINDALCO[6],HINDALCO[7],HINDALCO[8],HINDALCO[9],HINDALCO[10],HINDALCO[11],HINDALCO[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [ICICIBANK[0],ICICIBANK[1],ICICIBANK[2],ICICIBANK[3],ICICIBANK[4],ICICIBANK[5],ICICIBANK[6],ICICIBANK[7],ICICIBANK[8],ICICIBANK[9],ICICIBANK[10],ICICIBANK[11],ICICIBANK[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [MARUTI[0],MARUTI[1],MARUTI[2],MARUTI[3],MARUTI[4],MARUTI[5],MARUTI[6],MARUTI[7],MARUTI[8],MARUTI[9],MARUTI[10],MARUTI[11],MARUTI[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [AXISBANK[0],AXISBANK[1],AXISBANK[2],AXISBANK[3],AXISBANK[4],AXISBANK[5],AXISBANK[6],AXISBANK[7],AXISBANK[8],AXISBANK[9],AXISBANK[10],AXISBANK[11],AXISBANK[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [RELIANCE[0],RELIANCE[1],RELIANCE[2],RELIANCE[3],RELIANCE[4],RELIANCE[5],RELIANCE[6],RELIANCE[7],RELIANCE[8],RELIANCE[9],RELIANCE[10],RELIANCE[11],RELIANCE[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [APOLLOHOSP[0],APOLLOHOSP[1],APOLLOHOSP[2],APOLLOHOSP[3],APOLLOHOSP[4],APOLLOHOSP[5],APOLLOHOSP[6],APOLLOHOSP[7],APOLLOHOSP[8],APOLLOHOSP[9],APOLLOHOSP[10],APOLLOHOSP[11],APOLLOHOSP[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [NTPC[0],NTPC[1],NTPC[2],NTPC[3],NTPC[4],NTPC[5],NTPC[6],NTPC[7],NTPC[8],NTPC[9],NTPC[10],NTPC[11],NTPC[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [SBIN[0],SBIN[1],SBIN[2],SBIN[3],SBIN[4],SBIN[5],SBIN[6],SBIN[7],SBIN[8],SBIN[9],SBIN[10],SBIN[11],SBIN[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [INDUSINDBK[0],INDUSINDBK[1],INDUSINDBK[2],INDUSINDBK[3],INDUSINDBK[4],INDUSINDBK[5],INDUSINDBK[6],INDUSINDBK[7],INDUSINDBK[8],INDUSINDBK[9],INDUSINDBK[10],INDUSINDBK[11],INDUSINDBK[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [EICHERMOT[0],EICHERMOT[1],EICHERMOT[2],EICHERMOT[3],EICHERMOT[4],EICHERMOT[5],EICHERMOT[6],EICHERMOT[7],EICHERMOT[8],EICHERMOT[9],EICHERMOT[10],EICHERMOT[11],EICHERMOT[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    stocks.push( [ADANIENT[0],ADANIENT[1],ADANIENT[2],ADANIENT[3],ADANIENT[4],ADANIENT[5],ADANIENT[6],ADANIENT[7],ADANIENT[8],ADANIENT[9],ADANIENT[10],ADANIENT[11],ADANIENT[12],moment().format('DD-MM-YY'),moment().format('hh.mm')]);
    //Data  object  inserting in mongo using axios
    const momentTime= moment()
let data1 ={SYMBOL:NIFTY50[0],OPEN:NIFTY50[1],HIGH:NIFTY50[2],LOW:NIFTY50[3],PREVCLOSE:NIFTY50[4],LTP:NIFTY50[5],CHNG:NIFTY50[6],CHANGPercentage:NIFTY50[7],VOLUME:NIFTY50[8],VALUE:NIFTY50[9],fiftyTwo_WH:NIFTY50[10],fiftyTwo_WL:NIFTY50[11],TODAY:NIFTY50[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm'),Date_Time:momentTime.toString()}
let data2 ={SYMBOL:LT[0],OPEN:LT[1],HIGH:LT[2],LOW:LT[3],PREVCLOSE:LT[4],LTP:LT[5],CHNG:LT[6],CHANGPercentage:LT[7],VOLUME:LT[8],VALUE:LT[9],fiftyTwo_WH:LT[10],fiftyTwo_WL:LT[11],TODAY:LT[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data3 ={SYMBOL:HDFCBANK[0],OPEN:HDFCBANK[1],HIGH:HDFCBANK[2],LOW:HDFCBANK[3],PREVCLOSE:HDFCBANK[4],LTP:HDFCBANK[5],CHNG:HDFCBANK[6],CHANGPercentage:HDFCBANK[7],VOLUME:HDFCBANK[8],VALUE:HDFCBANK[9],fiftyTwo_WH:HDFCBANK[10],fiftyTwo_WL:HDFCBANK[11],TODAY:HDFCBANK[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data4 ={SYMBOL:HDFC[0],OPEN:HDFC[1],HIGH:HDFC[2],LOW:HDFC[3],PREVCLOSE:HDFC[4],LTP:HDFC[5],CHNG:HDFC[6],CHANGPercentage:HDFC[7],VOLUME:HDFC[8],VALUE:HDFC[9],fiftyTwo_WH:HDFC[10],fiftyTwo_WL:HDFC[11],TODAY:HDFC[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data5 ={SYMBOL:ITC[0],OPEN:ITC[1],HIGH:ITC[2],LOW:ITC[3],PREVCLOSE:ITC[4],LTP:ITC[5],CHNG:ITC[6],CHANGPercentage:ITC[7],VOLUME:ITC[8],VALUE:ITC[9],fiftyTwo_WH:ITC[10],fiftyTwo_WL:ITC[11],TODAY:ITC[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data6 ={SYMBOL:HDFCLIFE[0],OPEN:HDFCLIFE[1],HIGH:HDFCLIFE[2],LOW:HDFCLIFE[3],PREVCLOSE:HDFCLIFE[4],LTP:HDFCLIFE[5],CHNG:HDFCLIFE[6],CHANGPercentage:HDFCLIFE[7],VOLUME:HDFCLIFE[8],VALUE:HDFCLIFE[9],fiftyTwo_WH:HDFCLIFE[10],fiftyTwo_WL:HDFCLIFE[11],TODAY:HDFCLIFE[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data7 ={SYMBOL:TITAN[0],OPEN:TITAN[1],HIGH:TITAN[2],LOW:TITAN[3],PREVCLOSE:TITAN[4],LTP:TITAN[5],CHNG:TITAN[6],CHANGPercentage:TITAN[7],VOLUME:TITAN[8],VALUE:TITAN[9],fiftyTwo_WH:TITAN[10],fiftyTwo_WL:TITAN[11],TODAY:TITAN[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data8 ={SYMBOL:TCS[0],OPEN:TCS[1],HIGH:TCS[2],LOW:TCS[3],PREVCLOSE:TCS[4],LTP:TCS[5],CHNG:TCS[6],CHANGPercentage:TCS[7],VOLUME:TCS[8],VALUE:TCS[9],fiftyTwo_WH:TCS[10],fiftyTwo_WL:TCS[11],TODAY:TCS[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data9 ={SYMBOL:BAJFINANCE[0],OPEN:BAJFINANCE[1],HIGH:BAJFINANCE[2],LOW:BAJFINANCE[3],PREVCLOSE:BAJFINANCE[4],LTP:BAJFINANCE[5],CHNG:BAJFINANCE[6],CHANGPercentage:BAJFINANCE[7],VOLUME:BAJFINANCE[8],VALUE:BAJFINANCE[9],fiftyTwo_WH:BAJFINANCE[10],fiftyTwo_WL:BAJFINANCE[11],TODAY:BAJFINANCE[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data10 ={SYMBOL:TATACONSUM[0],OPEN:TATACONSUM[1],HIGH:TATACONSUM[2],LOW:TATACONSUM[3],PREVCLOSE:TATACONSUM[4],LTP:TATACONSUM[5],CHNG:TATACONSUM[6],CHANGPercentage:TATACONSUM[7],VOLUME:TATACONSUM[8],VALUE:TATACONSUM[9],fiftyTwo_WH:TATACONSUM[10],fiftyTwo_WL:TATACONSUM[11],TODAY:TATACONSUM[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data11 ={SYMBOL:COALINDIA[0],OPEN:COALINDIA[1],HIGH:COALINDIA[2],LOW:COALINDIA[3],PREVCLOSE:COALINDIA[4],LTP:COALINDIA[5],CHNG:COALINDIA[6],CHANGPercentage:COALINDIA[7],VOLUME:COALINDIA[8],VALUE:COALINDIA[9],fiftyTwo_WH:COALINDIA[10],fiftyTwo_WL:COALINDIA[11],TODAY:COALINDIA[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data12 ={SYMBOL:HCLTECH[0],OPEN:HCLTECH[1],HIGH:HCLTECH[2],LOW:HCLTECH[3],PREVCLOSE:HCLTECH[4],LTP:HCLTECH[5],CHNG:HCLTECH[6],CHANGPercentage:HCLTECH[7],VOLUME:HCLTECH[8],VALUE:HCLTECH[9],fiftyTwo_WH:HCLTECH[10],fiftyTwo_WL:HCLTECH[11],TODAY:HCLTECH[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data13 ={SYMBOL:SUNPHARMA[0],OPEN:SUNPHARMA[1],HIGH:SUNPHARMA[2],LOW:SUNPHARMA[3],PREVCLOSE:SUNPHARMA[4],LTP:SUNPHARMA[5],CHNG:SUNPHARMA[6],CHANGPercentage:SUNPHARMA[7],VOLUME:SUNPHARMA[8],VALUE:SUNPHARMA[9],fiftyTwo_WH:SUNPHARMA[10],fiftyTwo_WL:SUNPHARMA[11],TODAY:SUNPHARMA[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data14 ={SYMBOL:INFY[0],OPEN:INFY[1],HIGH:INFY[2],LOW:INFY[3],PREVCLOSE:INFY[4],LTP:INFY[5],CHNG:INFY[6],CHANGPercentage:INFY[7],VOLUME:INFY[8],VALUE:INFY[9],fiftyTwo_WH:INFY[10],fiftyTwo_WL:INFY[11],TODAY:INFY[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data15 ={SYMBOL:KOTAKBANK[0],OPEN:KOTAKBANK[1],HIGH:KOTAKBANK[2],LOW:KOTAKBANK[3],PREVCLOSE:KOTAKBANK[4],LTP:KOTAKBANK[5],CHNG:KOTAKBANK[6],CHANGPercentage:KOTAKBANK[7],VOLUME:KOTAKBANK[8],VALUE:KOTAKBANK[9],fiftyTwo_WH:KOTAKBANK[10],fiftyTwo_WL:KOTAKBANK[11],TODAY:KOTAKBANK[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data16 ={SYMBOL:SBILIFE[0],OPEN:SBILIFE[1],HIGH:SBILIFE[2],LOW:SBILIFE[3],PREVCLOSE:SBILIFE[4],LTP:SBILIFE[5],CHNG:SBILIFE[6],CHANGPercentage:SBILIFE[7],VOLUME:SBILIFE[8],VALUE:SBILIFE[9],fiftyTwo_WH:SBILIFE[10],fiftyTwo_WL:SBILIFE[11],TODAY:SBILIFE[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data17 ={SYMBOL:WIPRO[0],OPEN:WIPRO[1],HIGH:WIPRO[2],LOW:WIPRO[3],PREVCLOSE:WIPRO[4],LTP:WIPRO[5],CHNG:WIPRO[6],CHANGPercentage:WIPRO[7],VOLUME:WIPRO[8],VALUE:WIPRO[9],fiftyTwo_WH:WIPRO[10],fiftyTwo_WL:WIPRO[11],TODAY:WIPRO[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data18 ={SYMBOL:BRITANNIA[0],OPEN:BRITANNIA[1],HIGH:BRITANNIA[2],LOW:BRITANNIA[3],PREVCLOSE:BRITANNIA[4],LTP:BRITANNIA[5],CHNG:BRITANNIA[6],CHANGPercentage:BRITANNIA[7],VOLUME:BRITANNIA[8],VALUE:BRITANNIA[9],fiftyTwo_WH:BRITANNIA[10],fiftyTwo_WL:BRITANNIA[11],TODAY:BRITANNIA[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data19 ={SYMBOL:TECHM[0],OPEN:TECHM[1],HIGH:TECHM[2],LOW:TECHM[3],PREVCLOSE:TECHM[4],LTP:TECHM[5],CHNG:TECHM[6],CHANGPercentage:TECHM[7],VOLUME:TECHM[8],VALUE:TECHM[9],fiftyTwo_WH:TECHM[10],fiftyTwo_WL:TECHM[11],TODAY:TECHM[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data20 ={SYMBOL:HINDUNILVR[0],OPEN:HINDUNILVR[1],HIGH:HINDUNILVR[2],LOW:HINDUNILVR[3],PREVCLOSE:HINDUNILVR[4],LTP:HINDUNILVR[5],CHNG:HINDUNILVR[6],CHANGPercentage:HINDUNILVR[7],VOLUME:HINDUNILVR[8],VALUE:HINDUNILVR[9],fiftyTwo_WH:HINDUNILVR[10],fiftyTwo_WL:HINDUNILVR[11],TODAY:HINDUNILVR[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data21 ={SYMBOL:TATASTEEL[0],OPEN:TATASTEEL[1],HIGH:TATASTEEL[2],LOW:TATASTEEL[3],PREVCLOSE:TATASTEEL[4],LTP:TATASTEEL[5],CHNG:TATASTEEL[6],CHANGPercentage:TATASTEEL[7],VOLUME:TATASTEEL[8],VALUE:TATASTEEL[9],fiftyTwo_WH:TATASTEEL[10],fiftyTwo_WL:TATASTEEL[11],TODAY:TATASTEEL[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data22 ={SYMBOL:ULTRACEMCO[0],OPEN:ULTRACEMCO[1],HIGH:ULTRACEMCO[2],LOW:ULTRACEMCO[3],PREVCLOSE:ULTRACEMCO[4],LTP:ULTRACEMCO[5],CHNG:ULTRACEMCO[6],CHANGPercentage:ULTRACEMCO[7],VOLUME:ULTRACEMCO[8],VALUE:ULTRACEMCO[9],fiftyTwo_WH:ULTRACEMCO[10],fiftyTwo_WL:ULTRACEMCO[11],TODAY:ULTRACEMCO[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data23 ={SYMBOL:ONGC[0],OPEN:ONGC[1],HIGH:ONGC[2],LOW:ONGC[3],PREVCLOSE:ONGC[4],LTP:ONGC[5],CHNG:ONGC[6],CHANGPercentage:ONGC[7],VOLUME:ONGC[8],VALUE:ONGC[9],fiftyTwo_WH:ONGC[10],fiftyTwo_WL:ONGC[11],TODAY:ONGC[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data24 ={SYMBOL:JSWSTEEL[0],OPEN:JSWSTEEL[1],HIGH:JSWSTEEL[2],LOW:JSWSTEEL[3],PREVCLOSE:JSWSTEEL[4],LTP:JSWSTEEL[5],CHNG:JSWSTEEL[6],CHANGPercentage:JSWSTEEL[7],VOLUME:JSWSTEEL[8],VALUE:JSWSTEEL[9],fiftyTwo_WH:JSWSTEEL[10],fiftyTwo_WL:JSWSTEEL[11],TODAY:JSWSTEEL[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data25 ={SYMBOL:CIPLA[0],OPEN:CIPLA[1],HIGH:CIPLA[2],LOW:CIPLA[3],PREVCLOSE:CIPLA[4],LTP:CIPLA[5],CHNG:CIPLA[6],CHANGPercentage:CIPLA[7],VOLUME:CIPLA[8],VALUE:CIPLA[9],fiftyTwo_WH:CIPLA[10],fiftyTwo_WL:CIPLA[11],TODAY:CIPLA[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data26 ={SYMBOL:TATAMOTORS[0],OPEN:TATAMOTORS[1],HIGH:TATAMOTORS[2],LOW:TATAMOTORS[3],PREVCLOSE:TATAMOTORS[4],LTP:TATAMOTORS[5],CHNG:TATAMOTORS[6],CHANGPercentage:TATAMOTORS[7],VOLUME:TATAMOTORS[8],VALUE:TATAMOTORS[9],fiftyTwo_WH:TATAMOTORS[10],fiftyTwo_WL:TATAMOTORS[11],TODAY:TATAMOTORS[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data27 ={SYMBOL:BHARTIARTL[0],OPEN:BHARTIARTL[1],HIGH:BHARTIARTL[2],LOW:BHARTIARTL[3],PREVCLOSE:BHARTIARTL[4],LTP:BHARTIARTL[5],CHNG:BHARTIARTL[6],CHANGPercentage:BHARTIARTL[7],VOLUME:BHARTIARTL[8],VALUE:BHARTIARTL[9],fiftyTwo_WH:BHARTIARTL[10],fiftyTwo_WL:BHARTIARTL[11],TODAY:BHARTIARTL[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data28 ={SYMBOL:UPL[0],OPEN:UPL[1],HIGH:UPL[2],LOW:UPL[3],PREVCLOSE:UPL[4],LTP:UPL[5],CHNG:UPL[6],CHANGPercentage:UPL[7],VOLUME:UPL[8],VALUE:UPL[9],fiftyTwo_WH:UPL[10],fiftyTwo_WL:UPL[11],TODAY:UPL[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data29 ={SYMBOL:BAJAJFINSV[0],OPEN:BAJAJFINSV[1],HIGH:BAJAJFINSV[2],LOW:BAJAJFINSV[3],PREVCLOSE:BAJAJFINSV[4],LTP:BAJAJFINSV[5],CHNG:BAJAJFINSV[6],CHANGPercentage:BAJAJFINSV[7],VOLUME:BAJAJFINSV[8],VALUE:BAJAJFINSV[9],fiftyTwo_WH:BAJAJFINSV[10],fiftyTwo_WL:BAJAJFINSV[11],TODAY:BAJAJFINSV[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data30 ={SYMBOL:ADANIPORTS[0],OPEN:ADANIPORTS[1],HIGH:ADANIPORTS[2],LOW:ADANIPORTS[3],PREVCLOSE:ADANIPORTS[4],LTP:ADANIPORTS[5],CHNG:ADANIPORTS[6],CHANGPercentage:ADANIPORTS[7],VOLUME:ADANIPORTS[8],VALUE:ADANIPORTS[9],fiftyTwo_WH:ADANIPORTS[10],fiftyTwo_WL:ADANIPORTS[11],TODAY:ADANIPORTS[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data31 ={SYMBOL:DIVISLAB[0],OPEN:DIVISLAB[1],HIGH:DIVISLAB[2],LOW:DIVISLAB[3],PREVCLOSE:DIVISLAB[4],LTP:DIVISLAB[5],CHNG:DIVISLAB[6],CHANGPercentage:DIVISLAB[7],VOLUME:DIVISLAB[8],VALUE:DIVISLAB[9],fiftyTwo_WH:DIVISLAB[10],fiftyTwo_WL:DIVISLAB[11],TODAY:DIVISLAB[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data32 ={SYMBOL:BAJAJAUTO[0],OPEN:BAJAJAUTO[1],HIGH:BAJAJAUTO[2],LOW:BAJAJAUTO[3],PREVCLOSE:BAJAJAUTO[4],LTP:BAJAJAUTO[5],CHNG:BAJAJAUTO[6],CHANGPercentage:BAJAJAUTO[7],VOLUME:BAJAJAUTO[8],VALUE:BAJAJAUTO[9],fiftyTwo_WH:BAJAJAUTO[10],fiftyTwo_WL:BAJAJAUTO[11],TODAY:BAJAJAUTO[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data33 ={SYMBOL:POWERGRID[0],OPEN:POWERGRID[1],HIGH:POWERGRID[2],LOW:POWERGRID[3],PREVCLOSE:POWERGRID[4],LTP:POWERGRID[5],CHNG:POWERGRID[6],CHANGPercentage:POWERGRID[7],VOLUME:POWERGRID[8],VALUE:POWERGRID[9],fiftyTwo_WH:POWERGRID[10],fiftyTwo_WL:POWERGRID[11],TODAY:POWERGRID[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data34 ={SYMBOL:DRREDDY[0],OPEN:DRREDDY[1],HIGH:DRREDDY[2],LOW:DRREDDY[3],PREVCLOSE:DRREDDY[4],LTP:DRREDDY[5],CHNG:DRREDDY[6],CHANGPercentage:DRREDDY[7],VOLUME:DRREDDY[8],VALUE:DRREDDY[9],fiftyTwo_WH:DRREDDY[10],fiftyTwo_WL:DRREDDY[11],TODAY:DRREDDY[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data35 ={SYMBOL:ASIANPAINT[0],OPEN:ASIANPAINT[1],HIGH:ASIANPAINT[2],LOW:ASIANPAINT[3],PREVCLOSE:ASIANPAINT[4],LTP:ASIANPAINT[5],CHNG:ASIANPAINT[6],CHANGPercentage:ASIANPAINT[7],VOLUME:ASIANPAINT[8],VALUE:ASIANPAINT[9],fiftyTwo_WH:ASIANPAINT[10],fiftyTwo_WL:ASIANPAINT[11],TODAY:ASIANPAINT[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data36 ={SYMBOL:NESTLEIND[0],OPEN:NESTLEIND[1],HIGH:NESTLEIND[2],LOW:NESTLEIND[3],PREVCLOSE:NESTLEIND[4],LTP:NESTLEIND[5],CHNG:NESTLEIND[6],CHANGPercentage:NESTLEIND[7],VOLUME:NESTLEIND[8],VALUE:NESTLEIND[9],fiftyTwo_WH:NESTLEIND[10],fiftyTwo_WL:NESTLEIND[11],TODAY:NESTLEIND[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data37 ={SYMBOL:BPCL[0],OPEN:BPCL[1],HIGH:BPCL[2],LOW:BPCL[3],PREVCLOSE:BPCL[4],LTP:BPCL[5],CHNG:BPCL[6],CHANGPercentage:BPCL[7],VOLUME:BPCL[8],VALUE:BPCL[9],fiftyTwo_WH:BPCL[10],fiftyTwo_WL:BPCL[11],TODAY:BPCL[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data38 ={SYMBOL:MandM[0],OPEN:MandM[1],HIGH:MandM[2],LOW:MandM[3],PREVCLOSE:MandM[4],LTP:MandM[5],CHNG:MandM[6],CHANGPercentage:MandM[7],VOLUME:MandM[8],VALUE:MandM[9],fiftyTwo_WH:MandM[10],fiftyTwo_WL:MandM[11],TODAY:MandM[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data39 ={SYMBOL:GRASIM[0],OPEN:GRASIM[1],HIGH:GRASIM[2],LOW:GRASIM[3],PREVCLOSE:GRASIM[4],LTP:GRASIM[5],CHNG:GRASIM[6],CHANGPercentage:GRASIM[7],VOLUME:GRASIM[8],VALUE:GRASIM[9],fiftyTwo_WH:GRASIM[10],fiftyTwo_WL:GRASIM[11],TODAY:GRASIM[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data40 ={SYMBOL:HEROMOTOCO[0],OPEN:HEROMOTOCO[1],HIGH:HEROMOTOCO[2],LOW:HEROMOTOCO[3],PREVCLOSE:HEROMOTOCO[4],LTP:HEROMOTOCO[5],CHNG:HEROMOTOCO[6],CHANGPercentage:HEROMOTOCO[7],VOLUME:HEROMOTOCO[8],VALUE:HEROMOTOCO[9],fiftyTwo_WH:HEROMOTOCO[10],fiftyTwo_WL:HEROMOTOCO[11],TODAY:HEROMOTOCO[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data41 ={SYMBOL:HINDALCO[0],OPEN:HINDALCO[1],HIGH:HINDALCO[2],LOW:HINDALCO[3],PREVCLOSE:HINDALCO[4],LTP:HINDALCO[5],CHNG:HINDALCO[6],CHANGPercentage:HINDALCO[7],VOLUME:HINDALCO[8],VALUE:HINDALCO[9],fiftyTwo_WH:HINDALCO[10],fiftyTwo_WL:HINDALCO[11],TODAY:HINDALCO[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data42 ={SYMBOL:ICICIBANK[0],OPEN:ICICIBANK[1],HIGH:ICICIBANK[2],LOW:ICICIBANK[3],PREVCLOSE:ICICIBANK[4],LTP:ICICIBANK[5],CHNG:ICICIBANK[6],CHANGPercentage:ICICIBANK[7],VOLUME:ICICIBANK[8],VALUE:ICICIBANK[9],fiftyTwo_WH:ICICIBANK[10],fiftyTwo_WL:ICICIBANK[11],TODAY:ICICIBANK[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data43 ={SYMBOL:MARUTI[0],OPEN:MARUTI[1],HIGH:MARUTI[2],LOW:MARUTI[3],PREVCLOSE:MARUTI[4],LTP:MARUTI[5],CHNG:MARUTI[6],CHANGPercentage:MARUTI[7],VOLUME:MARUTI[8],VALUE:MARUTI[9],fiftyTwo_WH:MARUTI[10],fiftyTwo_WL:MARUTI[11],TODAY:MARUTI[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data44 ={SYMBOL:AXISBANK[0],OPEN:AXISBANK[1],HIGH:AXISBANK[2],LOW:AXISBANK[3],PREVCLOSE:AXISBANK[4],LTP:AXISBANK[5],CHNG:AXISBANK[6],CHANGPercentage:AXISBANK[7],VOLUME:AXISBANK[8],VALUE:AXISBANK[9],fiftyTwo_WH:AXISBANK[10],fiftyTwo_WL:AXISBANK[11],TODAY:AXISBANK[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data45 ={SYMBOL:RELIANCE[0],OPEN:RELIANCE[1],HIGH:RELIANCE[2],LOW:RELIANCE[3],PREVCLOSE:RELIANCE[4],LTP:RELIANCE[5],CHNG:RELIANCE[6],CHANGPercentage:RELIANCE[7],VOLUME:RELIANCE[8],VALUE:RELIANCE[9],fiftyTwo_WH:RELIANCE[10],fiftyTwo_WL:RELIANCE[11],TODAY:RELIANCE[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data46 ={SYMBOL:APOLLOHOSP[0],OPEN:APOLLOHOSP[1],HIGH:APOLLOHOSP[2],LOW:APOLLOHOSP[3],PREVCLOSE:APOLLOHOSP[4],LTP:APOLLOHOSP[5],CHNG:APOLLOHOSP[6],CHANGPercentage:APOLLOHOSP[7],VOLUME:APOLLOHOSP[8],VALUE:APOLLOHOSP[9],fiftyTwo_WH:APOLLOHOSP[10],fiftyTwo_WL:APOLLOHOSP[11],TODAY:APOLLOHOSP[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data47 ={SYMBOL:NTPC[0],OPEN:NTPC[1],HIGH:NTPC[2],LOW:NTPC[3],PREVCLOSE:NTPC[4],LTP:NTPC[5],CHNG:NTPC[6],CHANGPercentage:NTPC[7],VOLUME:NTPC[8],VALUE:NTPC[9],fiftyTwo_WH:NTPC[10],fiftyTwo_WL:NTPC[11],TODAY:NTPC[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data48 ={SYMBOL:SBIN[0],OPEN:SBIN[1],HIGH:SBIN[2],LOW:SBIN[3],PREVCLOSE:SBIN[4],LTP:SBIN[5],CHNG:SBIN[6],CHANGPercentage:SBIN[7],VOLUME:SBIN[8],VALUE:SBIN[9],fiftyTwo_WH:SBIN[10],fiftyTwo_WL:SBIN[11],TODAY:SBIN[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data49 ={SYMBOL:INDUSINDBK[0],OPEN:INDUSINDBK[1],HIGH:INDUSINDBK[2],LOW:INDUSINDBK[3],PREVCLOSE:INDUSINDBK[4],LTP:INDUSINDBK[5],CHNG:INDUSINDBK[6],CHANGPercentage:INDUSINDBK[7],VOLUME:INDUSINDBK[8],VALUE:INDUSINDBK[9],fiftyTwo_WH:INDUSINDBK[10],fiftyTwo_WL:INDUSINDBK[11],TODAY:INDUSINDBK[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data50 ={SYMBOL:EICHERMOT[0],OPEN:EICHERMOT[1],HIGH:EICHERMOT[2],LOW:EICHERMOT[3],PREVCLOSE:EICHERMOT[4],LTP:EICHERMOT[5],CHNG:EICHERMOT[6],CHANGPercentage:EICHERMOT[7],VOLUME:EICHERMOT[8],VALUE:EICHERMOT[9],fiftyTwo_WH:EICHERMOT[10],fiftyTwo_WL:EICHERMOT[11],TODAY:EICHERMOT[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}
let data51 ={SYMBOL:ADANIENT[0],OPEN:ADANIENT[1],HIGH:ADANIENT[2],LOW:ADANIENT[3],PREVCLOSE:ADANIENT[4],LTP:ADANIENT[5],CHNG:ADANIENT[6],CHANGPercentage:ADANIENT[7],VOLUME:ADANIENT[8],VALUE:ADANIENT[9],fiftyTwo_WH:ADANIENT[10],fiftyTwo_WL:ADANIENT[11],TODAY:ADANIENT[12],Date:moment().format('DD-MM-YY'),Time:moment().format('hh.mm')}

        let data = JSON.stringify({
        data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,
        data11,data12,data13,data14,data15,data16,data17,data18,data19,data20,
        data21, data22,data23,data24,data25,data26,data27,data28,data29,data30, 
        data31,data32,data33,data34,data35,data36,data37,data38,data39,data40, 
        data41,data42,data43,data44,data45,data46,data47,data48,data49,data50,
        data51
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
    //console.log(JSON.stringify(response.data[0]));
    })
    .catch((error) => {
    console.log(error);
    });
    console.log("572: Post request");
    console.log('573: stocks fetched sucsfully');
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

//Insert data in to  sheet 2 //
    const updateOption= {
        spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
        range: 'Data!A2',
        valueInputOption:'USER_ENTERED',
        resource: {values:stocks}
    };
  
    let res = await gsApi.spreadsheets.values.update(updateOption); // post
    console.log(res.status);    
    const date =moment().format('DD-MM-YY')
    const time = moment().subtract(10,"m").format('hh.mm')
      //for Sheet 2//
let data = '';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:8000/App/api/v1/getScrapData/',
  headers: {date:date.toString(),time: time.toString()},
  data : data
};

axios.request(config)
.then((response) => {
  console.log(`622: Get request for sheet 2 with time ${time}`)
 covert(response.data,1)
})
.catch((error) => {
  console.log(error);
});
  //for Sheet 3//
  const time1 = moment().subtract(20,"m").format('hh.mm')
let dataA = '';

let configA = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:8000/App/api/v1/getScrapData20',
  headers: { date:date.toString(),time1: time1.toString()},
  data : dataA
};

axios.request(configA)
.then((response) => {
  console.log(`641: Get request for sheet 3 with time ${time1}`);
  covert(response.data,2)
})
.catch((error) => {
  console.log(error);
});

};
function covert(data,funcNu){
    resData =data[0].SYMBOL
    let GetStock = []
    console.log("652: Data converted >>>")
    GetStock.push([data[0].SYMBOL,data[0].OPEN,data[0].HIGH,data[0].LOW,data[0].PREVCLOSE,data[0].LTP,data[0].CHNG,data[0].CHANGPercentage,data[0].VOLUME,data[0].VALUE,data[0].fiftyTwo_WH,data[0].fiftyTwo_WL,data[0].TODAY,data[0].Date,data[0].Time]);
    GetStock.push([data[1].SYMBOL,data[1].OPEN,data[1].HIGH,data[1].LOW,data[1].PREVCLOSE,data[1].LTP,data[1].CHNG,data[1].CHANGPercentage,data[1].VOLUME,data[1].VALUE,data[1].fiftyTwo_WH,data[1].fiftyTwo_WL,data[1].TODAY,data[1].Date,data[1].Time]);
    GetStock.push([data[2].SYMBOL,data[2].OPEN,data[2].HIGH,data[2].LOW,data[2].PREVCLOSE,data[2].LTP,data[2].CHNG,data[2].CHANGPercentage,data[2].VOLUME,data[2].VALUE,data[2].fiftyTwo_WH,data[2].fiftyTwo_WL,data[2].TODAY,data[2].Date,data[2].Time]);
    GetStock.push([data[3].SYMBOL,data[3].OPEN,data[3].HIGH,data[3].LOW,data[2].PREVCLOSE,data[3].LTP,data[3].CHNG,data[3].CHANGPercentage,data[3].VOLUME,data[3].VALUE,data[3].fiftyTwo_WH,data[3].fiftyTwo_WL,data[3].TODAY,data[3].Date,data[3].Time]);
    GetStock.push([data[4].SYMBOL,data[4].OPEN,data[4].HIGH,data[4].LOW,data[4].PREVCLOSE,data[4].LTP,data[4].CHNG,data[4].CHANGPercentage,data[4].VOLUME,data[4].VALUE,data[4].fiftyTwo_WH,data[4].fiftyTwo_WL,data[4].TODAY,data[4].Date,data[4].Time]);
    GetStock.push([data[5].SYMBOL,data[4].OPEN,data[5].HIGH,data[5].LOW,data[5].PREVCLOSE,data[5].LTP,data[5].CHNG,data[5].CHANGPercentage,data[5].VOLUME,data[5].VALUE,data[5].fiftyTwo_WH,data[5].fiftyTwo_WL,data[5].TODAY,data[5].Date,data[5].Time]);
    GetStock.push([data[6].SYMBOL,data[6].OPEN,data[6].HIGH,data[6].LOW,data[6].PREVCLOSE,data[6].LTP,data[6].CHNG,data[6].CHANGPercentage,data[6].VOLUME,data[6].VALUE,data[6].fiftyTwo_WH,data[6].fiftyTwo_WL,data[6].TODAY,data[6].Date,data[6].Time]);
    GetStock.push([data[7].SYMBOL,data[7].OPEN,data[7].HIGH,data[7].LOW,data[7].PREVCLOSE,data[7].LTP,data[7].CHNG,data[7].CHANGPercentage,data[7].VOLUME,data[7].VALUE,data[7].fiftyTwo_WH,data[7].fiftyTwo_WL,data[7].TODAY,data[7].Date,data[7].Time]);
    GetStock.push([data[8].SYMBOL,data[8].OPEN,data[8].HIGH,data[8].LOW,data[8].PREVCLOSE,data[8].LTP,data[8].CHNG,data[8].CHANGPercentage,data[8].VOLUME,data[8].VALUE,data[8].fiftyTwo_WH,data[8].fiftyTwo_WL,data[8].TODAY,data[8].Date,data[8].Time]);
    GetStock.push([data[9].SYMBOL,data[9].OPEN,data[9].HIGH,data[9].LOW,data[9].PREVCLOSE,data[9].LTP,data[9].CHNG,data[9].CHANGPercentage,data[9].VOLUME,data[9].VALUE,data[9].fiftyTwo_WH,data[9].fiftyTwo_WL,data[9].TODAY,data[9].Date,data[9].Time]);
    GetStock.push([data[10].SYMBOL,data[10].OPEN,data[10].HIGH,data[10].LOW,data[10].PREVCLOSE,data[10].LTP,data[10].CHNG,data[10].CHANGPercentage,data[10].VOLUME,data[10].VALUE,data[10].fiftyTwo_WH,data[10].fiftyTwo_WL,data[10].TODAY,data[10].Date,data[10].Time]);
    GetStock.push([data[11].SYMBOL,data[11].OPEN,data[11].HIGH,data[11].LOW,data[11].PREVCLOSE,data[11].LTP,data[11].CHNG,data[11].CHANGPercentage,data[11].VOLUME,data[11].VALUE,data[11].fiftyTwo_WH,data[11].fiftyTwo_WL,data[11].TODAY,data[11].Date,data[11].Time]);
    GetStock.push([data[12].SYMBOL,data[12].OPEN,data[12].HIGH,data[12].LOW,data[12].PREVCLOSE,data[12].LTP,data[12].CHNG,data[12].CHANGPercentage,data[12].VOLUME,data[12].VALUE,data[12].fiftyTwo_WH,data[12].fiftyTwo_WL,data[12].TODAY,data[12].Date,data[12].Time]);
    GetStock.push([data[13].SYMBOL,data[13].OPEN,data[13].HIGH,data[13].LOW,data[13].PREVCLOSE,data[13].LTP,data[13].CHNG,data[13].CHANGPercentage,data[13].VOLUME,data[13].VALUE,data[13].fiftyTwo_WH,data[13].fiftyTwo_WL,data[13].TODAY,data[13].Date,data[13].Time]);
    GetStock.push([data[14].SYMBOL,data[14].OPEN,data[14].HIGH,data[14].LOW,data[14].PREVCLOSE,data[14].LTP,data[14].CHNG,data[14].CHANGPercentage,data[14].VOLUME,data[14].VALUE,data[14].fiftyTwo_WH,data[14].fiftyTwo_WL,data[14].TODAY,data[14].Date,data[14].Time]);
    GetStock.push([data[15].SYMBOL,data[15].OPEN,data[15].HIGH,data[15].LOW,data[15].PREVCLOSE,data[15].LTP,data[15].CHNG,data[15].CHANGPercentage,data[15].VOLUME,data[15].VALUE,data[15].fiftyTwo_WH,data[15].fiftyTwo_WL,data[15].TODAY,data[15].Date,data[15].Time]);
    GetStock.push([data[16].SYMBOL,data[16].OPEN,data[16].HIGH,data[16].LOW,data[16].PREVCLOSE,data[16].LTP,data[16].CHNG,data[16].CHANGPercentage,data[16].VOLUME,data[16].VALUE,data[16].fiftyTwo_WH,data[16].fiftyTwo_WL,data[16].TODAY,data[16].Date,data[16].Time]);
    GetStock.push([data[17].SYMBOL,data[17].OPEN,data[17].HIGH,data[17].LOW,data[17].PREVCLOSE,data[17].LTP,data[17].CHNG,data[17].CHANGPercentage,data[17].VOLUME,data[17].VALUE,data[17].fiftyTwo_WH,data[17].fiftyTwo_WL,data[17].TODAY,data[17].Date,data[17].Time]);
    GetStock.push([data[18].SYMBOL,data[18].OPEN,data[18].HIGH,data[18].LOW,data[18].PREVCLOSE,data[18].LTP,data[18].CHNG,data[18].CHANGPercentage,data[18].VOLUME,data[18].VALUE,data[18].fiftyTwo_WH,data[18].fiftyTwo_WL,data[18].TODAY,data[18].Date,data[18].Time]);
    GetStock.push([data[19].SYMBOL,data[19].OPEN,data[19].HIGH,data[19].LOW,data[19].PREVCLOSE,data[19].LTP,data[19].CHNG,data[19].CHANGPercentage,data[19].VOLUME,data[19].VALUE,data[19].fiftyTwo_WH,data[19].fiftyTwo_WL,data[19].TODAY,data[19].Date,data[19].Time]);
    GetStock.push([data[20].SYMBOL,data[20].OPEN,data[20].HIGH,data[20].LOW,data[20].PREVCLOSE,data[20].LTP,data[20].CHNG,data[20].CHANGPercentage,data[20].VOLUME,data[20].VALUE,data[20].fiftyTwo_WH,data[20].fiftyTwo_WL,data[20].TODAY,data[20].Date,data[20].Time]);
    GetStock.push([data[21].SYMBOL,data[21].OPEN,data[21].HIGH,data[21].LOW,data[21].PREVCLOSE,data[21].LTP,data[21].CHNG,data[21].CHANGPercentage,data[21].VOLUME,data[21].VALUE,data[21].fiftyTwo_WH,data[21].fiftyTwo_WL,data[21].TODAY,data[21].Date,data[21].Time]);
    GetStock.push([data[22].SYMBOL,data[22].OPEN,data[22].HIGH,data[22].LOW,data[22].PREVCLOSE,data[22].LTP,data[22].CHNG,data[22].CHANGPercentage,data[22].VOLUME,data[22].VALUE,data[22].fiftyTwo_WH,data[22].fiftyTwo_WL,data[22].TODAY,data[22].Date,data[22].Time]);
    GetStock.push([data[23].SYMBOL,data[23].OPEN,data[23].HIGH,data[23].LOW,data[23].PREVCLOSE,data[23].LTP,data[23].CHNG,data[23].CHANGPercentage,data[23].VOLUME,data[23].VALUE,data[23].fiftyTwo_WH,data[23].fiftyTwo_WL,data[23].TODAY,data[23].Date,data[23].Time]);
    GetStock.push([data[24].SYMBOL,data[24].OPEN,data[24].HIGH,data[24].LOW,data[24].PREVCLOSE,data[24].LTP,data[24].CHNG,data[24].CHANGPercentage,data[24].VOLUME,data[24].VALUE,data[24].fiftyTwo_WH,data[24].fiftyTwo_WL,data[24].TODAY,data[24].Date,data[24].Time]);
    GetStock.push([data[25].SYMBOL,data[25].OPEN,data[25].HIGH,data[25].LOW,data[25].PREVCLOSE,data[25].LTP,data[25].CHNG,data[25].CHANGPercentage,data[25].VOLUME,data[25].VALUE,data[25].fiftyTwo_WH,data[25].fiftyTwo_WL,data[25].TODAY,data[25].Date,data[25].Time]);
    GetStock.push([data[26].SYMBOL,data[26].OPEN,data[26].HIGH,data[26].LOW,data[26].PREVCLOSE,data[26].LTP,data[26].CHNG,data[26].CHANGPercentage,data[26].VOLUME,data[26].VALUE,data[26].fiftyTwo_WH,data[26].fiftyTwo_WL,data[26].TODAY,data[26].Date,data[26].Time]);
    GetStock.push([data[27].SYMBOL,data[27].OPEN,data[27].HIGH,data[27].LOW,data[27].PREVCLOSE,data[27].LTP,data[27].CHNG,data[27].CHANGPercentage,data[27].VOLUME,data[27].VALUE,data[27].fiftyTwo_WH,data[27].fiftyTwo_WL,data[27].TODAY,data[27].Date,data[27].Time]);
    GetStock.push([data[28].SYMBOL,data[28].OPEN,data[28].HIGH,data[28].LOW,data[28].PREVCLOSE,data[27].LTP,data[28].CHNG,data[28].CHANGPercentage,data[28].VOLUME,data[28].VALUE,data[28].fiftyTwo_WH,data[28].fiftyTwo_WL,data[28].TODAY,data[28].Date,data[28].Time]);
    GetStock.push([data[29].SYMBOL,data[29].OPEN,data[29].HIGH,data[29].LOW,data[29].PREVCLOSE,data[29].LTP,data[29].CHNG,data[29].CHANGPercentage,data[29].VOLUME,data[29].VALUE,data[29].fiftyTwo_WH,data[29].fiftyTwo_WL,data[29].TODAY,data[29].Date,data[29].Time]);
    GetStock.push([data[30].SYMBOL,data[30].OPEN,data[30].HIGH,data[30].LOW,data[30].PREVCLOSE,data[30].LTP,data[30].CHNG,data[30].CHANGPercentage,data[30].VOLUME,data[30].VALUE,data[30].fiftyTwo_WH,data[30].fiftyTwo_WL,data[30].TODAY,data[30].Date,data[30].Time]);
    GetStock.push([data[31].SYMBOL,data[31].OPEN,data[31].HIGH,data[31].LOW,data[31].PREVCLOSE,data[31].LTP,data[31].CHNG,data[31].CHANGPercentage,data[31].VOLUME,data[31].VALUE,data[31].fiftyTwo_WH,data[31].fiftyTwo_WL,data[31].TODAY,data[31].Date,data[31].Time]);
    GetStock.push([data[32].SYMBOL,data[32].OPEN,data[32].HIGH,data[32].LOW,data[32].PREVCLOSE,data[32].LTP,data[32].CHNG,data[32].CHANGPercentage,data[32].VOLUME,data[32].VALUE,data[32].fiftyTwo_WH,data[32].fiftyTwo_WL,data[32].TODAY,data[32].Date,data[32].Time]);
    GetStock.push([data[33].SYMBOL,data[33].OPEN,data[33].HIGH,data[33].LOW,data[33].PREVCLOSE,data[33].LTP,data[33].CHNG,data[33].CHANGPercentage,data[33].VOLUME,data[33].VALUE,data[33].fiftyTwo_WH,data[33].fiftyTwo_WL,data[33].TODAY,data[33].Date,data[33].Time]);
    GetStock.push([data[34].SYMBOL,data[34].OPEN,data[34].HIGH,data[34].LOW,data[34].PREVCLOSE,data[34].LTP,data[34].CHNG,data[34].CHANGPercentage,data[34].VOLUME,data[34].VALUE,data[34].fiftyTwo_WH,data[34].fiftyTwo_WL,data[34].TODAY,data[34].Date,data[34].Time]);
    GetStock.push([data[35].SYMBOL,data[35].OPEN,data[35].HIGH,data[35].LOW,data[35].PREVCLOSE,data[35].LTP,data[35].CHNG,data[35].CHANGPercentage,data[35].VOLUME,data[35].VALUE,data[35].fiftyTwo_WH,data[35].fiftyTwo_WL,data[35].TODAY,data[35].Date,data[35].Time]);
    GetStock.push([data[36].SYMBOL,data[36].OPEN,data[36].HIGH,data[36].LOW,data[36].PREVCLOSE,data[36].LTP,data[36].CHNG,data[36].CHANGPercentage,data[36].VOLUME,data[36].VALUE,data[36].fiftyTwo_WH,data[36].fiftyTwo_WL,data[36].TODAY,data[36].Date,data[36].Time]);
    GetStock.push([data[37].SYMBOL,data[37].OPEN,data[37].HIGH,data[37].LOW,data[37].PREVCLOSE,data[37].LTP,data[37].CHNG,data[37].CHANGPercentage,data[37].VOLUME,data[37].VALUE,data[37].fiftyTwo_WH,data[37].fiftyTwo_WL,data[37].TODAY,data[37].Date,data[37].Time]);
    GetStock.push([data[38].SYMBOL,data[38].OPEN,data[38].HIGH,data[38].LOW,data[38].PREVCLOSE,data[38].LTP,data[38].CHNG,data[38].CHANGPercentage,data[38].VOLUME,data[38].VALUE,data[38].fiftyTwo_WH,data[38].fiftyTwo_WL,data[38].TODAY,data[38].Date,data[38].Time]);
    GetStock.push([data[39].SYMBOL,data[39].OPEN,data[39].HIGH,data[39].LOW,data[39].PREVCLOSE,data[39].LTP,data[49].CHNG,data[49].CHANGPercentage,data[49].VOLUME,data[49].VALUE,data[49].fiftyTwo_WH,data[49].fiftyTwo_WL,data[49].TODAY,data[49].Date,data[49].Time]);
    GetStock.push([data[40].SYMBOL,data[40].OPEN,data[40].HIGH,data[40].LOW,data[40].PREVCLOSE,data[40].LTP,data[40].CHNG,data[40].CHANGPercentage,data[40].VOLUME,data[40].VALUE,data[40].fiftyTwo_WH,data[40].fiftyTwo_WL,data[40].TODAY,data[40].Date,data[40].Time]);
    GetStock.push([data[41].SYMBOL,data[41].OPEN,data[41].HIGH,data[41].LOW,data[41].PREVCLOSE,data[41].LTP,data[41].CHNG,data[41].CHANGPercentage,data[41].VOLUME,data[41].VALUE,data[41].fiftyTwo_WH,data[41].fiftyTwo_WL,data[41].TODAY,data[41].Date,data[41].Time]);
    GetStock.push([data[42].SYMBOL,data[42].OPEN,data[42].HIGH,data[42].LOW,data[42].PREVCLOSE,data[42].LTP,data[42].CHNG,data[42].CHANGPercentage,data[42].VOLUME,data[42].VALUE,data[42].fiftyTwo_WH,data[42].fiftyTwo_WL,data[42].TODAY,data[42].Date,data[42].Time]);
    GetStock.push([data[43].SYMBOL,data[43].OPEN,data[43].HIGH,data[43].LOW,data[43].PREVCLOSE,data[43].LTP,data[43].CHNG,data[43].CHANGPercentage,data[43].VOLUME,data[43].VALUE,data[43].fiftyTwo_WH,data[43].fiftyTwo_WL,data[43].TODAY,data[43].Date,data[43].Time]);
    GetStock.push([data[44].SYMBOL,data[44].OPEN,data[44].HIGH,data[44].LOW,data[44].PREVCLOSE,data[44].LTP,data[44].CHNG,data[44].CHANGPercentage,data[44].VOLUME,data[44].VALUE,data[44].fiftyTwo_WH,data[44].fiftyTwo_WL,data[44].TODAY,data[44].Date,data[44].Time]);
    GetStock.push([data[45].SYMBOL,data[45].OPEN,data[45].HIGH,data[45].LOW,data[45].PREVCLOSE,data[45].LTP,data[45].CHNG,data[45].CHANGPercentage,data[45].VOLUME,data[45].VALUE,data[45].fiftyTwo_WH,data[45].fiftyTwo_WL,data[45].TODAY,data[45].Date,data[45].Time]);
    GetStock.push([data[46].SYMBOL,data[46].OPEN,data[46].HIGH,data[46].LOW,data[46].PREVCLOSE,data[46].LTP,data[46].CHNG,data[46].CHANGPercentage,data[46].VOLUME,data[46].VALUE,data[46].fiftyTwo_WH,data[46].fiftyTwo_WL,data[46].TODAY,data[46].Date,data[46].Time]);
    GetStock.push([data[47].SYMBOL,data[47].OPEN,data[47].HIGH,data[47].LOW,data[47].PREVCLOSE,data[47].LTP,data[47].CHNG,data[47].CHANGPercentage,data[47].VOLUME,data[47].VALUE,data[47].fiftyTwo_WH,data[47].fiftyTwo_WL,data[47].TODAY,data[47].Date,data[47].Time]);
    GetStock.push([data[48].SYMBOL,data[48].OPEN,data[48].HIGH,data[48].LOW,data[48].PREVCLOSE,data[48].LTP,data[48].CHNG,data[48].CHANGPercentage,data[48].VOLUME,data[48].VALUE,data[48].fiftyTwo_WH,data[48].fiftyTwo_WL,data[48].TODAY,data[48].Date,data[48].Time]);
    GetStock.push([data[49].SYMBOL,data[49].OPEN,data[49].HIGH,data[49].LOW,data[49].PREVCLOSE,data[49].LTP,data[49].CHNG,data[49].CHANGPercentage,data[49].VOLUME,data[49].VALUE,data[49].fiftyTwo_WH,data[49].fiftyTwo_WL,data[49].TODAY,data[49].Date,data[49].Time]);
    GetStock.push([data[50].SYMBOL,data[50].OPEN,data[50].HIGH,data[50].LOW,data[50].PREVCLOSE,data[50].LTP,data[50].CHNG,data[50].CHANGPercentage,data[50].VOLUME,data[50].VALUE,data[50].fiftyTwo_WH,data[50].fiftyTwo_WL,data[50].TODAY,data[50].Date,data[50].Time]);
        if(funcNu==1){
            gsRun2(client,GetStock)
        }
        if(funcNu==2){
            gsRun4(client,GetStock)
        }
        
    
    
} 
 //insert into sheet 2
async function gsRun2(client,stocksData){

    const gsApi = google.sheets({version:'v4',auth:client});
            const updateOption1= {
            spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
            range: 'Data2!A2',
            valueInputOption:'USER_ENTERED',
            resource: {values:stocksData}
        };
    
        let res1 = await gsApi.spreadsheets.values.update(updateOption1); // post
        console.log("726: >>>>Sheet 2 updated",res1.status);
            // gsRun3(client);
        
        
    }

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

async function gsRun4(client,stocksData){

    const gsApi = google.sheets({version:'v4',auth:client});
    const updateOption1= {
        spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
        range: 'Data3!A2',
        valueInputOption:'USER_ENTERED',
        resource: {values:stocksData}
    };

    let res1 = await gsApi.spreadsheets.values.update(updateOption1); // post
    console.log("761: >>>> Sheet 3 updated",res1.status);
    
}

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

