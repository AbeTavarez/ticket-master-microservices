import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;

// === Initial Setup
beforeAll(async () => {
    // create instance of mongo
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    // connect to mongo
    await mongoose.connect(mongoUri, {});
});

// === Runs before each of the tests
beforeEach(async () => {
    // get all collections
    const collections = await mongoose.connection.db.collections();
    
    // Deletes all collections (reset)
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

// === Runs after all of the tests are completed
afterAll(async () => {
    // stops mongo server
    await mongo.stop();
    // disconnects from server
    await mongoose.connection.close();
})