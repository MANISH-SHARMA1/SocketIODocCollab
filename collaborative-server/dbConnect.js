const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");

module.exports = async () => {
  let mongoUri =
    "mongodb+srv://g80638584:JKytNELc50OvD7GN@cluster0.8e91au6.mongodb.net/?retryWrites=true&w=majority";

  try {
    const connect = await mongoose.connect(mongoUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
