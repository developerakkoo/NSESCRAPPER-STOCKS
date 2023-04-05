const request = require("request-promise");
const cheerio = require("cheerio");
const axios = require('axios');
const puppeteer = require('puppeteer');
const path = require('path');
const csvWriter = require('csv-writer');
const writer = csvWriter.createObjectCsvWriter({
    path: path.resolve(__dirname, 'stocks.csv'),
    header: [
      { id: 'symbol', title: 'Symbol' },
      { id: 'open', title: 'Open' },
      { id: 'high', title: 'High' },
      { id: 'low', title: 'Low' },
      { id: 'ltp', title: 'LTP' },
      { id: 'chng', title: 'chng' },
      { id: 'today', title: 'Today' },
    ],
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
           BAJAJ-AUTO.push($(e).text())
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
    



    stocks.push( { symbol:NIFTY50[0], open:NIFTY50[1], high:NIFTY50[2], low: NIFTY50[3], ltp: NIFTY50[5], chng: NIFTY50[6],today: NIFTY50[12]} );
    stocks.push( { symbol:LT[0], open:LT[1], high:LT[2], low: LT[3], ltp: LT[5], chng: LT[6],today: LT[12]} );
    stocks.push( { symbol:HDFCBANK[0], open:HDFCBANK[1], high:HDFCBANK[2], low:HDFCBANK [3], ltp:HDFCBANK [5], chng:HDFCBANK [6],today:HDFCBANK [12]} );
    stocks.push( { symbol:HDFC[0], open:HDFC[1], high:HDFC[2], low: HDFC[3], ltp: HDFC[5], chng: HDFC[6],today: HDFC[12]} );
    stocks.push( { symbol:ITC[0], open:ITC[1], high:ITC[2], low: ITC[3], ltp: ITC[5], chng: ITC[6],today: ITC[12]} );
    stocks.push( { symbol:HDFCLIFE[0], open:HDFCLIFE[1], high:HDFCLIFE[2], low: HDFCLIFE[3], ltp: HDFCLIFE[5], chng: HDFCLIFE[6],today: HDFCLIFE[12]} );
    stocks.push( { symbol:TITAN[0], open:TITAN[1], high:TITAN[2], low: TITAN[3], ltp: TITAN[5], chng: TITAN[6],today: TITAN[12]} );
    stocks.push( { symbol:TCS[0], open:TCS[1], high:TCS[2], low: TCS[3], ltp: TCS[5], chng: TCS[6],today: TCS[12]} );
    stocks.push( { symbol:BAJFINANCE[0], open:BAJFINANCE[1], high:BAJFINANCE[2], low: BAJFINANCE[3], ltp: BAJFINANCE[5], chng: BAJFINANCE[6],today: BAJFINANCE[12]} );
    stocks.push( { symbol:TATACONSUM[0], open:TATACONSUM[1], high:TATACONSUM[2], low: TATACONSUM[3], ltp: TATACONSUM[5], chng: TATACONSUM[6],today: TATACONSUM[12]} );
    stocks.push( { symbol:COALINDIA[0], open:COALINDIA[1], high:COALINDIA[2], low: COALINDIA[3], ltp: COALINDIA[5], chng: COALINDIA[6],today: COALINDIA[12]} );
    stocks.push( { symbol:HCLTECH[0], open:HCLTECH[1], high:HCLTECH[2], low: HCLTECH[3], ltp: HCLTECH[5], chng: HCLTECH[6],today: HCLTECH[12]} );
    stocks.push( { symbol:SUNPHARMA[0], open:SUNPHARMA[1], high:SUNPHARMA[2], low: SUNPHARMA[3], ltp: SUNPHARMA[5], chng: SUNPHARMA[6],today: SUNPHARMA[12]} );
    stocks.push( { symbol:INFY[0], open:INFY[1], high:INFY[2], low: INFY[3], ltp: INFY[5], chng: INFY[6],today: INFY[12]} );
    stocks.push( { symbol:KOTAKBANK[0], open:KOTAKBANK[1], high:KOTAKBANK[2], low: KOTAKBANK[3], ltp: KOTAKBANK[5], chng: KOTAKBANK[6],today: KOTAKBANK[12]} );
    stocks.push( { symbol:SBILIFE[0], open:SBILIFE[1], high:SBILIFE[2], low: SBILIFE[3], ltp: SBILIFE[5], chng: SBILIFE[6],today: SBILIFE[12]} );
    stocks.push( { symbol:WIPRO[0], open:WIPRO[1], high:WIPRO[2], low: WIPRO[3], ltp: WIPRO[5], chng: WIPRO[6],today: WIPRO[12]} );
    stocks.push( { symbol:BRITANNIA[0], open:BRITANNIA[1], high:BRITANNIA[2], low: BRITANNIA[3], ltp: BRITANNIA[5], chng: BRITANNIA[6],today: BRITANNIA[12]} );
    stocks.push( { symbol:TECHM[0], open:TECHM[1], high:TECHM[2], low: TECHM[3], ltp: TECHM[5], chng: TECHM[6],today: TECHM[12]} );
    stocks.push( { symbol:HINDUNILVR[0], open:HINDUNILVR[1], high:HINDUNILVR[2], low: HINDUNILVR[3], ltp: HINDUNILVR[5], chng: HINDUNILVR[6],today: HINDUNILVR[12]} );
    stocks.push( { symbol:TATASTEEL[0], open:TATASTEEL[1], high:TATASTEEL[2], low: TATASTEEL[3], ltp: TATASTEEL[5], chng: TATASTEEL[6],today: TATASTEEL[12]} );
    stocks.push( { symbol:ULTRACEMCO[0], open:ULTRACEMCO[1], high:ULTRACEMCO[2], low: ULTRACEMCO[3], ltp: ULTRACEMCO[5], chng: ULTRACEMCO[6],today: ULTRACEMCO[12]} );
    stocks.push( { symbol:ONGC[0], open:ONGC[1], high:ONGC[2], low: ONGC[3], ltp: ONGC[5], chng: ONGC[6],today: ONGC[12]} );
    stocks.push( { symbol:JSWSTEEL[0], open:JSWSTEEL[1], high:JSWSTEEL[2], low: JSWSTEEL[3], ltp: JSWSTEEL[5], chng: JSWSTEEL[6],today: JSWSTEEL[12]} );
    stocks.push( { symbol:CIPLA[0], open:CIPLA[1], high:CIPLA[2], low: CIPLA[3], ltp: CIPLA[5], chng: CIPLA[6],today: CIPLA[12]} );
    stocks.push( { symbol:TATAMOTORS[0], open:TATAMOTORS[1], high:TATAMOTORS[2], low: TATAMOTORS[3], ltp: TATAMOTORS[5], chng: TATAMOTORS[6],today: TATAMOTORS[12]} );
    stocks.push( { symbol:BHARTIARTL[0], open:BHARTIARTL[1], high:BHARTIARTL[2], low: BHARTIARTL[3], ltp: BHARTIARTL[5], chng: BHARTIARTL[6],today: BHARTIARTL[12]} );
    stocks.push( { symbol:UPL[0], open:UPL[1], high:UPL[2], low: UPL[3], ltp: UPL[5], chng: UPL[6],today: UPL[12]} );
    stocks.push( { symbol:BAJAJFINSV[0], open:BAJAJFINSV[1], high:BAJAJFINSV[2], low: BAJAJFINSV[3], ltp: BAJAJFINSV[5], chng: BAJAJFINSV[6],today: BAJAJFINSV[12]} );
    stocks.push( { symbol:ADANIPORTS[0], open:ADANIPORTS[1], high:ADANIPORTS[2], low: ADANIPORTS[3], ltp: ADANIPORTS[5], chng: ADANIPORTS[6],today: ADANIPORTS[12]} );
    stocks.push( { symbol:DIVISLAB[0], open:DIVISLAB[1], high:DIVISLAB[2], low: DIVISLAB[3], ltp: DIVISLAB[5], chng: DIVISLAB[6],today: DIVISLAB[12]} );
    stocks.push( { symbol:BAJAJAUTO[0], open:BAJAJAUTO[1], high:BAJAJAUTO[2], low: BAJAJAUTO[3], ltp: BAJAJAUTO[5], chng: BAJAJAUTO[6],today: BAJAJAUTO[12]} );
    stocks.push( { symbol:POWERGRID[0], open:POWERGRID[1], high:POWERGRID[2], low: POWERGRID[3], ltp: POWERGRID[5], chng: POWERGRID[6],today: POWERGRID[12]} );
    stocks.push( { symbol:DRREDDY[0], open:DRREDDY[1], high:DRREDDY[2], low: DRREDDY[3], ltp: DRREDDY[5], chng: DRREDDY[6],today: DRREDDY[12]} );
    stocks.push( { symbol:ASIANPAINT[0], open:ASIANPAINT[1], high:ASIANPAINT[2], low: ASIANPAINT[3], ltp: ASIANPAINT[5], chng: ASIANPAINT[6],today: ASIANPAINT[12]} );
    stocks.push( { symbol:NESTLEIND[0], open:NESTLEIND[1], high:NESTLEIND[2], low: NESTLEIND[3], ltp: NESTLEIND[5], chng: NESTLEIND[6],today: NESTLEIND[12]} );
    stocks.push( { symbol:BPCL[0], open:BPCL[1], high:BPCL[2], low: BPCL[3], ltp: BPCL[5], chng: BPCL[6],today: BPCL[12]} );
    stocks.push( { symbol:MandM[0], open:MandM[1], high:MandM[2], low: MandM[3], ltp: MandM[5], chng: MandM[6],today: MandM[12]} );
    stocks.push( { symbol:GRASIM[0], open:GRASIM[1], high:GRASIM[2], low: GRASIM[3], ltp: GRASIM[5], chng: GRASIM[6],today: GRASIM[12]} );
    stocks.push( { symbol:HEROMOTOCO[0], open:HEROMOTOCO[1], high:HEROMOTOCO[2], low: HEROMOTOCO[3], ltp: HEROMOTOCO[5], chng: HEROMOTOCO[6],today: HEROMOTOCO[12]} );
    stocks.push( { symbol:HINDALCO[0], open:HINDALCO[1], high:HINDALCO[2], low: HINDALCO[3], ltp: HINDALCO[5], chng: HINDALCO[6],today: HINDALCO[12]} );
    stocks.push( { symbol:ICICIBANK[0], open:ICICIBANK[1], high:ICICIBANK[2], low: ICICIBANK[3], ltp: ICICIBANK[5], chng: ICICIBANK[6],today: ICICIBANK[12]} );
    stocks.push( { symbol:MARUTI[0], open:MARUTI[1], high:MARUTI[2], low: MARUTI[3], ltp: MARUTI[5], chng: MARUTI[6],today: MARUTI[12]} );
    stocks.push( { symbol:AXISBANK[0], open:AXISBANK[1], high:AXISBANK[2], low: AXISBANK[3], ltp: AXISBANK[5], chng: AXISBANK[6],today: AXISBANK[12]} );
    stocks.push( { symbol:RELIANCE[0], open:RELIANCE[1], high:RELIANCE[2], low: RELIANCE[3], ltp: RELIANCE[5], chng: RELIANCE[6],today: RELIANCE[12]} );
    stocks.push( { symbol:APOLLOHOSP[0], open:APOLLOHOSP[1], high:APOLLOHOSP[2], low: APOLLOHOSP[3], ltp: APOLLOHOSP[5], chng: APOLLOHOSP[6],today: APOLLOHOSP[12]} );
    stocks.push( { symbol:NTPC[0], open:NTPC[1], high:NTPC[2], low: NTPC[3], ltp: NTPC[5], chng: NTPC[6],today: NTPC[12]} );
    stocks.push( { symbol:SBIN[0], open:SBIN[1], high:SBIN[2], low: SBIN[3], ltp: SBIN[5], chng: SBIN[6],today: SBIN[12]} );
    stocks.push( { symbol:INDUSINDBK[0], open:INDUSINDBK[1], high:INDUSINDBK[2], low: INDUSINDBK[3], ltp: INDUSINDBK[5], chng: INDUSINDBK[6],today: INDUSINDBK[12]} );
    stocks.push( { symbol:EICHERMOT[0], open:EICHERMOT[1], high:EICHERMOT[2], low: EICHERMOT[3], ltp: EICHERMOT[5], chng: EICHERMOT[6],today: EICHERMOT[12]} );
    stocks.push( { symbol:ADANIENT[0], open:ADANIENT[1], high:ADANIENT[2], low: ADANIENT[3], ltp: ADANIENT[5], chng: ADANIENT[6],today: ADANIENT[12]} );
    console.log(stocks);
    console.log(head);
    console.log(headers);

    // writer.writeRecords(stocks)
    // .then(() =>{
    //     console.log("DONE!");
    // }).catch((error) =>{
    //     console.log(error);
    // })
    // { name: '', Symbol:'', Open:'', High:'', Low:'', LTP:'', chng:'',Today:''}
    // $('#equityStockTable > tbody > tr > td')
    // .each((index, element) =>{ 
    //     console.log($(element).text());
    // })
  


}



main();