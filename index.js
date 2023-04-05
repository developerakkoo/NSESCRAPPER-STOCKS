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
    //ADANIPOTRTS DATA
    let adaniports = [];
    
    $("#equityStockTable > tbody > tr:nth-child(2) > td").each((i,e) =>{
        // console.log($(e).text());
        adaniports.push($(e).text())
    })

    //NIFTY50 DATA
    let nifty50 = [];
    $("#equityStockTable > tbody > tr:nth-child(1) > td").each((i,e) =>{
        // console.log($(e).text());
        nifty50.push($(e).text())
    })

    // SBIN DATA
    let sbin = [];
    $("#equityStockTable > tbody > tr:nth-child(4) > td").each((i,e) =>{
        // console.log($(e).text());
        sbin.push($(e).text())
    })
    
    //BHARTIARTL DATA
    let bhartiartl = [];
    $("#equityStockTable > tbody > tr:nth-child(5) > td").each((i,e) =>{
        // console.log($(e).text());
        bhartiartl.push($(e).text())
    })
    // stocks.push( { symbol:adaniports[0], open:adaniports[1], high:adaniports[2], low: adaniports[3], ltp: adaniports[5], chng: adaniports[6],today: adaniports[12]} )
    // stocks.push( { symbol:nifty50[0], open:nifty50[1], high:adaniports[2], low: nifty50[3], ltp: nifty50[5], chng: nifty50[6],today: nifty50[12]} )
    // stocks.push( { symbol:sbin[0], open:sbin[1], high:sbin[2], low: sbin[3], ltp: sbin[5], chng: sbin[6],today: sbin[12]} )
    stocks.push(bhartiartl[0], bhartiartl[1], bhartiartl[2], bhartiartl[3],bhartiartl[5],bhartiartl[6],bhartiartl[12])

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