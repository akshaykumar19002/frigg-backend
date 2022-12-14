const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserService = require('./UserService');
const FridgeUserService = require('../FridgeUser/FridgeUserService');

router.get('/', async (req, res) => {
    try {
        const users = await UserService.GetAllUsers();
        if (users.length === 0) {
            res.status(200).send({message: 'No users'});
        } else {
            res.status(200).send(users);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        if (req.body.email.trim() && req.body.password.trim() && req.body.full_name.trim()) {
            const response = await UserService.AddUser(req.body.email.trim(), req.body.password.trim(), req.body.full_name.trim(), req.body.invite_code);
            res.status(200).send(response);
        } else {
            res.status(400).send({message: 'Missing parameters'});
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await UserService.RemoveUser(req.params.id);
        res.status(200).send({ message: 'User deleted' });
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).send({message: error.message});
        } else {
            res.status(500).send(error.message);
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await UserService.GetUserById(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).send({message: error.message});
        } else {
            res.status(500).send(error.message);
        }
    }
});

router.post('/login', passport.authenticate('local', {session: false}), async (req, res) => {
    let fridge = await FridgeUserService.GetFridgeByUserId(req.user.id);
    let user = await UserService.GetUserById(req.user.id);
    res.status(200).send({message: 'Logged in', fridge_id: fridge.id, user_id: req.user.id, invite_code: fridge.fridgeKey, email: user.email, full_name: user.full_name});
});


router.post('/preferences/:id/:noOfNotifications', async (req, res) => {
    try {
        const response = await UserService.AddPreferences(req.params.id, req.params.noOfNotifications);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/preferences/:id/', async (req, res) => {
    try {
        const response = await UserService.GetPreferences(req.params.id);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post('/changePassword', async (req, res) => {
    try {
        const response = await UserService.ChangePassword(req.body.user_id, req.body.old_password, req.body.new_password, req.body.confirm_password);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
