const express = require('express');
const router = express.Router();
const FridgeUserService = require('./FridgeUserService');



router.get('/GetUsersByFridgeId', async (req, res) => {
    try {
        const fridges = await FridgeUserService.GetUsersByFridgeId(req.body.fridge_id);
        res.status(200).send(fridges);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;