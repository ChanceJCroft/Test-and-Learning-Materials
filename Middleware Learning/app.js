const express = require('express');
const app = express();
const morgan = require('morgan');

//middleware that runs on every request - morgan specifically logs the time and info of requests. Runs before route handlers based on placement
//need to place all middleware BEFORE the routes
app.use(morgan('tiny'));
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})


app.use((req, res, next) => {
    console.log("This is my first Middleware!")
    //if you don't call next() then it will get caught on this middleware, needs to be chained with next();
    return next();
    //this will still technically run, but after the next() is called.
    //console.log("This happens after second middleware technically")
});
app.use((req, res, next) => {
    console.log("This is my second Middleware!")
    return next();
})


app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send("Hello, this is the home page");
})

app.get('/cats', (req, res) => {
    res.send("MEOW!");
})

app.listen(8080, () => {
    console.log("App is running on localhost:8080")
})