import mongoose, { connect } from "mongoose";



const connectDB = async() => {
    try {
        mongoose.connection.on('connected', () => console.log('database connected'));
        // This line sets up an event listener.

        // You 're telling Mongoose:

        // "Whenever the connection is successfully established, run this function."

        // This line does not actually connect to the database.
        // It just waits
        // for the "connected"
        // event to happen— it’ s passive.
        // Wait for mongoose to connect to the MongoDB database using the provided URL and database name
        await mongoose.connect(`${process.env.MONGODB_URL}/quickblog`); //quick blog is databse name
    } catch (e) {
        console.log(e.message + "  to connect database");
    }
}
export default connectDB;