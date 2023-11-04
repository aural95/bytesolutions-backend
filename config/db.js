let atlasdb = require('./dbconfig').ATLASDB;

const { default: mongoose } = require('mongoose');

module.exports = function() {
    mongoose.connect(atlasdb);

    let mongodb = mongoose.connection;

    mongodb.on("error", console.error.bind(console, "conection error: "));

    mongodb.once("open", ()=>{
        console.log("Connected to MongoDB Atlas") 
    })

    return mongoose;
}
