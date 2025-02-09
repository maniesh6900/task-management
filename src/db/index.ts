import mongoose from 'mongoose';

const connectToDatabase = async () => {
    const connection = await mongoose.connect("mongodb://kaj882626:tasting123@localhost:27017");
    console.log(connection.connection.port);
    
};

export default connectToDatabase;