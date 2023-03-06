import mongoose from "mongoose";



const mongodbURI =
    process.env.mongodbURI ||
    "mongodb+srv://MairajK:workhardin@cluster0.sihvwcq.mongodb.net/saylaniStore?retryWrites=true&w=majority";


///////////////////////////////// USER schema and model ////////////////////////

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePhoto: { type: String },
    phoneNumber: { type: String },
});

export const userModel = mongoose.model("Users", userSchema);

/////////////////////////// product model and Schema //////////////////////////////////

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    decription: { type: String },
    category: { type: String, required: true },
    sellerId: { type: mongoose.Types.ObjectId, required: true },
    sellerName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const productModel = mongoose.model("products", productSchema);

//////////////////////////////////////////////////////////////////////////////


/////////////////////////// Order model and Schema //////////////////////////////////

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId },
    createdAt: { type: Date, default: Date.now },
    orderProducts: { type: Array, required: true }
});

export const orderModel = mongoose.model("orders", orderSchema);

//////////////////////////////////////////////////////////////////////////////



/////////////////////////// Cart model and Schema //////////////////////////////////

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId },
    createdAt: { type: Date, default: Date.now },
    cartProducts: { type: Array, required: true }
});

export const cartModel = mongoose.model("carts", cartSchema);

//////////////////////////////////////////////////////////////////////////////



/////////////////////////// categories model and Schema //////////////////////////////////

const categoriesSchema = new mongoose.Schema({
    sellerId: { type: mongoose.Types.ObjectId },
    createdAt: { type: Date, default: Date.now },
    name: { type: Array, required: true },
    image: { type: String },

});

export const categoriesModel = mongoose.model("categories", categoriesSchema);

//////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////


mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////

mongoose.connection.on("connected", () => {
    //connected
    console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", () => {
    //disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on("error", (err) => {
    //any error
    console.log("Mongoose connection error: ", err);
    process.exit(1);
});

process.on("SIGINT", () => {
    /////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(() => {
        console.log("Mongoose default connection closed");
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
