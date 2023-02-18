const router = require('express').Router();

const homeController = require('./controllers/homeController.js');

const authController = require('./controllers/authController.js');

const cryptoController = require('./controllers/cryptoController.js');

const { isAuth,requireAuth } = require('./middlewares/authMddleware.js')
// const { handleRequest } = require('./utils/requestUtils.js')

const { getErrorMessage } = require('./utils/errorUtils.js')

router.use(homeController);
router.use(authController);//router.use('/auth',authController);

//router.use('/crypto',cryptoController);

//router.use(cryptoController); или router.use('/cryptos',cryptoController);
router.get('/create', isAuth, cryptoController.getCreateCrypto);//
router.post('/create', isAuth, cryptoController.postCreateCrypto);

router.get('/artGallerys/:bookId/details', cryptoController.getDetails);// router.get('/cubes/:cubeId/details', handleRequest(cubeControler.getDetails));//път към детайла

//router.get('/artGallerys/:bookId/wish', isAuth, cryptoController.getWish);

router.get('/artGallerys/:bookId/shared', isAuth, cryptoController.getShared);

router.get('/profile', isAuth, cryptoController.getProfile);

router.get('/artGallerys/:bookId/edit', requireAuth, cryptoController.getEditCrypto);// router.get('/cubes/:cubeId/edit', isAuthenticated, handleRequest(cubeControler.getEditCube));
router.post('/artGallerys/:bookId/edit', requireAuth, cryptoController.postEditCrypto);

router.get('/artGallerys/:bookId/delete', requireAuth, cryptoController.getDeleteCrypto);

router.all('*', (req, res) => res.render('home/404'));
//router.use('*', (req, res) => res.render('home/404'));

router.use(getErrorMessage);

module.exports = router;