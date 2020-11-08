const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', { userNewUrlParse: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection open!")
})
.catch(err => {
    console.log("Error found!")
    console.log(err)
})

/* {
    title: '',
    year: 1999,
    score: 9.1,
    rating: 'R',
}*/
    
//create mongoose schema - how the data should be setup
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});
//make a model based off of the schema made
const Movie = mongoose.model('Movie', movieSchema)

//CREATE a specific instance of the model above
const area51 = new Movie({ title: "Area 51", year: 1992, score: 5.2, rating: "R" })

//call area51.save() in the terminal to save it into mongodb
//make sure to .save() whenever a change is made


//INSERT MANY
Movie.insertMany([
    {object 1},
    {object 2},
    {object 3},
])

//FINDING in mongoose - returns .then()able objects
//searching for movies with a year greater than or equal to 2015, and then console logging the data.
Movie.find({year: {$gte: 2015}}).then(data => console.log(data));

//find movies with a rating of exactly PG-13 then log the data
Movie.find({rating: 'PG-13'}).then(data => console.log(data));



//find a specific movie by the id (shorthand)
Movie.findById('theidgetspassedinhere').then(m => console.log(m));


//UPDATING in mongoose
//update ONE movie with the title Footloose to change/add its year as 1986
Movie.updateOne({title: 'Footloose'}, {year: 1986}).then(res => console.log(res));

//update MORE THAN ONE movie at a time
//update anything with the title within the provided array to change the score to 10, then log to the console
Movie.updateMany({title: {$in: ['Alien', 'Toy Story']}}, {score: 10}).then(res => console.log(res));

//find one and update - with the title of the The Muppets and update the Score
//this will find one and display information and THEN update (so will display old information)
Movie.findOneAndUpdate({title: 'The Muppets'}, {score: 7}).then(m => console.log(m));

//adding this 'new: true' object will display the newly updated information, solving the issue above
Movie.findOneAndUpdate({title: 'The Muppets'}, {score: 8}, {new: true}).then(m => console.log(m));


//DELETING with mongoose
Movie.remove({title: 'Little House on the Prarie'}).then(msg => console.log(msg));

//delete all where the year is greater than or equal to 1999
Movie.deleteMany({year: {$gte: 1999}}).then(msg => console.log(msg));

//find and delete an item with specified properties - shows the item even though deleted (similar to the findOneAndUpdate method)
Movie.findOneAndDelete({title: 'Mulan'}).then(msg => console.log(msg));