const express = require('express');
const multer = require('multer');
const {
  getAllUsers,
  createUser,
  getMe,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
  logout,
} = require('../controllers/authController');

const upload = multer({ dest: 'public/img/users' }); // Opciones para multer, Especificamos el destino de imagenes.

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware.
router.use(protect); // Vamos a proteger todas las rutas que vienen despues de este.

router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', upload.single('photo'), updateMe); // nombre del campo que contendra el archivo
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin')); // Solo los administrador podran ejecutar los siguientes middleware, ademas que ya contaran con su respectiva proteccion.

// Router FILOSOFIA REST.
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
