const express = require('express');
const {faker} = require('@faker-js/faker');
const app = express();
const path = require("path");

app.use(express.urlencoded());
app.use(express.json())

const names = [];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.SERVER_PORT || 3090;
const getRandomNameSync = () => {
    return {firstName: faker.name.firstName(), lastName: faker.name.lastName()}
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/api/names', (req, res) => {
    const name = req.body;
    names.push(name);
    console.log(`Posting ${JSON.stringify(name)}`);
    res.status(200).send({status: 200, message: 'OK'});
});

app.get('/api/names', (req, res) => {
    const msg = `Getting names from an array named names, that has a length of ${names.length}`;
    console.log(msg);
    res.status(200).send(names);
});

app.get('/api/names:id', (req, res) => {
    const msg = `Getting name ${req.params.id}`;
    console.log(msg);
    res.status(200).send({status: 200, message: msg});
});
app.get('/api/random_name', (req, res) => {
    const randomName = getRandomNameSync()
    const msg = `Getting random name ${JSON.stringify(randomName)}`;
    console.log(msg);
    res.status(200).send(randomName);
});

server = app.listen(port, () => {
    console.log(`Node server is running on port ${port} at ${new Date()}`);
});
