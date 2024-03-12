require("dotenv").config();

const connectDB = require("./util/db/connect");
// Any JSON file can be imported in this way
const jsonProducts = require("./products.json");
const Product = require("./models/product");

const start = async function(){

    try{
        
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);

        console.log("Success....");

        // Exit the Node process with 0 (Success)
        process.exit(0);

    } catch(err){

        console.log(err);

        // Exit the Node process with 1 (Fail)
        process.exit(1);

    }

};

start();