const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./AppError');

app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!")
    next();
})


const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    throw new AppError('password required');
}

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})

//this will throw an error because chicken is not defined
app.get('/error', (req, res) => {
    chicken.fly()
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!')
})

//will throw an error if verifyPassword
app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})

app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin!', 403)
})

//Error handling middleware. Needs to be past all regular middleware, and includes 4 parameters.
app.use((err, req, res, next) => {
    //sets the default status to 500 if no status is available from the error. Otherwise takes the existing paramters from Express error handling
    const { status = 500, message = 'Something went wrong.' } = err;
    //this will call the next ERROR HANDLING middleware. Need to pass in the Error in Next when working with errors
    next(err)
})


app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})