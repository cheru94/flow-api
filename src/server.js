const express = require ('express');
const location = require('./lib/location');
const current = require('./lib/current');
const foreCast = require('./lib/forecast');

const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3000, (err) => {
    if(err) {
        console.log('Something bad happend');
        }
    console.log(`server is listening on port: ${process.env.PORT || 3000}`); 
});

app.get('/v1', (request, response) => {
    try {
        const result = `Welcome to the Weather API Base Route`;
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
        response.status(500).send(err);
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
