const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true }, (err, result) => {
    if (err) {
        console.log("db connection failed");
    } else {
        console.log("database connection successfully established!");
    }
})