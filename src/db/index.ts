import mongoose from 'mongoose';

const connectToDatabase = async () => {
    const connection = await mongoose.connect("userDataBaseUrl");
    console.log(connection.connection.port);
    
};

export default connectToDatabase;