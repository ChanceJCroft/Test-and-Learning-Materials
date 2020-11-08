const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', { userNewUrlParse: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection open!")
})
.catch(err => {
    console.log("Error found!")
    console.log(err)
})

