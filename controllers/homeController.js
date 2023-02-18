const router = require('express').Router();

const Publication = require('../models/Publication.js');
const bookServices = require('../services/bookServices.js');

const bookUtils = require('../utils/bookUtils.js');


router.get('/', (req, res) => {
    // console.log(req.user)
    res.render('home/index')
});


router.get('/catalog', async (req, res) => {//

    let publications = await Publication.find().lean();
    // console.log(cryptos)
    // res.render('index', { cubes, search, difficultyFrom, diffficultyTo });
    res.render('book/catalog', { publications });

});
router.get('/search', async (req, res) => {

    const { name, paymentMethod } = req.query;
    const publication = await bookServices.search(name, paymentMethod);
    const paymentMethods = bookUtils.generatePaymentMethod(paymentMethod);

    res.render('home/search', { publication, paymentMethods, name });

});

module.exports = router;