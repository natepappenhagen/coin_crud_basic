const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/holdings");

mongoose.connection.on("connected", () => {
	console.log("mongoose is active");
})
mongoose.connection.on("error", (err) => {
	console.log(err);
})
mongoose.connection.on("disconnected", () => {
	console.log("lost in ...");
})