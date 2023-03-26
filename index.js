const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");

app.use(express.json());
//  routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();
app.use(cors());

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("DBConnection is Successful"))
	.catch((err) => console.log(err));

app.use("/api/users", userRoute);

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 7000, () => {
	console.log("Backend server is running");
});
