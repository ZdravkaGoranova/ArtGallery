
const router = require('express').Router();

const Publication = require('../models/Publication.js');
const User = require('../models/User.js');
const bookServices = require('../services/bookServices.js');
const bookUtils = require('../utils/bookUtils.js');
const { getErrorMessage } = require('../utils/errorUtils.js')
const { isAuth, authentication } = require('../middlewares/authMddleware.js');



exports.getCreateCrypto = (req, res) => {//router.get('/'create',isAuth,(req, res))=>{
    console.log(req.user);

    res.render('book/create');
};
exports.postCreateCrypto = async (req, res) => {
    // console.log(req.body);//Object на данните от url
    console.log(req.user);

    try {
        const { title, technique, picture, certificate, usersShared } = req.body;

        let book = new Publication({
            title,
            technique,
            picture,
            certificate,
            usersShared,

            author: req.user._id,
        });
        console.log(book);
        await book.save();//запазва в db

        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { myPublications: book._id } },
            { new: true }
        );
        // console.log(user);

        //или 
        //await cryptoService.create(req.user._id, { name, image, price, description, paymentMethod })

    } catch (error) {
        console.log(error.message);
        //return res.render('auth/404');
        return res.status(400).render('book/create', { error: getErrorMessage(error) })
    }
    res.redirect('/catalog');
};

exports.getDetails = async (req, res) => {//router.get('/:cryptoId/details',(req,res)=>{)

    const publication = await bookServices.getOne(req.params.bookId);
    const userId = publication.author.toString()
    const userData =await bookServices.getAdress(userId)

    console.log(publication.author.toString())
    //console.log(userData.username)

    const isOwner = bookUtils.isOwner(req.user, publication);//const isOwner = crypto.owner==req.user._id;
    //console.log(isOwner)

    const isWished = publication.usersShared?.some(id => id == req.user?._id);
    //console.log(isWished)
    //crypto.paymentMethod = paymentMethodsMap[crypto.paymentMethod]

    if (!publication) {
        return res.render('home/404');
    }

    // console.log(req.user._id);
    // console.log(req.params);
    // console.log(req.params.cryptoId);
    // console.log(`=========================================`)
    // console.log(crypto.owner.toString())

    res.render('book/details', { publication, isOwner, isWished,userData });
};

exports.getEditCrypto = async (req, res) => {

    const book = await bookServices.getOne(req.params.bookId);
    //const paymentMethods = bookUtils.generatePaymentMethod(book.paymentMethod);

    if (!bookUtils.isOwner(req.user, book)) {
        return res.render('home/404')// throw new Error('You are not an owner!');
    }

    res.render('book/edit', { book });
};

exports.postEditCrypto = async (req, res) => {

    const { title, technique, picture, certificate, usersShared } = req.body

    try {
        await bookServices.update(req.params.bookId, {
            title,
            technique,
            picture,
            certificate,
            usersShared,

        })
    } catch (error) {
        // console.log(error.message);
        return res.status(400).render('book/edit', { error: getErrorMessage(error) })

    }
    res.redirect(`/artGallerys/${req.params.bookId}/details`);
};

exports.getDeleteCrypto = async (req, res) => {
    const book = await bookServices.getOne(req.params.bookId);

    const isOwner = bookUtils.isOwner(req.user, book);
    console.log(isOwner)

    if (!isOwner) {
        return res.render('home/404');
    }

    await bookServices.delete(req.params.bookId);//await cryptoService.delete(crypto);
    res.redirect('/catalog');
};

exports.getWish = async (req, res) => {//router.get('/:cryptoId/buy',isAuth)
    // const crypto = await cryptoService.getOne(req.params.cryptoId);
    // const isOwner = cryptoUtils.isOwner(req.user, crypto);
    try {
        await bookServices.wish(req.user._id, req.params.bookId, req, res);
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) })
    }
    res.redirect(`/artGallerys/${req.params.bookId}/details`);
}


exports.getShared = async (req, res) => {//router.get('/:cryptoId/buy',isAuth)
    // const crypto = await cryptoService.getOne(req.params.cryptoId);
    // const isOwner = cryptoUtils.isOwner(req.user, crypto);
    try {
        await bookServices.shared(req.user._id, req.params.bookId, req, res);
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) })
    }
    res.redirect(`/artGallerys/${req.params.bookId}/details`);
}



exports.getProfile = async (req, res) => {

    const userId = req.user._id;
    const user = req.user;

    const adress = await bookServices.getAdress(userId);

    let myusersShared = await bookServices.getMyusersShared(userId);
    let myPublications = await bookServices.getmyPublications(userId);

    console.log(user)
    //console.log(myPublications)
    //console.log(myusersShared)//ok


    res.render('book/profile', { user, myusersShared, myPublications });

}








//     try {
//         const userI = req.user._id;
//         const user = req.user;
//         let books = await Book.find().lean();
//         // const wishArray  = books.wishingList?.filter(id => id == req.user?._id);

//        //const filteredArray = books.filter(book => book.wishingList.includes(new ObjectId('req.user._id')));
//        const filteredArray = books.filter(book => book.wishingList.includes('req.user._id'));

//         console.log(req.user._id)
//         console.log(filteredArray);

//         res.render('book/profile', { user, books });
//     } catch (error) {

//         return res.status(400).render('home/404', { error: getErrorMessage(error) })
//     }
// }