import mongoose from "mongoose";



const mongodbURI =
    process.env.mongodbURI ||
    "mongodb+srv://MairajK:workhardin@cluster0.sihvwcq.mongodb.net/hackathon?retryWrites=true&w=majority";


///////////////////////////////// USER schema and model ////////////////////////

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePhoto: { type: String },
    phoneNumber: { type: String },
});

export const userModel = mongoose.model("Users", userSchema);

/////////////////////////// post model and Schema //////////////////////////////////

const productSchema = new mongoose.Schema({
    userId: { type: String },
    decriptionText: { type: String },
    postImage: { type: String },
    date: { type: Date, default: Date.now },
});

export const productModel = mongoose.model("products", productSchema);

//////////////////////////////////////////////////////////////////////////////


/////////////////////////// post model and Schema //////////////////////////////////

const orderSchema = new mongoose.Schema({
    userId: { type: String },
    date: { type: Date, default: Date.now },
    orderProducts: { type: Array, required: true }
});

export const orderModel = mongoose.model("orders", orderSchema);

//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////


mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on("connected", function () {
    //connected
    console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", function () {
    //disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on("error", function (err) {
    //any error
    console.log("Mongoose connection error: ", err);
    process.exit(1);
});

process.on("SIGINT", function () {
    /////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log("Mongoose default connection closed");
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
