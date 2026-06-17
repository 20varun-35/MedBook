import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};
console.log("JWT SECRET:", process.env.JWT_SECRET);
export default connectDB;