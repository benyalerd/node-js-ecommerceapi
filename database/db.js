const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb+srv://benya:o9CMqbTisDornkeU@nodeservice.qmdjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('connect to db ...'))
}