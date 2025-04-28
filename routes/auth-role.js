const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/middle');
const isadmin = require('../middleware/adminmiddle');
router.get('/welcome',authMiddleware,isadmin, (req, res) => {
    res.send("welcome Admin page");
});
module.exports = router;