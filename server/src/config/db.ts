import mongoose from "mongoose";
import { setServers } from "dns";

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error("MONGO_URI is not defined.");
        process.exit(1);
    }

    setServers(["8.8.8.8", "1.1.1.1"]);

    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;