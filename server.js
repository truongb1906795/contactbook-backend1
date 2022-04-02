// const { default: mongoose } = require("mongoose");
const app = require("./app");
const config = require("./app/config");

// mongoose.connect("mongodb+srv://Thinhne1504:Thinhne1504@cluster0.8r9hv.mongodb.net/lab1?retryWrites=true&w=majority")
// .then(()=>{
//     console.log("Connected to the database!!");
// })
// .catch((error)=>{
//     console.log(error);
//     process.exit();
// });


const PORT =config.app.port;
app.listen(PORT, ()=>{
    console.log(`Server is runging on port ${PORT}..`);
});