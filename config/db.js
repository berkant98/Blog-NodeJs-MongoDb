const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://127.0.0.1/nodeblog_db`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = {
    connect: connectMongoDB,
    mongoStore: MongoStore.create({ mongoUrl: 'mongodb://localhost/nodeblog_db' })
};