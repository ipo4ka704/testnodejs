import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const users = [];
const app = express();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

app.use(express.json());

const dataSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required().alphanum(),
    age: Joi.number().required().min(4).max(130),
});


app.get('/users', (req, res) => {
    const loginSubstring = req.query['loginSubstring'];
    const limit = req.query['limit'];

    const list = users
        .filter(user => user.login.includes(loginSubstring) && !user.isDeleted)
        .sort((a, b) => a.login.localeCompare(b.login))
        .slice(0, limit);

    res.send(list);
});

app.post('/user', validator.body(dataSchema), (req, res) => {
    const user = req.body;
    user.id = uuidv4();
    user.isDeleted = false;
    users.push(user);
    res.status(201).send(user);
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;

    const userToFind = users.find(user => user.id === id);

    if (!userToFind) {
        res.status(404).send('User not found');
    }

    res.send(userToFind);
});

app.put('/user/:id', validator.body(dataSchema), (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const userToUpdate  = users.find(user => user.id === id);

    if (!userToUpdate ) {
        res.status(404).send('User not found');
    } else {
      userToUpdate.login = user.login;
      userToUpdate.password = user.password;
      userToUpdate.age = user.age;
      res.send(userToUpdate);
    }
});

app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    const userToDelete = users.find(user => user.id === id);
    if (!userToDelete || userToDelete.isDeleted) {
        res.status(404).send('User is not found');
    } else {
        userToDelete.isDeleted = true;

        res.status(204).send();
    }
});

app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);