import mongoose from "mongoose";

export const ConnectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log("DB Connected!");
	} catch (e) {
		console.log("Error: ", e);
	}
};
