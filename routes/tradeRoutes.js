const express = require("express");
const router = express.Router();
const {createTrade,getTrades,getTradeDetail,notAllowedMethod} = require("../controllers/tradeController");

router.route('/').get(getTrades).post(createTrade);
router.route('/:id').get(getTradeDetail);

router.route('/:id').delete(notAllowedMethod).put(notAllowedMethod).patch(notAllowedMethod);
module.exports = router