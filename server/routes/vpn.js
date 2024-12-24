// /server/routes/vpn.js
const express = require('express');
const { generateCredentials } = require('../controllers/vpnController');
const router = express.Router();

router.post('/generate', generateCredentials);

module.exports = router;
