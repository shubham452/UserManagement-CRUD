const express = require('express');
const router = new express.Router();
const controllers = require("../controllers/userController");

// Ensure that the export route is properly defined and distinct
router.get('/user/userexport', controllers.userExport);
router.post('/user/register', controllers.userpost);
router.get('/user/details', controllers.userget);
router.get('/user/:id', controllers.singleuserget); 
router.put('/user/edit/:id', controllers.useredit);
router.delete('/user/delete/:id', controllers.userdelete);
router.put('/user/status/:id', controllers.userStatus);

module.exports = router;
