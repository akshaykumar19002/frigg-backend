const express = require('express');
const router = express.Router();
const FridgeService = require('./FridgeService');



router.get('/', async (req, res) => {
    try {
        const fridges = await FridgeService.GetAllFridges();
        res.status(200).send(fridges);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// TODO: add code to upload image to s3.
router.post('/', async (req, res) => {
    try {
        const fridge = await FridgeService.CreateFridge(req.body.name);
        res.status(200).send(fridge);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const fridge = await FridgeService.DeleteFridge(req.params.id);
        res.status(200).send(fridge);
    } catch (error) {
        if (error.message === 'Fridge not found') {
            res.status(404).send({message: error.message});
        } else {
            res.status(500).send(error.message);
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const fridge = await FridgeService.GetFridgeById(req.params.id);
        res.status(200).send(fridge);
    } catch (error) {
        if (error.message === 'Fridge not found') {
            res.status(404).send({message: error.message});
        } else {
            res.status(500).send(error.message);
        }
    }
});

module.exports = router;