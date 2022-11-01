const express = require('express');
const router = express.Router();
const service = require('./GenerateGroceryListService');

router.get('/:name/:id', async (req, res) => {
    try {
        var response = await service.generateGroceryList(req.params.name, req.params.id);
        res.status(200).send(response);
    } catch (error) {
        if (error.message === 'Dish not found') {
            res.status(404).send({message: error.message});
        } else {
            res.status(500).send(error.message);
        }
    }
});

module.exports = router;