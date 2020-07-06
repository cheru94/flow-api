const express = require ('express');
const location = require('./location');
const current = require('./current');
const foreCast = require('./forecast');

const app = require('./app').app;


app.get('/v1', (request, response) => {
    try {
        const result = {"message":`Welcome to the Weather API Base Route`};
        response.status(200).send(result);
    }
    catch(err) {
        response.status(500).send(err);
    }
});


app.get('/v1/location', (request, response) => {
    const res = location.handler();
    res.then((result) => {
        response.status(200).send(result);
        
    }).catch((err) => {
        response.status(500).send(err);
        
    });
});


app.get('/v1/current', (request, response) => {
    
    let event = {
        'headers': request.headers,
        'body': request.body,
        'params': request.query
    }

    let res = current.handler(event);
    res.then((result) => {
        response.status(200).send(result);
    }).catch((err) => {
        response.status(400).send(err);
    });
});

app.get('/v1/forecast', (request, response) => {
    
    let event = {
        'headers': request.headers,
        'body': request.body,
        'params': request.query
    }

    let res = foreCast.handler(event);
    res.then((result) => {
        response.status(200).send(result);
    }).catch((err) => {
        response.status(500).send(err);
    });
});
