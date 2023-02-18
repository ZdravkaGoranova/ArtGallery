const Publication = require('../models/Publication.js');
const User = require('../models/User.js');

const bookUtils = require('../utils/bookUtils.js');

exports.search = async (name, paymentMethod) => {

    let cprypto = await this.getAll();

    if (name) {
        cprypto = cprypto.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }

    if (paymentMethod) {
        cprypto = cprypto.filter(x => x.paymentMethod == paymentMethod)
    }
    return cprypto;
};

exports.getAll = () => Publication.find({}).lean();

exports.create = (ownerId, cryptoData) => Publication.create({ ...cryptoData, owner: ownerId });

exports.getOne = (bookId) => Publication.findById(bookId).lean();

exports.update = (bookId, data) => Publication.findByIdAndUpdate(bookId, data, { runValidators: true });

exports.delete = (bookId) => Publication.findByIdAndDelete(bookId);


exports.getMyWishBook = (userId) => Publication.find({ wishingList: userId }).lean();


exports.getMyusersShared = (userId) => Publication.find({ usersShared: userId }).lean();

exports.getmyPublications = (userId) => Publication.find({ author: userId }).lean();

/////////////





exports.getAdress = (userId) => User.find({ address: userId }).lean();

exports.wish = async (userId, bookId, req, res) => {
    const publication = await Publication.findById(bookId);
    const isOwner = publication.owner == req.user._id;
    const isWish = publication.wishingList?.some(id => id == req.user?._id);

    if (isOwner) {
        return res.render('home/404');
        //throw new Error ('You is Owner')
    }
    if (isWish) {
        return res.render('home/404');
        // throw new Error ('You already bought these crypto coins.')
    }

    publication.wishingList.push(userId);
    return await publication.save();
    //console.log(crypto.buyers)
    //или Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } })
};




exports.shared = async (userId, bookId, req, res) => {
    const publication = await Publication.findById(bookId);
    const isOwner = publication.owner == req.user._id;
    const isWish = publication.usersShared?.some(id => id == req.user?._id);

    if (isOwner) {
        return res.render('home/404');
        //throw new Error ('You is Owner')
    }
    if (isWish) {
        return res.render('home/404');
        // throw new Error ('You already bought these crypto coins.')
    }

    publication.usersShared.push(userId);
    return await publication.save();
    //console.log(crypto.buyers)
    //или Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } })
};


//     const isWish  = book.wishingList?.filter(id => id == req.user?._id);