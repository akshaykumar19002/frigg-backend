const express = require('express');
const router = express.Router();
const FridgeUserService = require('./FridgeUserService');



router.get('/GetUsersByFridgeId/:id', async (req, res) => {
    try {
        const fridges = await FridgeUserService.GetUsersByFridgeId(req.params.id);
        res.status(200).send(fridges);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/mergeUserAndFridge', async (req, res) => {
    try {
        const data = await FridgeUserService.MergeUserAndFridge(req.body.user_id, req.body.invite_code);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
