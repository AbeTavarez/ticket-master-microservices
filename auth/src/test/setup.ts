import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

// tells TS about global function
declare global {
    var signin: () => Promise<string[]>;
  }

let mongo: any;

// === Initial Setup
beforeAll(async () => {
    // create dummy test env key
    process.env.JWT_KEY = 'jwtkey';
    
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
});

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const authRes = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

    const cookie = authRes.get("Set-Cookie");
    return cookie;
}