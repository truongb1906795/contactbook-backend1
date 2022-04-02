const { default: mongoose } = require("mongoose");
const app = require("./app");
const config = require("./app/config");

mongoose.connect("mongodb+srv://b1906795:0052truong@cluster0.cxx3t.mongodb.net/Truongne?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to the database!!");
})
.catch((error)=>{
    console.log(error);
    process.exit();
});


const PORT =config.app.port;
app.listen(PORT, ()=>{
    console.log(`Server is runging on port ${PORT}..`);
});