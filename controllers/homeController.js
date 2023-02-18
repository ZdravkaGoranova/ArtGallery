const router = require('express').Router();

const Publication = require('../models/Publication.js');
const bookServices = require('../services/bookServices.js');

const bookUtils = require('../utils/bookUtils.js');


router.get('/', async(req, res) => {

    //const publication  = await Publication.find().limit(10);
    const publication  = await Publication.find()
    console.log(publication)

    const publicationData = publication.map(pub => ({ title: pub.title, usersShared: pub.usersShared.length }));

    console.log(publicationData)
    

    // console.log(req.user)
    res.render('home/index', { publication,publicationData })
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