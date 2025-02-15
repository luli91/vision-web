const express =  require('express');
const { updateUserProfile, getUserProfile } = require('./user.controller');
const { verifyUserToken } = require('../middlewares/verifyUserToken ');

const router =  express.Router();

router.get("/:uid", verifyUserToken, getUserProfile);
router.put("/:uid", verifyUserToken, updateUserProfile);

module.exports = router;
