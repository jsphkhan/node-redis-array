const express = require('express');
const app = express();
const redis = require('redis');
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/users', (req, res) => {
    //return list items
    redisClient.lrange('mylist', 0, -1, (err, data) => {
        if(err) {
            return res.status(500).send('Error');
        }
        //data comes as array
        res.json({
            data: data
        });
    })
});

app.post('/users/:id', (req, res) => {
    const { id } = req.params;

    //push at the end of list
    redisClient.rpush('mylist', id, (err, data) => {
        if(err) {
            return res.status(500).send('Error');
        }
        //data is the length of the list
        res.json({
            data: data
        });
    })
});

app.listen(3000, () => {
    console.log('server started at 3000');
});