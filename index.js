const request = require("request-promise");
const cheerio = require("cheerio");
const axios = require('axios');
const puppeteer = require('puppeteer');
const {google}= require('googleapis');
const key = require('./keys.json');
const path = require('path');
const csvWriter = require('csv-writer');
const writer = csvWriter.createObjectCsvWriter({
    path: path.resolve(__dirname, 'stocks.csv'),
    header: [
      { id: 'symbol', title: 'Symbol' },
      { id: 'open', title: 'Open' },
      { id: 'high', title: 'High' },
      { id: 'low' , title: 'low' },
      { id: 'ltp', title: 'LTP' },
      { id: 'chng', title: 'chng' },
      { id: 'today', title: 'Today' },
    ],
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
    await page.goto("https://www.nseindia.com/market-data/live-equity-market?symbol=NIFTY%2050");
    await page.waitForSelector("#equityStockTable")
    const html = await page.content();


    const $ = cheerio.load(html);
   
    //all table headers
    let head = [];
    let headers = [];
    $('#equityStockTable > thead > tr > th')
    .each((index, element) =>{ 
        // console.log($(element).text());
        head.push($(element).text());
    })

    headers.push(head[0].toString())
    headers.push( head[1].toString())
    headers.push(head[2].toString())
    headers.push(head[3].toString())
    headers.push(head[5].toString())
    headers.push(head[6].toString())
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

    //  //HDFCBANK DATA
    //  let HDFCBANK = [];
    //  $("#equityStockTable > tbody > tr:nth-child(3) > td").each((i,e) =>{
    //      // console.log($(e).text());
    //      HDFCBANK.push($(e).text())
    //  })

    //  //HDFC DATA
    //  let HDFC = [];
    //  $("#equityStockTable > tbody > tr:nth-child(4) > td").each((i,e) =>{
    //      // console.log($(e).text());
    //      HDFC.push($(e).text())
    //  })

    //  //ITC DATA
    //  let ITC = [];
    //  $("#equityStockTable > tbody > tr:nth-child(5) > td").each((i,e) =>{
    //      // console.log($(e).text());
    //      ITC.push($(e).text())
    //  })

    //  //HDFCLIFE DATA
    //  let HDFCLIFE = [];
    //  $("#equityStockTable > tbody > tr:nth-child(6) > td").each((i,e) =>{
    //      // console.log($(e).text());
    //      HDFCLIFE.push($(e).text())
    //  })
    
    //  //TITAN DATA
    //  let TITAN = [];
    //  $("#equityStockTable > tbody > tr:nth-child(7) > td").each((i,e) =>{
    //      // console.log($(e).text());
    //      TITAN.push($(e).text())
    //  })

    //  //TCS DATA
    //  let TCS = [];
    //  $("#equityStockTable > tbody > tr:nth-child(8) > td").each((i,e) =>{
    //      // console.log($(e).text());
    //      TCS.push($(e).text())
    //  })
    // //BAJFINANCE DATA
    // let BAJFINANCE = [];
    
    // $("#equityStockTable > tbody > tr:nth-child(9) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     BAJFINANCE.push($(e).text())
    // })



    // // TATACONSUM DATA
    // let TATACONSUM = [];
    // $("#equityStockTable > tbody > tr:nth-child(10) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     TATACONSUM.push($(e).text())
    // })
    
    // //COALINDIA DATA
    // let COALINDIA = [];
    // $("#equityStockTable > tbody > tr:nth-child(11) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     COALINDIA.push($(e).text())
    // })

    //  //HCLTECH DATA
    //  let HCLTECH = [];
    //  $("#equityStockTable > tbody > tr:nth-child(12) > td").each((i,e) =>{
    //      // console.log($(e).text());
    //      HCLTECH.push($(e).text())
    //  })

    //   //SUNPHARMA DATA
    // let SUNPHARMA = [];
    // $("#equityStockTable > tbody > tr:nth-child(13) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     SUNPHARMA.push($(e).text())
    // })

    //  //INFY DATA
    //  let INFY = [];
    //  $("#equityStockTable > tbody > tr:nth-child(14) > td").each((i,e) =>{
    //      // console.log($(e).text());
    //      INFY.push($(e).text())
    //  })

    //   //KOTAKBANK DATA
    // let KOTAKBANK = [];
    // $("#equityStockTable > tbody > tr:nth-child(15) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     KOTAKBANK.push($(e).text())
    // })

    //  //SBILIFE DATA
    //  let SBILIFE = [];
    //  $("#equityStockTable > tbody > tr:nth-child(16) > td").each((i,e) =>{
    //      // console.log($(e).text());
    //      SBILIFE.push($(e).text())
    //  })

    //   //WIPRO DATA
    // let WIPRO = [];
    // $("#equityStockTable > tbody > tr:nth-child(17) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     WIPRO.push($(e).text())
    // })

    //  //BRITANNIA DATA
    //  let BRITANNIA = [];
    //  $("#equityStockTable > tbody > tr:nth-child(18) > td").each((i,e) =>{
    //      // console.log($(e).text());
    //      BRITANNIA.push($(e).text())
    //  })

    //   //TECHM DATA
    // let TECHM = [];
    // $("#equityStockTable > tbody > tr:nth-child(19) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     TECHM.push($(e).text())
    // })

    //    //HINDUNILVR DATA
    //    let HINDUNILVR = [];
    //    $("#equityStockTable > tbody > tr:nth-child(20) > td").each((i,e) =>{
    //        // console.log($(e).text());
    //        HINDUNILVR.push($(e).text())
    //    })
    //       //TATASTEEL DATA
    // let TATASTEEL = [];
    // $("#equityStockTable > tbody > tr:nth-child(21) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     TATASTEEL.push($(e).text())
    // })
    //    //ULTRACEMCO DATA
    //    let ULTRACEMCO = [];
    //    $("#equityStockTable > tbody > tr:nth-child(22) > td").each((i,e) =>{
    //        // console.log($(e).text());
    //        ULTRACEMCO.push($(e).text())
    //    })
    //       //ONGC DATA
    // let ONGC = [];
    // $("#equityStockTable > tbody > tr:nth-child(23) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     ONGC.push($(e).text())
    // })
    //    //JSWSTEEL DATA
    //    let JSWSTEEL = [];
    //    $("#equityStockTable > tbody > tr:nth-child(24) > td").each((i,e) =>{
    //        // console.log($(e).text());
    //        JSWSTEEL.push($(e).text())
    //    })
    //       //CIPLA DATA
    // let CIPLA = [];
    // $("#equityStockTable > tbody > tr:nth-child(25) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     CIPLA.push($(e).text())
    // })
    //    //TATAMOTORS DATA
    //    let TATAMOTORS = [];
    //    $("#equityStockTable > tbody > tr:nth-child(26) > td").each((i,e) =>{
    //        // console.log($(e).text());
    //        TATAMOTORS.push($(e).text())
    //    })
    //       //BHARTIARTL	 DATA
    // let BHARTIARTL	 = [];
    // $("#equityStockTable > tbody > tr:nth-child(27) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     BHARTIARTL	.push($(e).text())
    // })
    //    //UPL DATA
    //    let UPL = [];
    //    $("#equityStockTable > tbody > tr:nth-child(28) > td").each((i,e) =>{
    //        // console.log($(e).text());
    //        UPL.push($(e).text())
    //    })
    //       //BAJAJFINSV DATA
    // let BAJAJFINSV = [];
    // $("#equityStockTable > tbody > tr:nth-child(29) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     BAJAJFINSV.push($(e).text())
    // })
    //    //ADANIPORTS DATA
    //    let ADANIPORTS = [];
    //    $("#equityStockTable > tbody > tr:nth-child(30) > td").each((i,e) =>{
    //        // console.log($(e).text());
    //        ADANIPORTS.push($(e).text())
    //    })
    //       //DIVISLAB DATA
    // let DIVISLAB = [];
    // $("#equityStockTable > tbody > tr:nth-child(31) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     DIVISLAB.push($(e).text())
    // })
    //    //BAJAJ-AUTO DATA
    //    let BAJAJAUTO = [];
    //    $("#equityStockTable > tbody > tr:nth-child(32) > td").each((i,e) =>{
    //        // console.log($(e).text());
    //        BAJAJAUTO.push($(e).text())
    //    })
    //       //POWERGRID DATA
    // let POWERGRID = [];
    // $("#equityStockTable > tbody > tr:nth-child(33) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     POWERGRID.push($(e).text())
    // })

    //       //DRREDDY DATA
    //       let DRREDDY = [];
    //       $("#equityStockTable > tbody > tr:nth-child(34) > td").each((i,e) =>{
    //           // console.log($(e).text());
    //           DRREDDY.push($(e).text())
    //       })

    //             //ASIANPAINT DATA
    // let ASIANPAINT = [];
    // $("#equityStockTable > tbody > tr:nth-child(35) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     ASIANPAINT.push($(e).text())
    // })

    //       //NESTLEIND DATA
    //       let NESTLEIND = [];
    //       $("#equityStockTable > tbody > tr:nth-child(36) > td").each((i,e) =>{
    //           // console.log($(e).text());
    //           NESTLEIND.push($(e).text())
    //       })

    //             //BPCL DATA
    // let BPCL = [];
    // $("#equityStockTable > tbody > tr:nth-child(37) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     BPCL.push($(e).text())
    // })

    //       //M&M DATA
    //       let MandM = [];
    //       $("#equityStockTable > tbody > tr:nth-child(38) > td").each((i,e) =>{
    //           // console.log($(e).text());
    //           MandM.push($(e).text())
    //       })

    //             //GRASIM DATA
    // let GRASIM = [];
    // $("#equityStockTable > tbody > tr:nth-child(39) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     GRASIM.push($(e).text())
    // })

    //       //HEROMOTOCO	 DATA
    //       let HEROMOTOCO	 = [];
    //       $("#equityStockTable > tbody > tr:nth-child(40) > td").each((i,e) =>{
    //           // console.log($(e).text());
    //           HEROMOTOCO	.push($(e).text())
    //       })

    //             //HINDALCO DATA
    // let HINDALCO = [];
    // $("#equityStockTable > tbody > tr:nth-child(41) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     HINDALCO.push($(e).text())
    // })

    //       //ICICIBANK DATA
    //       let ICICIBANK = [];
    //       $("#equityStockTable > tbody > tr:nth-child(42) > td").each((i,e) =>{
    //           // console.log($(e).text());
    //           ICICIBANK.push($(e).text())
    //       })

    //             //MARUTI DATA
    // let MARUTI = [];
    // $("#equityStockTable > tbody > tr:nth-child(43) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     MARUTI.push($(e).text())
    // })

    //       //AXISBANK DATA
    //       let AXISBANK = [];
    //       $("#equityStockTable > tbody > tr:nth-child(44) > td").each((i,e) =>{
    //           // console.log($(e).text());
    //           AXISBANK.push($(e).text())
    //       })

    //             //RELIANCE DATA
    // let RELIANCE = [];
    // $("#equityStockTable > tbody > tr:nth-child(45) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     RELIANCE.push($(e).text())
    // })

    //       //APOLLOHOSP	 DATA
    //       let APOLLOHOSP	 = [];
    //       $("#equityStockTable > tbody > tr:nth-child(46) > td").each((i,e) =>{
    //           // console.log($(e).text());
    //           APOLLOHOSP.push($(e).text())
    //       })

    //             //NTPC DATA
    // let NTPC = [];
    // $("#equityStockTable > tbody > tr:nth-child(47) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     NTPC.push($(e).text())
    // })

    //       //SBIN DATA
    //       let SBIN = [];
    //       $("#equityStockTable > tbody > tr:nth-child(48) > td").each((i,e) =>{
    //           // console.log($(e).text());
    //           SBIN.push($(e).text())
    //       })

    //             //INDUSINDBK DATA
    // let INDUSINDBK = [];
    // $("#equityStockTable > tbody > tr:nth-child(49) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     INDUSINDBK.push($(e).text())
    // })

    //       //EICHERMOT DATA
    //       let EICHERMOT = [];
    //       $("#equityStockTable > tbody > tr:nth-child(50) > td").each((i,e) =>{
    //           // console.log($(e).text());
    //           EICHERMOT.push($(e).text())
    //       })

    //             //ADANIENT DATA
    // let ADANIENT = [];
    // $("#equityStockTable > tbody > tr:nth-child(51) > td").each((i,e) =>{
    //     // console.log($(e).text());
    //     ADANIENT.push($(e).text())
    // })
    



    stocks.push([ NIFTY50[0],NIFTY50[1],NIFTY50[2],NIFTY50[3],NIFTY50[5],NIFTY50[6],NIFTY50[12]]);

    stocks.push( [LT[0],LT[1],LT[2], LT[3],LT[5],LT[6],LT[12] ] );

    // stocks.push( [HDFCBANK[0],HDFCBANK[1],HDFCBANK[2], HDFCBANK [3], HDFCBANK [5], HDFCBANK [6],HDFCBANK [12]]);

    // stocks.push( [HDFC[1], HDFC[2],  HDFC[3], HDFC[5], HDFC[6],HDFC[12]] );

    // stocks.push( [ITC[0],ITC[2], ITC[3], ITC[5], ITC[6], ITC[12]]);

    // stocks.push( [HDFCLIFE[0], HDFCLIFE[1], HDFCLIFE[2],  HDFCLIFE[3],  HDFCLIFE[5],  HDFCLIFE[6],HDFCLIFE[12]] );
    
    // stocks.push( [TITAN[0], TITAN[1], TITAN[2], TITAN[3], TITAN[5],TITAN[6],TITAN[12]] );

    // stocks.push( [TCS[0], TCS[1], TCS[2], TCS[3], TCS[5],  TCS[6], TCS[12] ]);

    // stocks.push( [BAJFINANCE[0],BAJFINANCE[1],BAJFINANCE[2], BAJFINANCE[3],  BAJFINANCE[5],  BAJFINANCE[6], BAJFINANCE[12]] );

    // stocks.push( [TATACONSUM[0],TATACONSUM[1], TATACONSUM[2], TATACONSUM[3],  TATACONSUM[5],  TATACONSUM[6], TATACONSUM[12]]);

    // stocks.push( [COALINDIA[0], COALINDIA[1], COALINDIA[2], COALINDIA[3],  COALINDIA[5],  COALINDIA[6], COALINDIA[12]] );

    // stocks.push( [HCLTECH[0], HCLTECH[1], HCLTECH[2], HCLTECH[3],  HCLTECH[5],  HCLTECH[6], HCLTECH[12]] );

    // stocks.push( [SUNPHARMA[0], SUNPHARMA[1], SUNPHARMA[2], SUNPHARMA[3],  SUNPHARMA[5],  SUNPHARMA[6], SUNPHARMA[12]] );
    // stocks.push( [INFY[0], INFY[1], INFY[2], INFY[3],  INFY[5],  INFY[6], INFY[12] ] );
    // stocks.push( [KOTAKBANK[0], KOTAKBANK[1], KOTAKBANK[2], KOTAKBANK[3],  KOTAKBANK[5],  KOTAKBANK[6], KOTAKBANK[12]] );
    // stocks.push( [SBILIFE[0], SBILIFE[1], SBILIFE[2], SBILIFE[3],  SBILIFE[5],  SBILIFE[6], SBILIFE[12]] );
    // stocks.push( [WIPRO[0], WIPRO[1], WIPRO[2], WIPRO[3],  WIPRO[5],  WIPRO[6], WIPRO[12]] );
    // stocks.push( [BRITANNIA[0], BRITANNIA[1], BRITANNIA[2], BRITANNIA[3],  BRITANNIA[5],  BRITANNIA[6], BRITANNIA[12]] );
    // stocks.push( [TECHM[0], TECHM[1], TECHM[2], TECHM[3],  TECHM[5],  TECHM[6], TECHM[12]] );
    // stocks.push( [HINDUNILVR[0],HINDUNILVR[1], HINDUNILVR[2], HINDUNILVR[3],  HINDUNILVR[5],  HINDUNILVR[6], HINDUNILVR[12]] );
    // stocks.push( [TATASTEEL[0], TATASTEEL[1], TATASTEEL[2], TATASTEEL[3],  TATASTEEL[5],  TATASTEEL[6], TATASTEEL[12]]);
    // stocks.push( [ULTRACEMCO[0], ULTRACEMCO[1], ULTRACEMCO[2], ULTRACEMCO[3],  ULTRACEMCO[5],  ULTRACEMCO[6], ULTRACEMCO[12]] );
    // stocks.push( [ONGC[0], ONGC[1], ONGC[2], ONGC[3],  ONGC[5],  ONGC[6], ONGC[12]] );
    // stocks.push( [JSWSTEEL[0], JSWSTEEL[1], JSWSTEEL[2], JSWSTEEL[3],  JSWSTEEL[5],  JSWSTEEL[6], JSWSTEEL[12]] );
    // stocks.push( [CIPLA[0], CIPLA[1], CIPLA[2], CIPLA[3],  CIPLA[5],  CIPLA[6], CIPLA[12]] );
    // stocks.push( [TATAMOTORS[0], TATAMOTORS[1], TATAMOTORS[2], TATAMOTORS[3],  TATAMOTORS[5],  TATAMOTORS[6], TATAMOTORS[12]]);
    // stocks.push( [BHARTIARTL[0], BHARTIARTL[1], BHARTIARTL[2], BHARTIARTL[3],  BHARTIARTL[5],  BHARTIARTL[6], BHARTIARTL[12]] );
    // stocks.push( [UPL[0], UPL[1], UPL[2], UPL[3],  UPL[5],  UPL[6], UPL[12]]);
    // stocks.push( [BAJAJFINSV[0], BAJAJFINSV[1], BAJAJFINSV[2], BAJAJFINSV[3],  BAJAJFINSV[5],  BAJAJFINSV[6], BAJAJFINSV[12]] );
    // stocks.push( [ADANIPORTS[0], ADANIPORTS[1], ADANIPORTS[2], ADANIPORTS[3],  ADANIPORTS[5],  ADANIPORTS[6], ADANIPORTS[12]] );
    // stocks.push( [DIVISLAB[0], DIVISLAB[1], DIVISLAB[2], DIVISLAB[3],  DIVISLAB[5],  DIVISLAB[6], DIVISLAB[12]] );
    // stocks.push( [BAJAJAUTO[0], BAJAJAUTO[1], BAJAJAUTO[2], BAJAJAUTO[3],  BAJAJAUTO[5],  BAJAJAUTO[6], BAJAJAUTO[12]] );
    // stocks.push( [POWERGRID[0], POWERGRID[1], POWERGRID[2], POWERGRID[3],  POWERGRID[5],  POWERGRID[6], POWERGRID[12]] );
    // stocks.push( [DRREDDY[0], DRREDDY[1], DRREDDY[2], DRREDDY[3],  DRREDDY[5],  DRREDDY[6], DRREDDY[12]] );
    // stocks.push( [ASIANPAINT[0], ASIANPAINT[1], ASIANPAINT[2], ASIANPAINT[3],  ASIANPAINT[5],  ASIANPAINT[6], ASIANPAINT[12]] );
    // stocks.push( [NESTLEIND[0], NESTLEIND[1], NESTLEIND[2], NESTLEIND[3],  NESTLEIND[5],  NESTLEIND[6], NESTLEIND[12] ]);
    // stocks.push( [BPCL[0], BPCL[1], BPCL[2], BPCL[3],  BPCL[5],  BPCL[6], BPCL[12]] );
    // stocks.push( [MandM[0], MandM[1], MandM[2], MandM[3],  MandM[5],  MandM[6], MandM[12]] );
    // stocks.push( [GRASIM[0], GRASIM[1], GRASIM[2], GRASIM[3],  GRASIM[5],  GRASIM[6], GRASIM[12]] );
    // stocks.push( [HEROMOTOCO[0], HEROMOTOCO[1], HEROMOTOCO[2], HEROMOTOCO[3],  HEROMOTOCO[5],  HEROMOTOCO[6], HEROMOTOCO[12]] );
    // stocks.push( [HINDALCO[0], HINDALCO[1], HINDALCO[2], HINDALCO[3],  HINDALCO[5],  HINDALCO[6], HINDALCO[12]] );
    // stocks.push( [ICICIBANK[0], ICICIBANK[1], ICICIBANK[2], ICICIBANK[3],  ICICIBANK[5],  ICICIBANK[6], ICICIBANK[12]]);
    // stocks.push( [MARUTI[0], MARUTI[1], MARUTI[2], MARUTI[3],  MARUTI[5],  MARUTI[6], MARUTI[12] ]);
    // stocks.push( [AXISBANK[0], AXISBANK[1], AXISBANK[2], AXISBANK[3],  AXISBANK[5],  AXISBANK[6], AXISBANK[12]] );
    // stocks.push( [RELIANCE[0], RELIANCE[1], RELIANCE[2], RELIANCE[3],  RELIANCE[5],  RELIANCE[6], RELIANCE[12]] );
    // stocks.push( [APOLLOHOSP[0],APOLLOHOSP[1], APOLLOHOSP[2], APOLLOHOSP[3],  APOLLOHOSP[5],  APOLLOHOSP[6], APOLLOHOSP[12]] );
    // stocks.push( [NTPC[0], NTPC[1],NTPC[2], NTPC[3],  NTPC[5],  NTPC[6], NTPC[12]] );
    // stocks.push( [SBIN[0], SBIN[1],SBIN[2], SBIN[3],  SBIN[5],  SBIN[6], SBIN[12]] );
    // stocks.push( [INDUSINDBK[0],INDUSINDBK[1], INDUSINDBK[2], INDUSINDBK[3],  INDUSINDBK[5],  INDUSINDBK[6], INDUSINDBK[12]]);
    // stocks.push( [EICHERMOT[0],EICHERMOT[1], EICHERMOT[2], EICHERMOT[3],  EICHERMOT[5],  EICHERMOT[6], EICHERMOT[12]] );
    // stocks.push( [ADANIENT[0], ADANIENT[1], ADANIENT[2], ADANIENT[3],  ADANIENT[5],  ADANIENT[6], ADANIENT[12]] );


    console.log(stocks);
    console.log(head);
    console.log(headers);



    // google sheet writer //
    
   




    // writer.writeRecords(stocks)
    // .then(() =>{
    //     console.log("DONE!");
    // }).catch((error) =>{
    //     console.log(error);
    // })
    // { name: '', Symbol:'', '', '','', '', '',''}
    // $('#equityStockTable > tbody > tr > td')
    // .each((index, element) =>{ 
    //     console.log($(element).text());
    // })
}



main();






//get data  from sheet 
async function gsRun(client,stocks){
    
    const gsApi = google.sheets({version:'v4',auth:client});
    // const opt = {
    //     spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
    //     range: 'Data!A1:B5' // range of data
    // };

    // let data = await gsApi.spreadsheets.values.get(opt);  // get 
    // console.log(data.data.values);

//Insert data in to  sheet //
    const updateOption= {
        spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
        range: 'Data!A2',
        valueInputOption:'USER_ENTERED',
        resource: {values:stocks}
    };

    let res = await gsApi.spreadsheets.values.update(updateOption); // post
    console.log(res);

    


};
