const express = require ('express');
const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3000, (err) => {
    if(err) {
        console.log('Something bad happend');
        }
    console.log(`server is listening on port: ${process.env.PORT || 3000}`); 
});
exports.app = app;
exports.server = server;
