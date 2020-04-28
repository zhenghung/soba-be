const express = require('express');
const router = express.Router();

/** Check if server is running*/
router.get('/', (req, res) => {
    res.send({response: 'Server is up and running.'}).status(200);
});

/** More endpoints as required */

module.exports = router;