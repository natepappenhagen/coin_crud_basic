const express = require('express');
const router  = express.Router();


const Holdings = require('../models/holdings');
const Coin = require('../models/coin.js');
const User = require('../models/user.js')


// API TESTING
// ==========================================
const Coinmarketcap = require('node-coinmarketcap-api');
const coinmarketcap = new Coinmarketcap();

(async () => {
    let bitcoin_price = await coinmarketcap.ticker('bitcoin', 'EUR');
    console.log(bitcoin_price);

    let top_two = await coinmarketcap.ticker(null, 'CAD', 2);
    console.log(top_two);


    let global_market = awaitcoinmarketcap.global();
    console.log(global_market);


    let available_currencies = await coinmarketcap.currencies();
    console.log(available_currencies);
    // ['AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR']
})();
// ============================================



router.get("/", async (req, res) => {
      const eth = await findCoin("ethereum")

  try {
    const foundHoldings = await Holdings.find({});

    res.render('holdings/index.ejs', {
        holdings: foundHoldings,
        ethereum: eth,
      });

  } catch (err) {
    res.send(err);
  }
});
// new (holdings) route
// ============================================
router.get("/new", (req, res) => {
  res.render('holdings/new.ejs');
});
// show (holdings) route
// ============================================
router.get("/:id", async (req, res) => {
  try {
    const foundHoldings = await Holdings.findById(req.params.id);
    res.render("holdings/show.ejs", {holdings: foundHoldings});
  } catch (err) {
    res.send(err);
  }
});
// edit (holdings) route
// ============================================
router.get("/:id/edit", async (req, res) => {
  try {
    const foundHoldings = await Holdings.findById(req.params.id);
    res.render("holdings/edit.ejs", {holdings: foundHoldings});
  } catch (err) {
    res.send(err);
  }
});
// edit (holdings) put route
// ============================================
router.put("/:id", async (req, res) => {
  try {
    const updatedHoldings = await Holdings.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect("/holdings");
  } catch (err) {
    res.send(err);
  }
});
// new post route
// ============================================
router.post("/", async (req, res) => {
  try {
    const createdHoldings = await Holdings.create(req.body)
    res.render('/holdings',{holdings: createdHoldings});
  } catch (err) {
    res.send(err);
  }

});
// add tx route
// ============================================
router.post("/:id/add", async (req, res) => {
  try {
  } catch (err) {
    res.send(err);
  }
});
// delete route
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    const deletedHoldings = await Holdings.findByIdAndRemove(req.params.id);
    res.redirect("/holdings");
  } catch (err) {
    res.send(err);
  }
});



module.exports = router;