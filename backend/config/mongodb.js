import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("DB Connection");
        });

        await mongoose.connect(process.env.MONGODB_URL);
    } catch (err) {
        console.error(" MongoDB connection error:", err.message);
    }
};

export default connectDB;
